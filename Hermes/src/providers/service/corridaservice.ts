import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase/app';

@Injectable()
export class CorridaService {

  items: FirebaseListObservable<any[]>;
  FirstItems: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private fb: FirebaseApp) {
    let path = '/corrida/' //+ this.angularFireAuth.auth.currentUser.uid;
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

  public save(name: any, cel: any, bairro: any,endereco: any,numero: any, observacao: any,cancelar: any,status: any, key: any) {
    if (key) {
      return this.items.update(key, {name: name, cel: cel, bairro: bairro, endereco: endereco, numero: numero, observacao: observacao, cancelar: cancelar,status: status});
    } else {
      return this.items.push({name: name, cel: cel, bairro: bairro, endereco: endereco, numero: numero,  observacao: observacao, cancelar: cancelar,status: status});
    }
  }

  public remove(item: any) {
    return this.items.remove(item.$key)
    
}

}

