import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';

import { MyApp } from './app.component';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth/auth-service';
import { LoginPage } from '../pages/login/login';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { SignupPage } from '../pages/signup/signup';
import { SigninWithEmailPage } from '../pages/signinwithemail/signinwithemail';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { PerfilPage } from '../pages/perfil/perfil';
import { CorridaPage } from '../pages/cliente/corrida/corrida';
import { InicioPage } from '../pages/cliente/inicio/inicio';
import { FavoritoPage } from '../pages/cliente/favorito/favorito';
import { MfavoritoPage } from '../pages/mototaxi/mfavorito/mfavorito';
import { MinicioPage } from '../pages/mototaxi/minicio/minicio';
import { McorridaPage } from '../pages/mototaxi/mcorrida/mcorrida';
import { TabssPage } from '../pages/tabss/tabss';
import { GerenciaPage } from '../pages/gerencia/gerencia';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ImagePicker } from '@ionic-native/image-picker';
import { UsuarioService } from '../providers/service/usuarioservice';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { SolicitarPage } from '../pages/solicitar/solicitar';
import { CorridaService } from '../providers/service/corridaservice';
import { ProfileService } from '../providers/service/profileservice';
import { AcompanharCorridaPage } from '../pages/acompanhar-corrida/acompanhar-corrida';
import { FinalizarCorridaPage } from '../pages/finalizar-corrida/finalizar-corrida';
import { PerfilService } from '../providers/service/perfilservice';
import { RestProvider } from '../providers/rest/rest';
import { HttpModule } from '@angular/http';
import { AddShoppingPage } from '../pages/teste/add-shopping/add-shopping';
import { ShoppingListPage } from '../pages/teste/shopping-list/shopping-list';
import { EditshoppingItemPage } from '../pages/editshopping-item/editshopping-item';
import { EditCadastroPage } from '../pages/edit-cadastro/edit-cadastro';
import { CorridaClienteService } from '../providers/service/corridaClienteservice';
import { CorridaMototaxiService } from '../providers/service/corridaMototaxiservice';
import { AcompanharPage } from '../pages/acompanhar/acompanhar';
import { FavoritoService } from '../providers/service/favoritoservice';
import { DcorridaPage } from '../pages/dcorrida/dcorrida';


const firebaseConfig = {
  apiKey: "AIzaSyCtBfd___hjOH4ibhyZIhWgavYSpnT5v58",
  authDomain: "hermes-d165c.firebaseapp.com",
  databaseURL: "https://hermes-d165c.firebaseio.com",
  projectId: "hermes-d165c",
  storageBucket: "hermes-d165c.appspot.com",
  messagingSenderId: "993632072841"
  };

@NgModule({
  declarations: [
    MyApp,

    LoginPage,
    ListPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    CorridaPage,
    InicioPage,
    FavoritoPage,
    PerfilPage,
    MinicioPage,
    MfavoritoPage,
    McorridaPage,
    TabssPage,
    GerenciaPage,
    TabsPage,
    CadastroPage,
    HomePage,
    ProfilePage,
    SolicitarPage,
    AcompanharCorridaPage,
    FinalizarCorridaPage,
    ShoppingListPage,
    AddShoppingPage,
    EditshoppingItemPage,
    EditCadastroPage,
    AcompanharPage,
    DcorridaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    LoginPage,
    ListPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    CorridaPage,
    InicioPage,
    FavoritoPage,
    PerfilPage,
    MinicioPage,
    MfavoritoPage,
    McorridaPage,
    GerenciaPage,
    TabssPage,
    TabsPage,
    CadastroPage,
    HomePage,
    ProfilePage,
    SolicitarPage,
    AcompanharCorridaPage,
    FinalizarCorridaPage,
    ShoppingListPage,
    AddShoppingPage,
    EditshoppingItemPage,
    EditCadastroPage,
    AcompanharPage,
    DcorridaPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UsuarioService,
    CorridaService,
    ProfileService,
    PerfilService,
    CorridaClienteService,
    CorridaMototaxiService,
    Facebook,
    FavoritoService,
    GooglePlus,
    ImagePicker,
    RestProvider,
   
  ]
})
export class AppModule {}
