import { Component } from '@angular/core';

import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { ListPage } from '../list/list';
import { UsuarioService } from '../../providers/service/usuarioservice';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { InicioPage } from '../cliente/inicio/inicio';
import { ProfilePageModule } from '../profile/profile.module';
import { ProfilePage } from '../profile/profile';
import { ProfileService } from '../../providers/service/profileservice';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  items: FirebaseObjectObservable<Profile>
  profileData: FirebaseObjectObservable<Profile>

  profile = {} as Profile;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private toast: ToastController, platform: Platform,
    private profileService: ProfileService,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private afDatabase: AngularFireDatabase,) {


    const profileId = this.navParams.get('profileId');
    
          console.log(profileId);
    
          this.items=this.database.object(`profile/${profileId}`);
    
          this.items.subscribe(profile => this.profile = profile);
  }


  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth =>{
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
      .then(()=> this.navCtrl.setRoot(InicioPage)); 
    })
}
ionViewWillLoad(){
  this.afAuth.authState.take(1).subscribe(data =>{
    if(data && data.email && data.uid){
      this.toast.create({
       // message: `Bem Vindo ao Hermes, ${data.email}`,
       // duration: 3000
      }).present();
      this.profileData=this.afDatabase.object(`profile/${data.uid}`)
    }
    else {
      this.toast.create({
        message: `Usuario não autenticado.`,
        duration: 3000
      }).present();
    }
  })
}
editarPerfil(){
this.navCtrl.push(ProfilePage);
}
}



  


