import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { subYears } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SkillOwnerEntity } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { emailRegex, excelDocViewer, phoneRegex } from 'src/app/core/constants/constant';
import { TalentsService } from '../../talents.service';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit {
  form!: FormGroup;
  docFile: string = excelDocViewer;
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  maxDate: Date = subYears(new Date(), 18);
  files: File[] = [];
  @ViewChild('fileSelect') fileSelect!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly _service: TalentsService,
    private readonly _appService: AppService,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'firstName': [null, [Validators.required]],
      'lastName': [null, [Validators.required]],
      'dob': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.pattern(emailRegex)]],
      'phone': [null, [Validators.required, Validators.pattern(phoneRegex)]],
      '_phone': [null, [Validators.pattern(phoneRegex)]],
      'rate': [null, [Validators.required]]
    });
  }

  saveTalent(): void {
    if (!this.form?.valid) return;
    const { value } = this.form;

    const j: SkillOwnerEntity = {
      skillPartnerEntity: {
        skillPartnerId: this._appService.user?.id as number,
      },
      firstName: value?.firstName,
      lastName: value?.lastName,
      dob: this.datePipe.transform(value?.dob, 'yyyy-MM-dd') as string,
      primaryEmail: value?.email,
      phoneNumber: value?.phone,
      ownerSkillStatusEntity: {
        skillOwnerStatusId: 2
      },
      alternatePhoneNumber: value?._phone,
      rateCard: parseInt(value?.rate) || 0
    };
    this._service.saveTalent(j)
      .subscribe(() => {
        this._appService.toastr('Talent profile created successfully', { icon: 'success', text: 'Talent profile added successfully and activation mail has been sent to email address.' });
        this.form?.reset();
      }, (err) => this._appService.toastr(err))
  }

  downloadTemplate(): void {
    this._service.downloadTemplate()
      .subscribe((j) => {
        var url = window.URL.createObjectURL(new Blob([j]));
        const a = document.createElement('a');
        a.href = url;
        console.log(a.href)
        a?.setAttribute('download', `Sample_template.xlsx`);
        document?.body?.appendChild(a);
        a?.click();
      }, (err) => this._appService.toastr(err));
  }

  browseFiles(): void {
    this.fileSelect?.nativeElement?.click();

    this.fileSelect.nativeElement.onchange = (e: Event) => {
      const files = (e?.target as HTMLInputElement)?.files ?? [];
      this.onFileSelected(files as FileList);
    };
  }

  onFileSelected(e: FileList): void {
    const threshold = 1024000;
    const docs = ['application/vnd.ms-excel', '.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    for (let i = 0; i < e?.length; i++) {
      if (e[i]?.size > threshold) return this._appService.toastr('File size is more than 1MB');
      if (!docs.includes(e[i]?.type)) return this._appService.toastr('Only Files are allowed ( Excel | CSV )');
      if (this.files.length > 3) return this._appService.toastr('There are more than 3 files');
      const ii = this.files.findIndex(n => e[i]?.name === n?.name) ?? -1;

      ii === -1 ? this.files.push(e[i]) : null;
    }
  }

  deleteFile(i: number): void {
    this.files.splice(i, 1);
  }

  onlyNumber(e: KeyboardEvent): void {
    this._appService.onlyNumber(e);
  }

  get f() {
    return this.form.controls;
  }
}
