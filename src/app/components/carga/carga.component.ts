import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { FileItem } from './../../models/file-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] =[];
  estaSobreElemento =  false;
  constructor(public _cargaImagenes:CargaImagenesService) { }

  ngOnInit() {
  }

  

  cargaImagenes(){
    this._cargaImagenes.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
