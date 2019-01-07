import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CargaImagenesService } from './services/carga-imagenes.service';
import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';


@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    NgDropFilesDirective
    
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    CargaImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
