import { NgModule } from '@angular/core';
import {AgoPipe} from "./ago.pipe";



@NgModule({
  declarations: [AgoPipe],
  exports: [AgoPipe],
})
export class AgoModule { }
