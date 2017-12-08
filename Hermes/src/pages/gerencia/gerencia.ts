import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, ToastController, Platform, ActionSheetController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';
import { ProfileService } from '../../providers/service/profileservice';
import { Profile } from '../../models/profile';
import { PerfilPage } from '../perfil/perfil';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { EditCadastroPage } from '../edit-cadastro/edit-cadastro';
import { isTrueProperty } from 'ionic-angular/util/util';



@Component({
  selector: 'page-gerencia',
  templateUrl: 'gerencia.html'
})
export class GerenciaPage {
  model: Perfil;
  profile: Profile;
 // items: FirebaseListObservable<Profile[]>
 items: FirebaseListObservable<any>;
  administrador = true;
  _scrollX: boolean = false;
  x;
  user: User = new User();
  @ViewChild('form') form: NgForm;
  constructor(private navCtrl: NavController, private  navParams: NavParams,
     private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController, private retProvider: RestProvider) {
   this.model=new Perfil();
   
      // this.items =  this.profileService.getAll();
    this.items = this.database.list('/profile');
    // this.model.item = this.database.list('profile');
    // for(var i=0;i<2;i++){
    //   if(this.model.item.profile[i].entries.key.usuarioPerfil.equals("Cliente")){
    //     this.model.cliente = this.model.item.profile[i].key.usuarioPerfil;
    //   }
    // }

  }

  selectProfile(profile: Profile){
    this.actionSheetCtrl.create({
    
     title:  profile.usuarioName,

     buttons: [
       
       {
         text: 'Editar',
         handler: () =>{
           this.navCtrl.push(EditCadastroPage, {profileId: profile.$key});
         }
       },
       {
         text: 'Deletar',
         role: 'destructive',
         handler: () =>{
           this.items.remove(profile.$key)
         }
       },
         {
           text: 'Cancelar',
           role: 'cancel',
           handler: () =>{
             console.log("the user has selected the cancel button");
           }
         }        
     ]

    }).present();

    
 }

ionViewDidLoad() {

  }
 
  

}

export class Perfil{
cliente: any;
mototaxi: any;
gerente: any;
item:any;
}




  


