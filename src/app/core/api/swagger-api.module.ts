import { NgModule } from '@angular/core';
import { ApiModule as FlexcubModule } from 'src/app/api/flexcub-api/api.module';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    FlexcubModule.forRoot({
      rootUrl: `${environment.apiPrefix}${environment.apiFlexcub}`,
    }),
  ],
})
export class SwaggerApiModule {}
