import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase/app';

@Injectable()
export class PerfilService {

  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private fb: FirebaseApp) {
    let path = '/perfil/' + this.angularFireAuth.auth.currentUser.uid;
 
    
    this.items = db.list(path, {
      query: {
      limitToFirst:100 , // puxa somente o primeiro que foi cadastro
  //  limitToLast: 1, // puxa somente o ultimo que foi cadastro
        orderByChild: 'data'
        //, equalTo: 'A' para fazer query com valor igual a "A"
      }
    });
  }

  public getAll() {
    return this.items;
  }

  public save(perfil: any,key: any) {
    if (key) {
      return this.items.update(key, {perfil: perfil});
    } else {
      return this.items.push({perfil: perfil});
    }
  }

  public remove(item: any) {
    return this.items.remove(item.$key)
    
}

}

