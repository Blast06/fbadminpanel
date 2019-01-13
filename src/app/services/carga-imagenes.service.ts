import { FileItem } from './../models/file-item';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { AngularFireStorage } from '@angular/fire/storage';
import { defineBase } from '@angular/core/src/render3';
import { GuardsCheckStart } from '@angular/router';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'frases_amor';
 

  constructor(private db: AngularFirestore,
    private storage2: AngularFireStorage) {

    //  this.categorias =  db.collection('/').valueChanges();
    //  console.log(this.categorias);

    // db.collection('/categorias').doc('amor').set(this.NOMBRE_CATEGORIA);

  }


  private guardarImagen(imagen: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add(imagen);
    // this.db.collection('/categorias/').add(this.NOMBRE_CATEGORIA);
    // console.log(this.db.collection('/categorias'));
  }

  cargarImagenesFirebase(imagenes: FileItem[], indice: number) {
    switch (indice) {
      case 1:
        this.CARPETA_IMAGENES = 'frases_amor';
        break;

      case 2:
        this.CARPETA_IMAGENES = 'frases_cortas';
        break;

      case 3:
        this.CARPETA_IMAGENES = 'frases_juntos_100pre';
        break;

      case 4:
        this.CARPETA_IMAGENES = 'frases_atrevidas';
        break;

      case 5:
        this.CARPETA_IMAGENES = 'frases_saludos_despedidas';
        break;

      case 6:
        this.CARPETA_IMAGENES = 'frases_amor_graciosas';
        break;

      case 7:
        this.CARPETA_IMAGENES = 'frases_poemas_amor';
        break;

      case 8:
        this.CARPETA_IMAGENES = 'frases_amor_distancia';
        break;

      case 9:
        this.CARPETA_IMAGENES = 'frases_preguntas_amor';
        break;

      case 10:
        this.CARPETA_IMAGENES = 'frases_cartas_amor';
        break;

      case 11:
        this.CARPETA_IMAGENES = 'frases_besos';
        break;

      case 12:
        this.CARPETA_IMAGENES = 'frases_disculpas_amor';
        break;

      case 13:
        this.CARPETA_IMAGENES = 'frases_te_extrano';
        break;


      default:
        break;
    }
    //obtener la referencia al storage(el root)
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
        //path del upload
        storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
          .put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        // obtener el progreso y convertirlo a % para visualizarlo
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error("Error al subir", error),
        () => {
          console.log("Imagen cargada correctamente");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            item.url = downloadURL;
            item.estaSubiendo = false;
            // Guardamos los datos de la imagen en la BD
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          });
        }
      );


    }


  }
}
