export class FileItem{

    public archivo: File;
    public nombreArchivo: String;
    public url: String;
    public estaSubiendo: boolean;
    public progreso:number;

    constructor(archivo:File){
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;


        this.estaSubiendo = false;
        this.progreso = 0;
    }

}