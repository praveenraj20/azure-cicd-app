import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ChangePasswordDto, Login, Registration, SetOwnerPassword, SkillOwnerEntity, Verify } from 'src/app/api/flexcub-api/models';
import { LocationControllerService, OwnerSkillDomainControllerService, OwnerSkillTechnologiesControllerService, RegistrationControllerService, SeekerProjectControllerService, } from 'src/app/api/flexcub-api/services';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  location!: any;

  constructor(
    private readonly _service: AppService,
    private readonly registrationController: RegistrationControllerService,
    private readonly locationController: LocationControllerService,
    private readonly ownerSkillDomainController: OwnerSkillDomainControllerService,
    private readonly ownerSkillTechnologiesController: OwnerSkillTechnologiesControllerService) {
    this._service.user = JSON.parse(localStorage.getItem('user') as string) as Registration;
  }

  getCountries() {
    return this.location?.getCountries() ?? [];
  }

  getStatesByCountry(j: string) {
    return this.location?.getStatesByShort(j) ?? [];
  }

  getCitiesByState(country: string, state: string) {
    return this.location?.getCities(country, state) ?? [];
  }

  register(request: Registration): Observable<Registration> {
    return this.registrationController.insertDetails({ body: request });
  }

  verifyCandidate(request: Verify): Observable<Registration> {
    return this.registrationController.verifyCandidate({ body: request });
  }

  verifyRegistrationForOwner(Token: string): Observable<SkillOwnerEntity> {
    return this.registrationController.verifyRegistrationForOwner({ token: Token });
  }

  setForgotPassword(email: string): Observable<boolean> {
    return this.registrationController.setForgotPassword({ emailId: email });
  }

  verifyForgotPass(request: ChangePasswordDto): Observable<ChangePasswordDto> {
    return this.registrationController.verifyForgotPass({ body: request });
  }

  setPasswordForOwner(j: SetOwnerPassword) {
    return this.registrationController.setPasswordForOwner({ body: j });
  }

  login(request: Registration): Observable<Registration> {
    return this.registrationController.getLoginDetails({ body: request }).pipe(
      tap((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this._service.user = user;
      })
    );
  }

  _login(j: Login): Observable<Registration> {
    return this.registrationController.superAdminLoginScreen({ body: j }).pipe(
      tap((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this._service.user = user;
      })
    );
  }

  resend(id: number) {
    return this.registrationController.resendMail({ id });
  }

  getState() {
    return this.locationController.getStates();
  }

  getCityList(states: string) {
    return this.locationController.getCities({ state: states });
  }

  getStengthList() {
    return this.registrationController.getStrength();
  }

  getDomainList() {
    return this.ownerSkillDomainController.getDetails2();
  }

  getTechnologyList() {
    return this.ownerSkillTechnologiesController.getDetailsTech();
  }
}
