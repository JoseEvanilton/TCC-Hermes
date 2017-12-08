import { Component } from '@angular/core';


import { MfavoritoPage } from '../mototaxi/mfavorito/mfavorito';
import { MinicioPage } from '../mototaxi/minicio/minicio';
import { McorridaPage } from '../mototaxi/mcorrida/mcorrida';





@Component({
  templateUrl: 'tabss.html'
})
export class TabssPage {

  tab1Root = MinicioPage;
  tab2Root = MfavoritoPage;
  tab3Root = McorridaPage;


  constructor() {

  }
}

