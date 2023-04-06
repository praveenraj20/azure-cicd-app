import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';
import { ThemeModule } from './theme/theme.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiConfiguration } from './api/flexcub-api/api-configuration';
import { environment } from 'src/environments/environment';
import { ErrorInterceptor, JwtInterceptor } from './core/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    ThemeModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ApiConfiguration,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly base: ApiConfiguration) {
    base.rootUrl = `${environment.apiPrefix}${environment.apiFlexcub}`;
  }
}
