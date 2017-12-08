import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase/app';

@Injectable()
export class FavoritoService {

  items: FirebaseListObservable<any[]>;
  FirstItems: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private fb: FirebaseApp) {
    let path = '/favorito/' + this.angularFireAuth.auth.currentUser.uid;
    this.items = db.list(path, {
      query: {
      //  orderByChild: 'corrida'
       // orderByChild: 'bairro'
        //, equalTo: 'A' para fazer query com valor igual a "A"
      }
    });

    this.FirstItems = db.list(path, {
      query: {
        limitToFirst:1 , // puxa somente o primeiro que foi cadastro
        //  limitToLast: 1, // puxa somente o ultimo que foi cadastro
              orderByChild: 'data'
              //, equalTo: 'A' para fazer query com valor igual a "A"
      //  orderByChild: 'corrida'
       // orderByChild: 'bairro'
        //, equalTo: 'A' para fazer query com valor igual a "A"
      }
    });
 
  }
  public getAll() {
    return this.items;
  }

  public getFirst() {
    return this.FirstItems;
  }

  public save(keyMoto: any, favorito: any,key: any) {
    if (key) {
      return this.items.update(key, {keyMoto: keyMoto,  favorito: favorito});
    } else {
      return this.items.push({keyMoto: keyMoto, favorito: favorito});
    }
  }

  public remove(item: any) {
    return this.items.remove(item.$key)
    
}

}

