import { FileItem } from './../models/file-item';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreModule, validateEventsArray } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';






@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {


  constructor(private db: AngularFirestore,
    private storage2: AngularFireStorage) {


  }



   guardarImagen(imagen: { nombre?: string, url: string, appUrl?: string, descripcion?: string, nombreApp?: string }, carpeta: string) {

    this.db.collection(`/${carpeta}`)
      .add(imagen);
  }



  getBase64FomFile(img: any, callback) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', function (evt) {
      callback(fileReader.result);
    });
    fileReader.readAsDataURL(img);
  }




  cargarImagenesFirebase(imagenes: FileItem[], nombreCarpeta: string, type: number, form?: any) {

    console.log(form);



    // obtener la referencia al storage(el root)
    const storageRef = firebase.storage().ref();



    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }



      this.getBase64FomFile(item.archivo, (base64) => {
        const img = base64.split('base64,')[1];



        const uploadTask: firebase.storage.UploadTask =
          // path del upload de la imagen
          storageRef.child(`${nombreCarpeta}/${ new Date().getTime() + item.nombreArchivo}`)
            .putString(img, 'base64', {contentType: 'image/jpg'});

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          // obtener el progreso y convertirlo a % para visualizarlo
          (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          (error) => console.error('Error al subir', error),
          () => {
            console.log('Imagen cargada correctamente');
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              item.url = downloadURL;
              item.estaSubiendo = false;


              // Guardamos los datos de la imagen en la BD CloudFireStore
              if (type === 1) {
                this.guardarImagen({
                  nombre: item.nombreArchivo,
                  url: item.url
                }, nombreCarpeta);
              } else {
                this.guardarImagen({
                  nombre: form.nombre, // viene del form en los parametros del metodo principal
                  url: item.url, // url del archivo
                  appUrl: form.appUrl,
                  // nombreApp: item.nombreApp
                }, nombreCarpeta);

              }

            });

          }
        );

      });

    }


  }


  addApp(value: any, avata: any) {
    return this.db.collection('myapps').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      url: value.url,
      img: avata
    });

  }

  getMyApps() {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/myapps').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      });
    });
  }



}
