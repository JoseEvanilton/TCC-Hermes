import { Component } from '@angular/core';

import { InicioPage } from '../cliente/inicio/inicio';
import { FavoritoPage } from '../cliente/favorito/favorito';
import { CorridaPage } from '../cliente/corrida/corrida';
import { MfavoritoPage } from '../mototaxi/mfavorito/mfavorito';
import { MinicioPage } from '../mototaxi/minicio/minicio';
import { McorridaPage } from '../mototaxi/mcorrida/mcorrida';





@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InicioPage;
  tab2Root = FavoritoPage;
  tab3Root = CorridaPage;


  constructor() {

  }
}

