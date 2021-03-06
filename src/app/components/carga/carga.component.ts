import { Component, OnInit } from '@angular/core';

import { FileItem } from './../../models/file-item';
import { CargaImagenesService } from './../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];

  list: string[];

  estaSobreElemento =  false;
  nombreCarpeta = 'Frases de amor';

  constructor(public _cargaImagenes: CargaImagenesService) {

    this.list = [
      'Frases de amor',
      'Frases cortas',
      'juntos x 1oopre',
      'Frases atrevidas',
      'saludos y despedidas',
      'Amor graciosas',
      'Poemas de amor',
      'Amor_a_Distancia',
      'Preguntas de Amor',
      'Cartas de Amor',
      'Frases de Besos',
      'Disculpas de amor',
      'Imagenes de te extrano',
    ];

    // esta parte se puede mejorar con el codigo que se borro, para ponerlo con un switch y asi poder
    // cambiar el nombre de las carpitas, mas info ver: ( el commit en github
    // https://github.com/Blast06/fbadminpanel/commit/3ee7afbf7b1401312e686044d78c68f03549f058
    // ver el carga-imagenes.ts )

  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.nombreCarpeta = deviceValue;
    console.log(this.nombreCarpeta);

}
  ngOnInit() {
  }



  cargaImagenes() {

    this._cargaImagenes.cargarImagenesFirebase( this.archivos, this.nombreCarpeta, 1);
  }

  limpiarArchivos() {
    this.archivos = [];
  }

  irCarpeta(item: any) {


  }

}
