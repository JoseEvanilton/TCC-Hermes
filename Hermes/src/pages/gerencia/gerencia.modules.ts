import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciaPage } from './gerencia';

@NgModule({
 declarations: [GerenciaPage],
 imports: [IonicPageModule.forChild(GerenciaPage)],
 entryComponents: [GerenciaPage]
})
export class GerenciaPageModule { }