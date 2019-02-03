import { MyappsComponent } from '../components/myapps/myapps.component';

export class FileItem {

    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;
    public nombreApp?: string;
    public descripcion?: string;
    public appUrl?: string;

    constructor(archivo: File) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;


        this.estaSubiendo = false;
        this.progreso = 0;
    }

}
