import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { TabssPage } from '../pages/tabss/tabss';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth/auth-service';
import { PerfilPage } from '../pages/perfil/perfil';
import { GerenciaPage } from '../pages/gerencia/gerencia';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Profile } from '../models/profile';
import { SolicitarPage } from '../pages/solicitar/solicitar';
import { ProfileService } from '../providers/service/profileservice';
import { ShoppingListPage } from '../pages/teste/shopping-list/shopping-list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  profileData: FirebaseObjectObservable<Profile>
  profile = {} as Profile;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any,icon: any}>;
  displayName: string;
  displayEmail: string;
  usuarioName: string;
  administrador:any;
  itemss: FirebaseListObservable<any>;
  constructor( public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    private toast: ToastController, private afDatabase: AngularFireDatabase,
    private profileService: ProfileService, 
    public  afAuth: AngularFireAuth, private authService: AuthService ) {
    this.initializeApp();
    this.usuarioName = '';

    this.pages = [
      { title: 'Inicio', component: TabsPage, icon:'ios-home-outline'},
      { title: 'Perfil', component: PerfilPage , icon:'ios-person-outline'},
      { title: 'Gerenciar', component: GerenciaPage, icon:'ios-settings-outline'},
    ];

    afAuth.authState.subscribe(user => {
      if (user) {
 
        this.rootPage = LoginPage;
      } else {
        this.rootPage = LoginPage;
      }
    });

  }
 

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
  gerenciar(){

    this.nav.push(GerenciaPage);
  }
  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth =>{
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
    //  .then(()=> this.navCtrl.setRoot(InicioPage)); 
    })
}
ionViewWillLoad(){
  this.afAuth.authState.take(1).subscribe(data =>{
    if(data && data.email && data.uid){
      this.toast.create({
        message: `Bem Vindo ao Hermes, ${data.email}`,
        duration: 3000
      }).present();
      this.profileData=this.afDatabase.object(`profile/${data.uid}`)
    }
    else {
      this.toast.create({
        message: `Usuario não autenticado.`,
        duration: 3000
      }).present();
    }
  })
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.nav.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
}
