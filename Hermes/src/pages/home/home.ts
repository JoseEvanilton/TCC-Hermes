import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { ListPage } from '../list/list';
import { GerenciaPage } from '../gerencia/gerencia';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../providers/service/profileservice';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>
  usuarioName: string;
  usuarioKey: string;
  usuarioCel: string;
  usuarioEndereco: string;
  usuarioBairro: string;
  usuarioRua: string;
  usuarioNumero: string;
  usuarioCpf: string;
  usuarioCnpj: string;
  usuarioPerfil: string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private toast: ToastController,
     private afAuth: AngularFireAuth,
     private afDatabase: AngularFireDatabase,
    private profileService: ProfileService) {
      this.usuarioKey = null;
      this.usuarioName = '';
      this.usuarioCel = '';
      this.usuarioBairro= '';
      this.usuarioRua= '';
      this.usuarioNumero= '';
      this.usuarioCpf = '';
      this.usuarioCnpj = '';
    


    if (this.navParams.data.profile) {
      this.usuarioName = this.navParams.data.profile.name;
      this.usuarioCel = this.navParams.data.profile.celular;
      this.usuarioBairro = this.navParams.data.profile.bairro;
      this.usuarioRua = this.navParams.data.profile.rua;
      this.usuarioNumero = this.navParams.data.profile.numero;
      this.usuarioCpf = this.navParams.data.profile.cpf;
      this.usuarioCnpj = this.navParams.data.profile.cnpj;
 //     this.usuarioPerfil = this.navCtrl.data.profile.perfil;
      this.usuarioKey = this.navParams.data.profile.$key;
    }
  }

  save() {
    this.profileService.save(
      this.usuarioName, 
      this.usuarioCel, 
      this.usuarioBairro,
      this.usuarioRua,
      this.usuarioNumero,
      this.usuarioCpf,
      this.usuarioCnpj,
      this.usuarioPerfil,
      this.usuarioKey);

    this.navCtrl.setRoot(TabsPage);
}
}



  


