import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { OwnerSkillDomain, Registration, SeekerAdmin, SkillSeekerProject, StatementOfWorkGetDetails } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ownerImgUrl } from 'src/app/core/constants/constant';
import { IStatementOfWorkGetDetails } from 'src/app/core/models/sow.model';
import { JobsService } from 'src/app/pages/jobs/jobs.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-sow',
  templateUrl: './sow.component.html',
  styleUrls: ['./sow.component.scss']
})
export class SowComponent implements OnInit {
  user: Registration;
  seekerId!: number;
  soImgUrl = ownerImgUrl;
  sowDetails!: IStatementOfWorkGetDetails[];
  copySowDetails!: StatementOfWorkGetDetails[];
  departments!: StatementOfWorkGetDetails[];
  searchfilter: string = '';
  isLoading!: boolean;
  dateRange: FormGroup;
  step: number = 1;

  statuses = [
    { value: 'Active' },
    { value: 'InActive' },
    { value: 'In Writing' },
    { value: 'In Review' },
    { value: 'Correction' },
    { value: 'Expiring Soon' },
    { value: 'Expired' },
  ];
  downloadId!: number;
  projectname: string = '';
  departmentname: string = '';
  src!: Uint8Array;
  clientDropDownData!: SeekerAdmin[];
  projectDropDownData!:SkillSeekerProject[];
  default = { id: 0, title: 'Default' };
  defaultDepartment = { domainId: 0, domainValues: 'Default' };
  num1: number = 0;
  Agreefilestemp: KeyValue[] = [];
  file2: boolean = false;
  openModal = false;
  clientid!: number;
  projectid!: number;
  uploadData!: FormData;
  agreeDocument!: FormData;
  file1: boolean = false;
  skillOwnerJobId: string = '';
  skillOwnerId!: number;
  projectName!: SkillSeekerProject[];
  domainList!: OwnerSkillDomain[];
  preview: boolean = false;
  signShow: boolean = false;
  today: Date = new Date();
  progressValue: number = 0;
  form1: FormGroup;
  agreeDocs: FormGroup;
  skillOwnerName: string = '';
  skillOwnerRole: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly processService: ProcessService,
    private readonly _appService: AppService,
    private readonly router: Router,
    private readonly jobsService: JobsService,
    private readonly activatedRoute: ActivatedRoute,

  ) {
    this.user = this._appService.user;
    this.dateRange = this.formBuilder.group({
      'start': ['', [Validators.required]],
      'end': ['', [Validators.required]],
    });

    this.form1 = this.formBuilder.group({
      'department': ['', [Validators.required]],
      'project': ['', [Validators.required]],
      'candidateName': ['skillownerName', [Validators.required]],
      'role': ['', [Validators.required]],
    });

    this.agreeDocs = this.formBuilder.group({
      'agreeDocument': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.seekerId = this.user?.id as number;
  console.log(this.seekerId)
    this.getDomainList();

    this.getSowDetails(this.seekerId as number);
    this.getSeekerProjectDetails(this.seekerId as number);

    this.activatedRoute.queryParams
    .pipe(
      filter((param: Params) => !!param && !!param?.jobId && !!param?.id),
      first()
    )
    .subscribe((param: Params) => {
      this.skillOwnerJobId = param?.jobId;
      this.skillOwnerId = param?.id;
 
      this.processService.candidateInterviewDetails(this.skillOwnerJobId, this.skillOwnerId).subscribe((res) => {
        this.skillOwnerRole = res?.jobTitle!;
        this.skillOwnerName = res?.skillOwnerName!;
        this.form1.controls['role'].setValue(this.skillOwnerRole);
        this.form1.controls['candidateName'].setValue(this.skillOwnerName);
      });
   
      this.jobsService.getSeekerProjectDetails(this.seekerId).subscribe((response) => {
        var data = response;
        this.projectName = response;
        var selectedProject = data.find((x) => x.id == param?.projectId);
        if (selectedProject) {
          this.form1.controls['project'].setValue(selectedProject.id);
          this.form1.controls['department'].setValue(selectedProject.ownerSkillDomainEntity?.domainId);
        this.projectChange();
        this.departmentChange();
        }
      });
    });
  }

  next(i: number): void {
    this.step = i;
  }

  selectionbar() {
    this.router.navigate(['/contracts'])
  }

  resetFilter() {
    this.sowDetails = this.copySowDetails;
  }

  getSowDetails(id: number) {
    this.processService.getSowDetails(id).subscribe(
      (res) => {
        this.sowDetails = res;
        for (let i = 0; i < this.sowDetails.length; i++) {
          this.processService.downloadImage(this.sowDetails[i]?.ownerId as number).subscribe(
            (res) => {
              this.sowDetails[i]['image'] = this.soImgUrl + this.sowDetails[i]?.ownerId;
            },
            (err) => {
              if (err.status == 200) {
                this.sowDetails[i]['image'] = this.soImgUrl + this.sowDetails[i]?.ownerId;
              } else {
                this.sowDetails[i]['image'] = `assets/images/avatar-default-skillowner.png`;
              }
            }
          );
        }
        this.isLoading = false;
        this.copySowDetails = res;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  getDomainList(): void {
    this.jobsService.getDomainList().subscribe((response) => {
      this.domainList = response;
    });
  }

  getSeekerProjectDetails(id:number): void {
    this.jobsService.getSeekerProjectDetails(id).subscribe((response) => {
      this.projectName = response;
    });
  }

  agreefile(event: Event) {
    const target = (event.target as HTMLInputElement)?.files;
    if (((target as FileList).length < 2) && (this.Agreefilestemp.length < 2)) {
        if (
          (target as FileList)[0].type == 'application/pdf' ||
          (target as FileList)[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          this.Agreefilestemp.push({ agreementfile: (target as FileList)[0] });
        }  
      }
      else {
        return
        }
    this.file2 = true;
  }

  remove(id: number) {
    this.progressValue = 0;
    if (this.Agreefilestemp.length == 1) {
      this.Agreefilestemp = [];
      this.file2 = false;
    } else {
      this.Agreefilestemp.splice(id, 1);
    }
  }

  skillSeekerByAdmin(): void {
    this.processService.skillSeekerByAdmin().subscribe((response) => {
      this.clientDropDownData = response;
    });
  }

  projectChange() {
    var selectedProject = this.projectName.find((x) => x.id == this.form1.value.project);
    this.projectname = selectedProject?.title!;
  }

  departmentChange() {
    console.log(this.form1.value)
    var selectedDepartment = this.domainList.find((x) => x.domainId == this.form1.value.department);
    this.departmentname = selectedDepartment?.domainValues!;
  }

  send() {
    this.processService
      .uploadFileSOW(
        this.skillOwnerId,
        this.seekerId,
        this.form1.get('department')?.value,
        this.form1.get('role')?.value,
        this.form1.get('project')?.value,
        this.skillOwnerJobId,
        [this.Agreefilestemp[0].agreementfile as Blob]
      )
      .subscribe(
        (response) => {
          this.signShow = true;
          this._appService.toastr(`SOW sent successfully`, { icon: 'success' });
          this.router.navigate(['/contracts'])
        },
        (err) => this._appService.toastr(err));

  }

  upload() {
    if (this.Agreefilestemp.length) {
      this.agreeDocument = new FormData();
    this.agreeDocument.append('document', this.Agreefilestemp[0].agreementfile, this.Agreefilestemp[0].agreementfile.name);
    let img:File =this.Agreefilestemp[0].agreementfile
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.src = e.target.result;
    };
    reader.readAsArrayBuffer(img);
      this.preview = true;
      for (var i = 0; i <= 100; i++) {
        this.progressValue = i;
      }
      this._appService.toastr(`File Uploaded successfully`, { icon: 'success' });
    }
  }
 
  download(): void {
    this.processService.downloadAgreement(this.downloadId).subscribe(
      (response) => {
      let fileName = this.Agreefilestemp[0].agreementfile.name;
      let blob: Blob = response as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  downloadSow(): void {
    this.processService.getSowTemplate().subscribe(
      (response) => {
        let blob: Blob = response as Blob;
        var url = window.URL.createObjectURL(new Blob([response]));
        let a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', `skillseeker_SOW_template.doc`);
        document.body.appendChild(a);
        a.click();
      },
      (err) => this._appService.toastr(err));
  }
}

interface KeyValue {
  agreementfile: File;
}
