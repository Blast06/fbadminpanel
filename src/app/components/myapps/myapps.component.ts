import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileItem } from 'src/app/models/file-item';
import { _createNgProbe } from '@angular/platform-browser/src/dom/debug/ng_probe';

@Component({
  selector: 'app-myapps',
  templateUrl: './myapps.component.html',
  styleUrls: ['./myapps.component.css']
})
export class MyappsComponent implements OnInit {

  myForm: FormGroup;
  archivos: FileItem[] = [];
  estaSobreElemento = false;
  nombreCarpeta = 'apps';


  items: Array<any>;

  constructor( public _carga: CargaImagenesService, private fb: FormBuilder) {

   }

  ngOnInit() {
    this.myForm = this.fb.group({
      nombre: [null, [
        Validators.required,
        Validators.minLength(2)
      ]],
      appUrl: [null, [
        Validators.required
      ]],
      descripcion: [null, [
        Validators.required
      ]],
    });
    this.myForm = this.fb.group({
      nombre: null,
      appUrl: null,
      descripcion: null,

    });
    this.myForm.valueChanges.subscribe(console.log);
  }

  getName() {
    return this.myForm.get('nombre');
  }
  getDescription() {
    return this.myForm.get('descripcion');
  }
  getAppUrl() {
    return this.myForm.get('appUrl');
  }

  agregarApp() {
    this._carga.cargarImagenesFirebase(this.archivos, this.nombreCarpeta, 2, this.myForm.value );
    this.limpiar();
    console.log(this.myForm.value);

  }

 limpiar() {
  this.archivos = [];
  this.myForm.reset();
 }
}
