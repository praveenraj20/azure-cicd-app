import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { Registration, SeekerAdminMsa, SkillSeekerProject } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { excelDocViewer } from 'src/app/core/constants/constant';
import { JobsService } from 'src/app/pages/jobs/jobs.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-msa',
  templateUrl: './msa.component.html',
  styleUrls: ['./msa.component.scss']
})
export class MsaComponent implements OnInit {

  msaDetails!: SeekerAdminMsa[];
  user?: Registration;
  seekerId!: number;
  copyMsaDetails!: SeekerAdminMsa[];
  array!: SeekerAdminMsa[];
  departments!: SeekerAdminMsa[];
  searchfilter: string = '';
  isLoading = true;
  form: FormGroup;
  statuses = [
    { value: 'Active' },
    { value: 'InActive' },
    { value: 'In Writing' },
    { value: 'In Review' },
    { value: 'Correction' },
    { value: 'Expiring Soon' },
    { value: 'Expired' },
  ];
  step: number = 1;
  form1: FormGroup;
  projectname: string = '';
  default = { id: 0, title: 'Default' };
  projectDropDownData!: SkillSeekerProject[];
  form2: FormGroup;
  downloadId!: number;
  preview: boolean = false;
  src!: Uint8Array;
  jobId!: string;
  buisnessName: string = '';
  today = new Date();
  projectName!: SkillSeekerProject[]
  skillOwnerJobId: string = '';
  skillOwnerId!: number;
  signShow = 'none';
  files: File[] = [];
  @ViewChild('fileSelect') fileSelect!: ElementRef<HTMLInputElement>;
  docFile: string = excelDocViewer;

  constructor(
    private readonly _appService: AppService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly processService: ProcessService,
    private readonly jobsService: JobsService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      'start': ['', [Validators.required]],
      'end': ['', [Validators.required]],
    });

    this.form1 = this.formBuilder.group({
      'ClientName': [{ value: '', disabled: true },  [Validators.required]],
      'project': ['', [Validators.required]]
    });

    this.form2 = this.formBuilder.group({
      'agreeDocument': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.user = this._appService.user;
    this.seekerId = this.user?.id as number;
    this.route.queryParams
    .pipe(filter(e => !!e && !!e?.jobId && !!e?.ownerId), first())
    .subscribe((e) => {
      this.skillOwnerJobId = e?.jobId;
      this.skillOwnerId = e?.ownerId;
      this.jobId = e?.jobId;
    });
    this.buisnessName = this._appService.user.businessName!;
    this.getMsaDetails(this.seekerId as number);
    this.getProjectDropdownData(this.seekerId);
    this.getSeekerProjectDetails(this.seekerId as number);
    this.form1.controls['ClientName'].setValue(this.buisnessName);
  }

  next(i: number): void {
    this.step = i;
  }

  selectionbar() {
    this.router.navigate(['/process/progress'], { queryParams: { jobId: this.jobId } })
  }

  projectChange() {
    this.projectname = this.form1.value.project.title.toString();
  }

  resetFilter() {
    this.msaDetails = this.copyMsaDetails;
  }

  getMsaDetails(seekerid: number) {
    this.processService.getMsaDetailsBySeeker(seekerid).subscribe(
      (res) => {
        this.msaDetails = res;
        this.isLoading = false;
        this.copyMsaDetails = res;
        this.departments = [...new Set<SeekerAdminMsa>(this.msaDetails.map((item: any) => item.skillSeekerProjectDept))];
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  downloadMsa(): void {
    this.processService.getMsaTemplate().subscribe(
      (response) => {
        let blob: Blob = response as Blob;
        var url = window.URL.createObjectURL(new Blob([response]));
        let a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', `skillseeker_MSA_template.doc`);
        document.body.appendChild(a);
        a.click();
      },
      (err) => this._appService.toastr(err));
  }

  upload() {
    if (this.files.length) {
      let img:File =this.files[0]
      console.log(img);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.src = e.target.result;
      };
      reader.readAsArrayBuffer(img);
      this.preview = true;
      this._appService.toastr(`File Uploaded successfully`, { icon: 'success' });
    }
  }

  send() {
    this.processService
      .uploadFile(this.seekerId, this.form1.get('project')?.value.id, this.skillOwnerJobId, this.skillOwnerId, [this.files[0] as Blob])
      .subscribe(
        (response) => {
          this.signShow = 'block';
          this.cdr.detectChanges();
          this._appService.toastr(`MSA sent successfully`, { icon: 'success' });
          this.router.navigate(['/contracts'])
        },
        (err) => this._appService.toastr(err));
  }

  clientChange(event: Event) {
    this.getProjectDropdownData(this.form1.value.clientId.id);
  }
  
  getProjectDropdownData(clientId: number) {
    this.processService.getProjectDropdownData(clientId).subscribe((response) => {
      this.projectDropDownData = response;
    });
  }

  getSeekerProjectDetails(id: number): void {
    this.jobsService.getSeekerProjectDetails(id).subscribe((response) => {
      this.projectName = response;
    });
  }

  onFileSelected(e: FileList): void {
    const threshold = 1024000;
    const docs = ['application/msword', 'application/pdf'];
    console.log(e[0]);
    for (let i = 0; i < e?.length; i++) {
      if (e[i]?.size > threshold) return this._appService.toastr('File size is more than 1MB');
      if (!docs.includes(e[i]?.type)) return this._appService.toastr('Only Files are allowed ( Word | pdf )');
      this.files.push(e[i]);
    }
  }

  deleteFile(i: number): void {
    this.files.splice(i, 1);
  }

  browseFiles(): void {
    this.fileSelect?.nativeElement?.click();
    this.fileSelect.nativeElement.onchange = (e: Event) => {
      const files = (e?.target as HTMLInputElement)?.files ?? [];
      this.onFileSelected(files as FileList);
      console.log(this.browseFiles);
      
    };
  }

}

// interface KeyValue {
//   agreementfile: File;
// }

