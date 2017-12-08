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
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { FavoritoService } from '../../providers/service/favoritoservice';

/**
 * Generated class for the AcompanharCorridaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acompanhar-corrida',
  templateUrl: 'acompanhar-corrida.html',
})
export class AcompanharCorridaPage {
  corridaKey: string;
  corridaName: string;
  corridaCel: string;
  corridaBairro: string;
  corridaEndereco: string;
  corridaNumero: string;
  corridaObservacao: string;
  corridaCancelar: string;
  corridaStatus: string;
  favoritoKeyMoto: string;
  favorito: string;
  favoritoKey: string;
  private todo: FormGroup;
  model: Profile;
  items: FirebaseListObservable<any[]>;
  itemss: FirebaseListObservable<any>;  
  profile = {} as Profile;
  administrador: any;
  constructor(private navCtrl: NavController, private navParams: NavParams,
    private corridaService: CorridaService,
    private corridaClienteService: CorridaClienteService,
    private corridaMototaxiService: CorridaMototaxiService,
    private favoritoService: FavoritoService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private afDatabase: AngularFireDatabase,
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

   this.items = this.corridaMototaxiService.getFirst();
       this.todo = this.formBuilder.group({
        corridaName: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
       
       });
       this.itemss = this.afDatabase.list('/profile');
       this.administrador=this.afAuth.auth.currentUser.uid;
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AcompanharCorridaPage');

  }

  fron() {
    console.log(this.todo.value)
  }
  finalizar() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Finalizar a corrida');
    if(1==1){
    alert.addInput({
      type: 'checkbox',
      label: 'Marcar como Favorito',
      value: 'value1',
      name: 'data',
      checked: false
    });};
    alert.addButton('Voltar');
    alert.addButton({
      text: 'Finalizar Corrida',
   
      handler: data => {
        this.favorito =data;
        this.corridaStatus='Corrida Finalizada';
        this.corridaCancelar="";
        this.save();
        this.corridaMototaxiService.remove(data);
        this.navCtrl.pop();

      }
    });
    alert.present();
  }
  finalizarAdmin() {
    
        let alert = this.alertCtrl.create();
        alert.setTitle('Finalizar a corrida');
        alert.addButton('Voltar');
        alert.addButton({
          text: 'Finalizar Corrida',
       
          handler: data => {
            this.corridaStatus='Corrida Finalizada';
            this.corridaCancelar="";
            this.save();
            this.corridaMototaxiService.remove(this.corridaKey);
            this.navCtrl.pop();
    
          }
        });
        alert.present();
      }


  cancelar() {
    
     let  prompt = this.alertCtrl.create({
        
        title: 'Cancelar Solicitação',
        message: "Para cancelar a corrida e necessario preencher a observação:",
        inputs: [ 
          {
            type: 'label',
            name: 'data',
            placeholder: 'Observação',
          },
    
        
        ],    
    
        buttons: [
          {
            text: 'Volvar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: data => {
              
              this.corridaCancelar= data.data;
              this.corridaStatus='Corrida Cancelada';
              this.save();
              this.corridaMototaxiService.remove(data);
              this.navCtrl.pop();
            }
          }
        ]
      });  
      prompt.present();
    }

    saveFavorito() {
      
            this.favoritoService.save(
              this.favoritoKeyMoto,
              this.favorito,
              this.favoritoKey,
            )
          }

    save() {
      this.corridaClienteService.save(
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
        }