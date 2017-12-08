import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CadastroPage } from '../../cadastro/cadastro';
import { UsuarioService } from '../../../providers/service/usuarioservice';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-favorito',
  templateUrl: 'favorito.html'
})
export class FavoritoPage {
  items: FirebaseListObservable<any[]>;
  
    constructor(private navCtrl: NavController, private navParams: NavParams, private usuarioService: UsuarioService) {
      this.items = this.usuarioService.getAll();
    }
  
    newContact() {
      this.navCtrl.push(CadastroPage);
    }
  
    editItem(item: any) {
      this.navCtrl.push(CadastroPage, { usuario: item });
    }
  
    removeItem(item: any) {
      this.usuarioService.remove(item);
    }
  }