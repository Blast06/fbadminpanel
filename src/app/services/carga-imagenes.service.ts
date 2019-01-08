import { FileItem } from './../models/file-item';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { defineBase } from '@angular/core/src/render3';
import { GuardsCheckStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) {

  }


  private guardarImagen(imagen: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add(imagen);
  }

  cargarImagenesFirebase(imagenes: FileItem[]) {

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
