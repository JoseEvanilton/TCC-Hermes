import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { TabsPage } from '../tabs/tabs';
import { CadastroPage } from '../cadastro/cadastro';
import { UsuarioService } from '../../providers/service/usuarioservice';
import { AngularFireAuth } from 'angularfire2/auth';
import { PerfilPage } from '../perfil/perfil';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user: User = new User();

  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
  }

  createAccount() {
    if (this.form.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authService.createUser(this.user)
        .then((user: any) => {
       //   user.sendEmailVerification();
          toast.setMessage('Por favor, Preencher o seu Perfil.');
          toast.present();
          this.navCtrl.setRoot(ProfilePage);
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();
        });
    }
  }
}
