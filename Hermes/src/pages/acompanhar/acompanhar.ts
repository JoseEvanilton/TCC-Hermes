import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../providers/auth/auth-service';
import { CorridaService } from '../../providers/service/corridaservice';
import { CorridaPage } from '../cliente/corrida/corrida';
import { FinalizarCorridaPage } from '../finalizar-corrida/finalizar-corrida';
import { InicioPage } from '../cliente/inicio/inicio';
import { Label } from 'ionic-angular/components/label/label';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Profile } from '../../models/profile';
import { ProfilePage } from '../profile/profile';
import { CorridaClienteService } from '../../providers/service/corridaClienteservice';
import { CorridaMototaxiService } from '../../providers/service/corridaMototaxiservice';
import { Item } from 'ionic-angular/components/item/item';
import { AcompanharCorridaPage } from '../acompanhar-corrida/acompanhar-corrida';
import { TabsPage } from '../tabs/tabs';
import { FirebaseListObservable } from 'angularfire2/database';
import { FavoritoService } from '../../providers/service/favoritoservice';

/**
 * Generated class for the AcompanharCorridaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-corrida',
  templateUrl: 'acompanhar.html',
})
export class AcompanharPage {
  corridaKey: string;
  corridaName: string;
  corridaCel: string;
  corridaBairro: string;
  corridaEndereco: string;
  corridaNumero: string;
  corridaObservacao: string;
  corridaCancelar: string;
  corridaStatus: string;
  favoritoKey: String;
  favoritoKeyMoto: String;
  favorito: String;
  private todo: FormGroup;
  model: Profile;
  items: FirebaseListObservable<any[]>;
  constructor(private navCtrl: NavController, private navParams: NavParams,
    private corridaService: CorridaService,
    private favoritoService: FavoritoService,
    private corridaClienteService: CorridaClienteService,
    private corridaMototaxiService: CorridaMototaxiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController) {
    this.corridaKey = null;
    this.corridaName="";
    this.corridaCel="";
    this.corridaBairro ="";
    this.corridaEndereco="";
    this.corridaNumero="";
    this.corridaObservacao="";
    this.corridaCancelar="";
    this.corridaStatus="";
    this.favoritoKey=null;
    this.favoritoKeyMoto=null;
    this.favorito="";
    
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

   if (this.navParams.data.favorito)   {
     this.favoritoKey = this.navParams.data.favorito.$key;
     this.favoritoKeyMoto =this.navParams.data.favorito.keyMoto;
     this.favorito=this.navParams.data.favorito.favorito;
   }
   
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AcompanharCorridaPage');

  }

  fron() {
    console.log(this.todo.value)
  }





    save() {
      this.saveFavorito();
      this.corridaMototaxiService.save(
        this.corridaName,
        this.corridaCel,
        this.corridaBairro,
        this.corridaEndereco,
        this.corridaNumero,
        this.corridaObservacao,
        this.corridaCancelar,
        this.corridaStatus,
        this.corridaKey,
  
      )
    }


    saveFavorito() {
      
            this.favoritoService.save(
              this.favoritoKeyMoto,
              this.favorito,
              this.favoritoKey,
            )
          }

          presentConfirm() {
            let alert = this.alertCtrl.create({
              title: 'Pegar essa Corrida?',
              message: 'A partir do momento que ACEITAR e de sua total responsabilidade de fazer essa corrida. Caso nao se não queira clica em CANCELAR',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    this.navCtrl.pop();
                  }
                },
                {
                  text: 'Aceitar',
                  handler: data => {
                    this.favoritoKeyMoto=this.afAuth.auth.currentUser.uid;
                    this.corridaStatus='Corrida Aceita';
                    this.corridaCancelar="";
                    this.corridaService.remove(this.corridaKey);
                    this.save();
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            alert.present();
          }
     
        }

        