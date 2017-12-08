import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth/auth-service';
import { LoginPage } from '../../login/login';
import { CorridaService } from '../../../providers/service/corridaservice';
import { FirebaseListObservable } from 'angularfire2/database';
import { SolicitarPage } from '../../solicitar/solicitar';
import { CorridaClienteService } from '../../../providers/service/corridaClienteservice';
import { DcorridaPage } from '../../dcorrida/dcorrida';


@Component({
  selector: 'page-corrida',
  templateUrl: 'corrida.html'
})
export class CorridaPage {
  items: FirebaseListObservable<any[]>;
  
    constructor(private navCtrl: NavController, private navParams: NavParams, private corridaClienteService: CorridaClienteService) {
      this.items = this.corridaClienteService.getAll();
    }
    
  
    newContact() {
      this.navCtrl.push(DcorridaPage);
    }
  
    editItem(item: any) {
      this.navCtrl.push(DcorridaPage, { corrida: item });
    }
  
    removeItem(item: any) {
      this.corridaClienteService.remove(item);
    }
}
