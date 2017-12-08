import { NgModule } from '@angular/core';
import { PerfilPage} from './perfil';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
 declarations: [PerfilPage],
 imports: [IonicPageModule.forChild(PerfilPage)],
 entryComponents: [PerfilPage]
})
export class PerfilPageModule { }