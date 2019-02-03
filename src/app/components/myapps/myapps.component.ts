import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myapps',
  templateUrl: './myapps.component.html',
  styleUrls: ['./myapps.component.css']
})
export class MyappsComponent implements OnInit {


  items: Array<any>;

  constructor( public _carga: CargaImagenesService) { }

  ngOnInit() {
  }

}
