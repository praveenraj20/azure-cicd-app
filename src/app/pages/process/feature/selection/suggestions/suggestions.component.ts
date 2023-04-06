import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'crypto';
import { filter, first, map, Observable } from 'rxjs';
import { FeedbackRate, RateApprovalDto, RecommendedCandidates, SelectionPhaseDto, SelectionPhaseResponse } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ownerResumeUrl } from 'src/app/core/constants/constant';
import { ProfileService } from 'src/app/pages/profile/profile.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit, AfterViewInit {
  shortListAccess: boolean = false;
  jobId!: string;
  candidates: ISelectionPhaseResponse[] = [];
  suggestions: MatTableDataSource<IRecommendedCandidates> = new MatTableDataSource<IRecommendedCandidates>([]);
  suggestions$!: Observable<IRecommendedCandidates[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };
  jobTitle: string = '';
  suggested: IRecommendedCandidates[] = [];
  dialogConfig: string = '';

  constructor(
    private readonly _service: ProcessService,
    private readonly _appService: AppService,
    private readonly _profileService: ProfileService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    const access = this._appService.user?.modulesAccess;
    this.shortListAccess = access?.some(e => e?.seekerModule === 'Shortlisting of Candidate') as boolean;
    this.suggestions$ = this.suggestions?.connect();

    this.route.queryParams
      .pipe(filter(e => !!e && !!e?.jobId), first())
      .subscribe(e => {
        this.jobId = e?.jobId;
        this.getSuggestions(this.jobId);
        this.getCandidates(this.jobId);
      });
  }

  ngAfterViewInit(): void {
    this.suggestions.paginator = this.paginator;
  }

  getSuggestions(jobId: string): void {
    this._service.talentRecommendation(jobId)
      .pipe(map(j => j?.filter(e => !e?.shortlist) ?? []))
      .subscribe((j) => {
        const n = j as IRecommendedCandidates[] ?? [];
        this.suggestions.data = n;

        this.pageOptions.length = this.suggestions.data?.length ?? 0;
        this.jobTitle = j[0]?.jobTitle as string ?? '';

        n?.forEach(async (e) => {
          e.avatar = await this._appService.defaultAvatar(e?.skillOwnerId as number);
          const n = await this._profileService.getResumeFiles(e?.skillOwnerId as number)?.toPromise();
          e.resumeUrl = n?.fileDownloadUri;
        });
      }, (err) => {

      });
  }

  getCandidates(jobId: string): void {
    this._service.getCandidatesByJobId(jobId)
      .subscribe((j) => {
        this.candidates = j ?? [];

        try {
          this.candidates?.forEach(async (e) => {
            const k = await this._service.getById(e?.skillOwnerId as number).toPromise();
            e?.rate === null ? e.rate = k?.rateCard ?? 0 : null;
            e.avatar = await this._appService.defaultAvatar(e?.skillOwnerId as number);
          });
        } catch (e) { }
      }, (err) => {

      });
  }

  checkSuggestion(n: IRecommendedCandidates, e: Event, i: number): void {
    const j = (e?.target as HTMLInputElement)?.checked;
    this.shortListing(n, j, i);
  }

  shortListing(n: IRecommendedCandidates, shortlist: boolean, i: number): void {
    const el = document.getElementById(`${n.skillOwnerId}`) as HTMLInputElement;
    if (shortlist) {
      el ? el.checked = true : null;

      n.shortlist = true;
      const ii = this.suggested.findIndex(e => n?.skillOwnerId === e?.skillOwnerId) ?? -1;
      ii === -1 ? this.suggested.push(n) : null;
    } else {
      el ? el.checked = false : null;

      n.shortlist = false;
      this.suggested.splice(i, 1);
    }
  }

  defineSelection(): void {
    if (this.suggested.length === 0) return;

    if (!this.shortListAccess) return this._appService.toastr('The selected module is restricted for you. please contact your seeker admin');

    const items: SelectionPhaseDto[] = [];
    this.suggested.forEach(e => {
      items.push({
        job: { jobId: e.jobId },
        skillOwnerEntity: { skillOwnerEntityId: e.skillOwnerId } as any,
        showTicksValues: true,
        showSelectionBar: true,
      });
    });

    this._service.insertSelectionPhases(items)
      .subscribe(async () => {
        await this._service.shortlistingMail(this.jobId)?.toPromise();
        this._appService.toastr('Mail sent to the candidates', { icon: 'success' });

        this.suggested = [];
        this.getCandidates(this.jobId);

        this._service.isLocked(this.jobId)
          .subscribe((nn) => {
            const mm = nn?.flow ?? [];
            if (mm.length === 0) return this.router.navigate(['/process/define'], { queryParams: { jobId: this.jobId } });

            const params = {
              jobId: this.jobId, requirementPhases: mm,
              percentageRequired: nn?.percentageExpected as Array<FeedbackRate> ?? [],
            };
            this._service.insertRequirementPhases(params)
              .subscribe((res) => {
                this.router.navigate(['/process/progress'], { queryParams: { jobId: this.jobId } })
              });
          }, (err) => this.router.navigate(['/process/define'], { queryParams: { jobId: this.jobId } }));

      }, (err) => this._appService.toastr(err));
  }

  publish(): void {
    if (!this.candidates?.every((n) => parseFloat(n?.rate as any) !== 0)) return this._appService.toastr('Rate has to greater than 0$', { icon: 'error' });

    const items: RateApprovalDto[] = []
    this.candidates?.forEach(e => items.push({ skillOwnerId: e.skillOwnerId, jobId: e.jobId, rate: e.rate }));

    this.dialogConfig = '';

    this._service.skillOwnerRate(items)
      .subscribe(() => {
        this.router.navigate(['/process/progress'], { queryParams: { jobId: this.jobId } });
      }, (err) => this._appService.toastr(err));
  }

  rateEntry(event: Event, n: ISelectionPhaseResponse): void {
    n.rate = parseFloat((event.target as HTMLInputElement)?.value) || 0;
  }

  onlyPrice(e: KeyboardEvent): void {
    this._appService.onlyNumber(e, 'price');
  }

  get _publish(): boolean {
    return this.candidates?.every((n) => n.rate !== null);
  }

  pageChange(e: PageEvent): void {

  }

}

interface ISelectionPhaseResponse extends SelectionPhaseResponse {
  avatar?: string;
}

interface IRecommendedCandidates extends RecommendedCandidates {
  avatar?: string;
  checked?: boolean;
  resumeUrl?: string;
}
