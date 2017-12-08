import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase/app';

@Injectable()
export class CorridaClienteService {

  items: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private fb: FirebaseApp) {
    let path = '/corridaCliente/' + this.angularFireAuth.auth.currentUser.uid;
    this.items = db.list(path, {
      query: {
       // equalTo: ''
      //  limitToFirst:
      
      //  orderByChild: 'corrida'
       // orderByChild: 'bairro'
        //, equalTo: 'A' para fazer query com valor igual a "A"
      }
    }); 
  }
  public getAll() {
    return this.items;
  }

  public save(name: any, cel: any, bairro: any,endereco: any,numero: any, observacao: any,cancelar: any, status: any, key: any) {
    if (key) {
      return this.items.update(key, {name: name, cel: cel, bairro: bairro, endereco: endereco, numero: numero, observacao: observacao, cancelar: cancelar, status: status});
    } else {
      return this.items.push({name: name, cel: cel, bairro: bairro, endereco: endereco, numero: numero,  observacao: observacao, cancelar: cancelar,status: status});
    }
  }

  public remove(item: any) {
    return this.items.remove(item.$key)
    
}

}

