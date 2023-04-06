import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { OwnerSkillDomain, Registration, SeekerAdminMsa, SeekerPurchaseOrder, SkillSeekerProject } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ownerImgUrl } from 'src/app/core/constants/constant';
import { ISeekerPurchaseOrder } from 'src/app/core/models/po.models';
import { JobsService } from 'src/app/pages/jobs/jobs.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoComponent implements OnInit {
  user: Registration;
  seekerId!: number;
  soImgUrl = ownerImgUrl;
  poDetails!: ISeekerPurchaseOrder[];
  step: number = 1;
  copypoDetails!: SeekerPurchaseOrder[];
  array!: SeekerAdminMsa[];
  departments!: SeekerPurchaseOrder[];
  searchfilter: string = '';
  isLoading!: boolean;
  dateRange: FormGroup;
  statuses = [
    { value: 'Active' },
    { value: 'InActive' },
    { value: 'In Writing' },
    { value: 'In Review' },
    { value: 'Correction' },
    { value: 'Expiring Soon' },
    { value: 'Expired' },
  ];
  domainList!: OwnerSkillDomain[];
  defaultDepartment = { domainId: 0, domainValues: 'Default' };
  default = { id: 0, title: 'Default' };
  projectName!: SkillSeekerProject[];
  departmentname: string ='';
  form1: FormGroup;
  projectname:string="";
  form2: FormGroup;
  Agreefilestemp: KeyValue[] = [];
  file2: boolean = false;
  clientid!: number;
  projectid!: number;
  uploadData!: FormData;
  agreeDocument!: FormData;
  file1: boolean = false;
  skillOwnerName: string = '';
  skillOwnerJobId: string = '';
  skillOwnerId!: number;
  skillOwnerRole: string = '';
  signShow: boolean = false;
  preview: boolean = false;
  today: Date = new Date();
  progressValue: number = 0;
  num1: number = 0;
  loadId!: number;
  src!: Uint8Array;
  clientDropDownData!: Date;
  projectDropDownData!: Date;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly processService: ProcessService,
    private readonly router: Router,
    private readonly jobsService: JobsService,
    private readonly _appService: AppService,
    private readonly activatedRoute: ActivatedRoute,

  ) { 
    this.user = this._appService.user;
    this.dateRange = this.formBuilder.group({
      'start': ['', [Validators.required]],
      'end': ['', [Validators.required]],
    });

    this.form2 = this.formBuilder.group({
      'agreeDocument': ['', [Validators.required]]
    })

    this.form1 = this.formBuilder.group({
      'department': ['', [Validators.required]],
      'project' : ['', [Validators.required]],
      'candidateName': ['', [Validators.required]],
      'role' : ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.seekerId = this.user?.id as number;
    this.getDomainList();
    this.getSeekerProjectDetails(this.seekerId as number);
    this.getPoDetails(this.seekerId as number);

    this.activatedRoute.queryParams
    .pipe(
      filter((param: Params) => !!param && !!param?.jobId && !!param?.id && !!param?.projectId),
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
    this.poDetails = this.copypoDetails;
  }

  getPoDetails(id: number) {
    this.processService.getPoDetails(id).subscribe(
      (res) => {
        this.poDetails = res;
        for (let i = 0; i < this.poDetails.length; i++) {
          this.processService.downloadImage(this.poDetails[i]?.ownerId as number).subscribe(
            (res) => {
              this.poDetails[i]['image'] = this.soImgUrl + this.poDetails[i]?.ownerId;
            },
            (err) => {
              if (err.status == 200) {
                this.poDetails[i]['image'] = this.soImgUrl + this.poDetails[i]?.ownerId;
              } else {
                this.poDetails[i]['image'] = `assets/images/avatar-default-skillowner.png`;
              }
            }
          );
        }
        this.isLoading = false;
        this.copypoDetails = res;
        this.departments = [...new Set<SeekerPurchaseOrder>(this.poDetails.map((item: any) => item.skillSeekerProjectDept))];
      },
      (err) => {
        this.isLoading = false;
      }
    );
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

  downloadPo(): void {
    this.processService.getPoTemplate().subscribe(
      (response) => {
        let blob: Blob = response as Blob;
        var url = window.URL.createObjectURL(new Blob([response]));
        let a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', `skillseeker_PO_template.doc`);
        document.body.appendChild(a);
        a.click();
      },
      (err) => this._appService.toastr(err));
  }

  remove(id: number) {
    if (this.Agreefilestemp.length == 1) {
      this.Agreefilestemp = [];
      // this.agreeDocs.reset();
      this.file2 = false;
    } else {
      this.Agreefilestemp.splice(id, 1);
    }
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

  send() {
    this.processService
      .uploadFilePO(
        this.seekerId as number,
        this.form1.get('project')?.value,
        this.skillOwnerId,
        this.form1.get('role')?.value,
        this.form1.get('department')?.value,
        this.skillOwnerJobId,
        [this.Agreefilestemp[0].agreementfile as Blob]
      )
      .subscribe(
        (response) => {
          this.signShow = true;
          this._appService.toastr(`PO sent successfully`, { icon: 'success' });
          this.router.navigate(['/contracts'])
        },
        (err) => this._appService.toastr(err));
  }
}

interface KeyValue {
  agreementfile: File;
}
