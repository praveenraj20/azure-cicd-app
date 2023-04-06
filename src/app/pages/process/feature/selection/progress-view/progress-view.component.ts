import { Component, Input, OnInit } from '@angular/core';
import { Registration, SelectionPhaseResponse } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss']
})
export class ProgressViewComponent implements OnInit {
  @Input() info!: SelectionPhaseResponse;
  selection!: ISelectionPhaseResponse;
  viewSelection: boolean = true;
  user: Registration;

  constructor(
    private readonly _service: ProcessService,
    private readonly _appService: AppService) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    const { jobId, skillOwnerId } = this.info;
    if (!jobId || !skillOwnerId) return;

    this.getInterviewInfo(jobId, skillOwnerId);
  }

  getInterviewInfo(jobId: string, ownerId: number): void {
    this.viewSelection = true;
    this._service.interviewInfo(jobId, ownerId)
      .subscribe(async (j) => {
        this.selection = j;
        try {
          this.selection.avatar = await this._appService.defaultAvatar(j?.skillOwnerId as number);
        } catch (e) { }
      }, (err) => {

      });
  }
}

interface ISelectionPhaseResponse extends SelectionPhaseResponse {
  avatar?: string;
}
