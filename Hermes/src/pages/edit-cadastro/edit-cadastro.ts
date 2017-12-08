import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Profile } from '../../models/profile';


@Component({
  selector: 'page-edit-cadastro',
  templateUrl: 'edit-cadastro.html',
})
export class EditCadastroPage {
items: FirebaseObjectObservable<Profile>
profile = {} as Profile;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase) {

      const profileId = this.navParams.get('profileId');

      console.log(profileId);

      this.items=this.database.object(`profile/${profileId}`);

      this.items.subscribe(profile => this.profile = profile);
  }
  profileUpdate(profile: Profile){
    this.items.update(profile);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCadastroPage');
  }

}
