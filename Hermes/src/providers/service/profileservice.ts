import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase/app';

@Injectable()
export class ProfileService {

  items: FirebaseListObservable<any[]>;
  user;
  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private fb: FirebaseApp) {
    let path = '/profile/';
    this.items = db.list(path, {
      query: {
  //    limitToFirst:1 , // puxa somente o primeiro que foi cadastro
  //  limitToLast: 1, // puxa somente o ultimo que foi cadastro
        orderByChild: 'data'
      //  equalTo: 'a' //para fazer query com valor igual a "A"
      }
    });
  }
  
  public save(name: any,celular: any,bairro: any,rua: any,numero: any,cpf: any, cnpj: any, perfil: any, key: any) {
    if (key) {
      return this.items.update(key, { name: name, celular: celular, bairro: bairro,rua: rua, numero: numero, cpf: cpf, cnpj: cnpj, perfil: perfil});
    } else {
      return this.items.push({name: name, celular: celular, bairro: bairro,rua: rua, numero: numero, cpf: cpf, cnpj: cnpj, perfil: perfil});
    }
  }

  public getAll() {
    return this.items;
  }

  public remove(item: any) {
    return this.items.remove(item.$key)
    
}


}

