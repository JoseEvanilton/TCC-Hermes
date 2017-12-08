import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item-interface';

/**
 * Generated class for the EditshoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editshopping-item',
  templateUrl: 'editshopping-item.html',
})
export class EditshoppingItemPage {

  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>

  shoppingItem = {} as ShoppingItem;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  private database: AngularFireDatabase) {
    
    const shoppingItemId = this.navParams.get('shoppingItemId');

    console.log(shoppingItemId);

    this.shoppingItemRef$=this.database.object(`shopping-list/${shoppingItemId}`);

    this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem);
  }
  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.update(shoppingItem);
    this.navCtrl.pop();
  }
}
