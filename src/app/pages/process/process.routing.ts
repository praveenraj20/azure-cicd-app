import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MsaComponent } from "./feature/seeker/msa/msa.component";
import { PoComponent } from "./feature/seeker/po/po.component";
import { SowComponent } from "./feature/seeker/sow/sow.component";
import { DefineComponent } from "./feature/selection/define/define.component";
import { ProgressComponent } from "./feature/selection/progress/progress.component";
import { SuggestionsComponent } from "./feature/selection/suggestions/suggestions.component";
import { ProcessComponent } from "./process.component";

const routes: Routes = [
  { path: '', component: ProcessComponent },
  { path: 'msa', component: MsaComponent },
  { path: 'po', component: PoComponent },
  { path: 'sow', component: SowComponent },
  { path: 'suggestions', component: SuggestionsComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'define', component: DefineComponent },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
