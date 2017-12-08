import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { CorridaService } from '../../providers/service/corridaservice';
import { CorridaPage } from '../cliente/corrida/corrida';
import { AngularFireAuth } from 'angularfire2/auth';
import { InicioPage } from '../cliente/inicio/inicio';
import { CorridaClienteService } from '../../providers/service/corridaClienteservice';
import { CorridaMototaxiService } from '../../providers/service/corridaMototaxiservice';

/**
 * Generated class for the SolicitarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitar',
  templateUrl: 'solicitar.html',
})
export class SolicitarPage {
  corridaKey: string;
  corridaName: string;
  corridaCel: string;
  corridaBairro: string;
  corridaEndereco: string;
  corridaNumero: string;
  corridaObservacao: string;
  corridaCancelar: string;
  corridaStatus: string;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private corridaService: CorridaService,
    private authService: AuthService,
    private corridaClienteService: CorridaClienteService,
    private corridaMototaxiService: CorridaMototaxiService,
    private afAuth: AngularFireAuth) {
       this.corridaKey = null;
       this.corridaName="";
       this.corridaCel="";
       this.corridaBairro ="";
       this.corridaEndereco="";
       this.corridaNumero="";
       this.corridaObservacao="";
       this.corridaCancelar="";
       this.corridaStatus="";

       
       if (this.navParams.data.corrida)   {
         this.corridaName = this.navParams.data.corrida.name;
         this.corridaCel = this.navParams.data.corrida.cel;
        this.corridaBairro = this.navParams.data.corrida.bairro;
        this.corridaEndereco = this.navParams.data.corrida.endereco;
        this.corridaNumero = this.navParams.data.corrida.numero;
        this.corridaObservacao = this.navParams.data.corrida.observacao;
        this.corridaCancelar = this.navParams.data.corrida.cancelar;
        this.corridaStatus = this.navParams.data.corrida.status;
        this.corridaKey = this.navParams.data.corrida.$key;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitarPage');
  }

  

  save() {
    this. saveMototaxi();
    this.corridaService.save(
      this.corridaName,
      this.corridaCel,
      this.corridaBairro,
      this.corridaEndereco,
      this.corridaNumero,
      this.corridaObservacao,
      this.corridaKey,
      this.corridaCancelar,
      this.corridaStatus
    )
    this.navCtrl.setRoot(InicioPage);
  }

  saveCliente() {
    this.corridaClienteService.save(
      this.corridaName,
      this.corridaCel,
      this.corridaBairro,
      this.corridaEndereco,
      this.corridaNumero,
      this.corridaObservacao,
      this.corridaKey,
      this.corridaCancelar,
      this.corridaStatus
    )
    this.navCtrl.setRoot(InicioPage);
  }

  saveMototaxi() {
    this.corridaMototaxiService.save(
      this.corridaName,
      this.corridaCel,
      this.corridaBairro,
      this.corridaEndereco,
      this.corridaNumero,
      this.corridaObservacao,
      this.corridaKey,
      this.corridaCancelar,
      this.corridaStatus
    )
    this.navCtrl.setRoot(InicioPage);
  }
}
 /* resetPassword() {
    if (this.form.form.valid) {

      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
      this.authService.resetPassword(this.userEmail)
        .then(() => {
          toast.setMessage('Solicitação foi enviada para o seu e-mail.')
          toast.present();

          this.navCtrl.pop();
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          }

          toast.present();
        });
    }
  }
}*/
