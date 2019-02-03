import { FileItem } from './../models/file-item';
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {


  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();



  constructor() { }

  @HostListener('dragover' , ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit( true );
    this._prevenirDetener(event);
  }

  @HostListener('dragleave' , ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit( false );
  }


  @HostListener('drop' , ['$event'])
  public onDrop( event: any ) {

    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }
    this._extraerArchivos( transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit( false );
  }

  // Esto es una directiva para controlar la interaccion de los archivos.
  // Los hostlistener dragover y dragleave se utilizan para cambiar el estado/color del espacio donde se colocan
  // los archivos a subir.
  // drop es para cuando se suelta.

  private _getTransferencia( event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {

    console.log(archivosLista);

    // ciclo for para barrer cada una de las propiedades de los archivos a cargar para ver si puede ser cargado
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {

      const archivoTemporal = archivosLista[propiedad];

      // si el archivo contiene las caracteriticas de imagen, entonces se agrega a la variable 'archivos'
      if (this._archivopuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem( archivoTemporal);
        this.archivos.push(nuevoArchivo);

      }

    }
  }




  // Validaciones

  private _archivopuedeSerCargado( archivo: File): boolean {

    // si no ha sido dropeado el archivo, y si es una imagen, entonces manda true
    if (!this._archivoYaFueDroppeado( archivo.name) && this._esImagen( archivo.type )) {
      return true;

    } else {
      return false;
    }
  }


  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();

  }

  // Para verificar si el archivo ya fue dropeado
  private _archivoYaFueDroppeado( nombreArchivo: string): boolean {

    for ( const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('el archivo ' + nombreArchivo + 'ya esta agregado');
        return true;

      }
    }

    return false;
  }

  // Para que solo acepten imagenes en el drop
  private _esImagen( tipoArchivo: string): boolean {             // el startswith('image') lee el doctype(image.jpg,png,etc)
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
