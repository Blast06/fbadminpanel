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

  list:string[];
  
  
 
  estaSobreElemento =  false;
  nombreCarpeta:string;
  constructor(public _cargaImagenes:CargaImagenesService) {
    
    this.list = [
      "Frases de amor",
      "Frases cortas",
      "juntos x 1oopre",
      "Frases atrevidas",
      "saludos y despedidas",
      "Amor graciosas",
      "Poemas de amor",
      "Amor a Distancia",
      "Preguntas de Amor",
      "Cartas de Amor",
      "Frases de Besos",
      "Disculpas de amor",
      "Imagenes de te extrano",
    ];
  
  }

  onChange(deviceValue) {
    console.log(deviceValue);
}
  ngOnInit() {
  }

  

  cargaImagenes(){
    
    this._cargaImagenes.cargarImagenesFirebase( this.archivos);
  }

  limpiarArchivos(){
    this.archivos = [];
  }

  irCarpeta(item:any){




  }

}
