import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';



@Component({
  selector: 'page-minicio',
  templateUrl: 'minicio.html'
})
export class MinicioPage {
  testCheckboxResult: any;
  testCheckboxOpen: boolean;


  constructor(
    public navCtrl: NavController, public alertCtrl: AlertController
) { }

doPrompt() {

 let  prompt = this.alertCtrl.create({
    
    title: 'Solicitar Corridas',
    message: "Para Solicitar a corrida e necessario os dados da sua localidade:",
    inputs: [
      {
        type: 'text',
        placeholder: 'Endereço',
      },
  
      {
        type: 'text',
        placeholder: 'Bairro',
      },

      {
        name: 'text',
        placeholder: 'Observação',
      },

    
    ],



    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Enviar',
        handler: data => {
          console.log('Saved clicked');
        }
      }
    ]
  });
  
  prompt.present();

}
}

