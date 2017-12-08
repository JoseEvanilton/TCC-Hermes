import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InicioPage } from '../cliente/inicio/inicio';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private todo: FormGroup;
  profileData: FirebaseObjectObservable<Profile>
  item: FirebaseListObservable<any[]>
  profile = {} as Profile;
  administrador = true;
  x;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private toast: ToastController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private formBuilder: FormBuilder) {
      this.todo = this.formBuilder.group({
        usuarioName: [null, [Validators.required, Validators.pattern('[a-zA-ZÉéÁáãÃõÕ ]*')]],
        usuarioCel: [null, [Validators.required, Validators.pattern('[0-9]*')]],
        usuarioBairro: [null, [Validators.required, Validators.pattern('[a-zA-ZÉéÁáãÃõÕ ]*')]],
        usuarioRua: [null, [Validators.required, Validators.pattern('[a-zA-ZÉéÁáãÃõÕ ]*')]],
        usuarioNumero: [null, [Validators.required, Validators.pattern('[0-9]*')]],
       });
    }

  

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data =>{
      if(data && data.email && data.uid){
        this.toast.create({

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
  fron() {
    console.log(this.todo.value)
  }
createProfile(){
  this.afAuth.authState.take(1).subscribe(auth =>{
    
    this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
   
    .then(()=> this.navCtrl.setRoot(InicioPage)
    
  ); 
  this.toast.create({
    message: `Usuario criado com sucesso.`,
    duration: 3000
  }).present();
  })
}

}