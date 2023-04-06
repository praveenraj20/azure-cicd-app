import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn.component';
import { routing } from './learn.routing';



@NgModule({
  declarations: [
    LearnComponent
  ],
  imports: [
    CommonModule,
    routing
  ]
})
export class LearnModule { }
