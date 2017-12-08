import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../../providers/auth/auth-service';
import { LoginPage } from '../../login/login';


@Component({
  selector: 'page-mcorrida',
  templateUrl: 'mcorrida.html'
})
export class McorridaPage {

  constructor(public navCtrl: NavController, private authService: AuthService) {

  }

  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.parent.parent.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
