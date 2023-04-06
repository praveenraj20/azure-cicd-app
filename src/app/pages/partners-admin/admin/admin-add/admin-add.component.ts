import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, forkJoin } from 'rxjs';
import { OwnerSkillDomain, SkillPartner } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { einRegex, emailRegex, phoneRegex } from 'src/app/core/constants/constant';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { ProfileService } from 'src/app/pages/profile/profile.service';
import { PartnersAdminService } from '../../partners-admin.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  id!:number;
  visible: 'new' | 'preview' | 'edit' = 'edit';
  partnerInfo!: SkillPartner;
  _tabSelection: number = 0;
  formOne!: FormGroup;
  _states: { state_name: string }[] = [];
  _cities: any[] = [];
  domains: OwnerSkillDomain[] = [];
  status: string[] = ['Active', 'In active'];
  tabs: string[] = ['Basic Details'];
  constructor( private readonly fb: FormBuilder,   private readonly _service: PartnersAdminService,   private readonly router: Router, private readonly _authService: AuthenticationService,  private readonly _appService: AppService,   private readonly _profileService: ProfileService,private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.defaultsInit();
    this.route.queryParams
    .pipe(
      filter(e => !!e && !!e?.type && !!e?.id),
      first()
    ).subscribe((e) => {
      this.visible = e?.type;
      this.id = parseInt(e?.id);
      this.getPartnerInfo(this.id)
        // .then(async () => {
        //   await this.getProjectsInfo(this.id);
        //   await this.getRequirementInfo(this.id);
        // });
    });
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  tabSelection(i: number): void {
    this._tabSelection = i;
  }

  getStates(): void {
    this._authService.getState()
      .subscribe((j) => {
        this._states = j as any[];
      }, (err) => { });
  }

  getCities(reset: boolean = true): void {
    const { state, city } = this.f1;
    if (!state?.valid) return;
    this._authService.getCityList(state?.value)
      .subscribe((j) => {
        this._cities = j as any[];
        reset ? city?.setValue(null) : null;
      }, (err) => { });
  }

  getPartnerInfo(id: number, fresh: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id) return reject();

      this._service.getPartnerInfo(id)
        .subscribe((n) => {
          this.partnerInfo = n;
          console.log(n)
          const mm = n?.primaryContactFullName?.split(' ') ?? [];
          resolve();
          const ii = () => {
            this.formOne.patchValue({
              'businessName': n?.businessName ?? null,
              // 'businessDomain': n?.ownerSkillDomainEntity?.domainId ?? null,
              'businessEmail': n?.businessEmail ?? null,
              'businessPhone': n?.primaryContactPhone ?? null,
              'firstName': mm[0] ?? null,
              'lastName': mm[1] ?? null,
              'licenseNumber': n?.taxIdBusinessLicense ?? null,
              'address': n?.addressLine1 ?? null,
              '_address': n?.addressLine2 ?? null,
              'state': n?.state ?? null,
              'serviceFeepercentage': n?.serviceFeePercentage ?? null,
              // 'city': n?.city ?? null,
              'zipCode': n?.zipcode ?? null,
              // 'phoneNumber': n?.primaryContactPhone ?? null,
              // // 'email': n?.primaryContactEmail ?? null,
              // '_phoneNumber': n?.secondaryContactPhone ?? null,
              // '_email': n?.secondaryContactEmail ?? null,
              // 'status': n?.status ?? null,
            });

            this.getCities(false);

            const nn = this.visible === 'preview' ? this.formOne.controls : { businessName: '', licenseNumber: '' };
            Object.keys(nn).forEach(e => this.formOne.get(e)?.disable());
          }
          !fresh ? ii() : null;
        }, (err) => (this._appService.toastr(err), reject()));
    });
  }

  saveBasicInfo(): void {
    if (!this.formOne?.valid) return;

    const { value } = this.formOne;

    const info: SkillPartner = {
      ...(this.visible === 'edit') && { skillPartnerId: this.partnerInfo?.skillPartnerId },
      businessName: value?.businessName,
      serviceFeePercentage:value?.serviceFeepercentage,
      primaryContactEmail: value?.businessEmail,
      primaryContactFullName:value?.firstName +' '+value?.lastName,
      taxIdBusinessLicense:value?.licenseNumber,
      addressLine1:value?.address,
      addressLine2:value?._address,
      state: value?.state,
      zipcode: value?.zipCode,
    };

    console.log(value);

    const j = [];
    this.visible === 'edit'
      ? j.push(this._service.updateSkillPartnerDetails(info))
      : this.visible === 'new'
        ? j.push(this._service.addClientDetails(info)) : null;

    if (j.length === 0) return;

    forkJoin(j)
      .subscribe(async ([a]) => {
        this.partnerInfo = a as SkillPartner;
        this._appService.toastr(this.visible === 'new' ? 'Basic details added successfully' : 'Basic details updated successfully', { icon: 'success' });
        this.getPartnerInfo((a as SkillPartner)?.skillPartnerId as number, this.visible === 'new');
        if (this.visible === 'new') {
          const id = (a as SkillPartner)?.skillPartnerId as number;
        }
      }, (err) => this._appService.toastr(err));
  }

  defaultsInit(): void {
    this.formOne = this.fb.group({
      'businessName': [null, [Validators.required]],
      'serviceFeepercentage': [null, [Validators.required]],
      'businessEmail': [null, [Validators.required, Validators.pattern(emailRegex)]],
      'businessPhone': [null, [Validators.required, Validators.pattern(phoneRegex)]],
      'firstName': [null, [Validators.required]],
      'lastName': [null, [Validators.required]],
      'licenseNumber': [null, [Validators.required, Validators.pattern(einRegex)]],
      'address': [null, [Validators.required]],
      '_address': [null, []],
      'state': [null, [Validators.required]],
      // 'city': [null, [Validators.required]],
      'zipCode': [null, [Validators.required]],
    });
    this.getStates();
   this.getDomains();
    // this.getTechnologies();
    // this.getRoles();
    // this.getLevels();
    // this.getStates();
    // this.getPriorities();
    // this.getSeekers();

    // this._projects.push(this.createProject());
    // this._requirements.push(this.createRequirement());
  }

  get f1() {
    return this.formOne.controls;
  }




  getDomains(): void {
    this._profileService.getDomains()
      .subscribe((j) => {
        this.domains = j ?? [];
      }, (err) => { });
  }

  onlyNumber(e: KeyboardEvent): void {
    this._appService.onlyNumber(e);
  }

}
