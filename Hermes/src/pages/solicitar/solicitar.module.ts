import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitarPage } from './solicitar';

@NgModule({
  declarations: [
    SolicitarPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitarPage),
  ],
})
export class SolicitarPageModule {}
