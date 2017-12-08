import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { SolicitarPage } from '../../solicitar/solicitar';
import { CorridaService } from '../../../providers/service/corridaservice';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { AcompanharCorridaPage } from '../../acompanhar-corrida/acompanhar-corrida';
import { Profile } from '../../../models/profile';
import { take } from 'rxjs/operator/take';
import { ProfileService } from '../../../providers/service/profileservice';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../../profile/profile';
import { PerfilService } from '../../../providers/service/perfilservice';
import { AuthService } from '../../../providers/auth/auth-service';
import { ShoppingListPage } from '../../teste/shopping-list/shopping-list';
import { CorridaMototaxiService } from '../../../providers/service/corridaMototaxiservice';
import { AcompanharPage } from '../../acompanhar/acompanhar';



@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {

teste : any;

  testCheckboxResult: any;
  testCheckboxOpen: boolean;
 
  items: FirebaseListObservable<any[]>;
  profileData: FirebaseObjectObservable<Profile>
  CorridaAndamento: FirebaseListObservable<any[]>;
    profile = {} as Profile;
  administrador: any;
  itemss: FirebaseListObservable<any>;
  constructor(
    public navCtrl: NavController, public alertCtrl: AlertController,
     private corridaService: CorridaService,  private navParams: NavParams,  
     private perfilService: PerfilService,
     private corridaMototaxiService: CorridaMototaxiService,
     private toast: ToastController,
     private authService: AuthService,
     private afAuth: AngularFireAuth,
     private afDatabase: AngularFireDatabase,
     public menuCtrl: MenuController,
) {
  this.menuCtrl.enable(true,'myMenu');
  this.items = this.corridaService.getFirst();
  this.CorridaAndamento = this.corridaMototaxiService.getFirst();

  this.itemss = this.afDatabase.list('/profile');
  this.administrador=this.afAuth.auth.currentUser.uid;
  

}


ir(){
  this.navCtrl.setRoot(ShoppingListPage);
}

editarPerfil(){
this.navCtrl.push(ProfilePage);
}

SolicitarCorrida(){
  this.navCtrl.push(SolicitarPage);
}

newContact() {
  this.navCtrl.push(AcompanharCorridaPage);
}

editItem(item: any) {
  this.navCtrl.push(AcompanharCorridaPage, { corrida: item });
}
aceitarItem(item: any) {
  this.navCtrl.push(AcompanharPage, { corrida: item });
}

removeItem(item: any) {
  this.corridaService.remove(item);
}
removeItemM(item: any) {
  this.corridaMototaxiService.remove(item);
}



}

