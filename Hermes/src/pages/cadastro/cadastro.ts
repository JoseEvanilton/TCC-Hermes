import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { TabsPage } from '../tabs/tabs';
import { ImagePicker } from '@ionic-native/image-picker';
import { UsuarioService } from '../../providers/service/usuarioservice';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
 
  usuarioName: string;
  usuarioKey: string;
  usuarioCel: string;
  usuarioEndereco: string;
  usuarioBairro: string;
  usuarioRua: string;
  usuarioNumero: string;
  usuarioCpf: string;
  usuarioCnpj: string;
 
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private imagePicker: ImagePicker,
    private afAuth: AngularFireAuth) {


      this.usuarioKey = null;
      this.usuarioName = '';
      this.usuarioCel = '';
      this.usuarioBairro= '';
      this.usuarioRua= '';
      this.usuarioNumero= '';
      this.usuarioCpf = '';
      this.usuarioCnpj = '';


    if (this.navParams.data.usuario) {
      this.usuarioName = this.navParams.data.usuario.name;
      this.usuarioCel = this.navParams.data.usuario.celular;
      this.usuarioBairro = this.navParams.data.usuario.bairro;
      this.usuarioRua = this.navParams.data.usuario.rua;
      this.usuarioNumero = this.navParams.data.usuario.numero;
      this.usuarioCpf = this.navParams.data.usuario.cpf;
      this.usuarioCnpj = this.navParams.data.usuario.cnpj;
      this.usuarioKey = this.navParams.data.usuario.$key;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }


  save() {
      this.usuarioService.save(
        this.usuarioName, 
        this.usuarioCel, 
        this.usuarioBairro,
        this.usuarioRua,
        this.usuarioNumero,
        this.usuarioCpf,
        this.usuarioCnpj,
        this.usuarioKey);
      this.navCtrl.setRoot(TabsPage);
  }
}
