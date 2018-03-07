import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ServicioService} from './service/servicio.service';
import {AppRoutingModule} from './app-routing.module';
import {RegistroComponent} from './registro/registro';
import {DispositivoComponent} from './dispositivos/dispositivo/dispositivo';
import {EcolectaComponent} from './eventos/registrarevento/ecolecta';
import {RegistrarDispositivoComponent} from './dispositivos/registrardispositivo/registrardispositivo';
import {RegistrarCategoriaComponent} from './categoria/registrarcategoria/registrarcategoria';
import {ConsultarCategoriaComponent} from './categoria/consultarcategoria/consultarcategoria';
import {ModificarCategoriaComponent} from './categoria/modificarcategoria/modificarcategoria';
import {ConsultarEventoComponent} from './eventos/consultareventos/consultarevento';
import { LocalStorageModule } from 'angular-2-local-storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogComponent } from './dialogo/dialog.component';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {Index1Component} from './index/index1';
import {LoginComponent} from './login/login';
import {CrearUsuarioComponent} from './usuarios/crearusuario/crearusuario';
import {ModificarEventoComponent} from './eventos/modificareventos/modificareventos';
import { ConsultarDispositivosComponent } from './dispositivos/consultardispositivos/consultardispositivos';
import {RegistrarTipoComponent} from './dispositivos/registrartipo/registrartipo';
import {ConsultarContenedorComponent} from './contenedor/consultarcontenedor/contenedor';
import {DetalleContenedorComponent} from './contenedor/detallecontenedor/detallecontenedor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    DispositivoComponent,
    RegistrarDispositivoComponent,
    RegistrarCategoriaComponent,
    ConsultarCategoriaComponent,
    ModificarCategoriaComponent,
    EcolectaComponent,
    DialogComponent,
    Index1Component,
    FileUploaderComponent,
    ConsultarEventoComponent,
    CrearUsuarioComponent,
    ModificarEventoComponent,
    LoginComponent,
    ConsultarDispositivosComponent,
    RegistrarTipoComponent,
    ConsultarContenedorComponent,
    DetalleContenedorComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    FormsModule,
     HttpModule,
     BrowserAnimationsModule,
      AppRoutingModule,
      LocalStorageModule.withConfig({
            prefix: 'app-root',
            storageType: 'localStorage'
        })
  ],
  providers: [ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
