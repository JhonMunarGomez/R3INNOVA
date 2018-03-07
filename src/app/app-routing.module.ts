import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { RegistroComponent } from './registro/registro';
import { DispositivoComponent } from './dispositivos/dispositivo/dispositivo';
import { EcolectaComponent } from './eventos/registrarevento/ecolecta';
import { RegistrarDispositivoComponent } from './dispositivos/registrardispositivo/registrardispositivo';
import { RegistrarCategoriaComponent } from './categoria/registrarcategoria/registrarcategoria';
import { ConsultarCategoriaComponent } from './categoria/consultarcategoria/consultarcategoria';
import { ModificarCategoriaComponent } from './categoria/modificarcategoria/modificarcategoria';
import { Index1Component } from './index/index1';
import {LoginComponent} from './login/login';
import {ConsultarEventoComponent} from './eventos/consultareventos/consultarevento';
import {CrearUsuarioComponent} from './usuarios/crearusuario/crearusuario';
import {ModificarEventoComponent} from './eventos/modificareventos/modificareventos';
import { ConsultarDispositivosComponent } from './dispositivos/consultardispositivos/consultardispositivos';
import {RegistrarTipoComponent} from './dispositivos/registrartipo/registrartipo';
import {ConsultarContenedorComponent} from './contenedor/consultarcontenedor/contenedor';
import{DetalleContenedorComponent} from './contenedor/detallecontenedor/detallecontenedor';
const appRoutes: Routes = [
    {path:'Login',component:LoginComponent},
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: Index1Component },
    {
        path: 'home', component: HomeComponent
    },
    {path:'crearusuario',component:CrearUsuarioComponent},
    {path:'Eventos',component:ConsultarEventoComponent},
    { path: 'Registro', component: RegistroComponent },
    { path: 'Dispositivos', component: DispositivoComponent },
    { path: 'Ecolecta', component: EcolectaComponent },
    { path: 'RegistrarDispositivo', component: RegistrarDispositivoComponent },
    { path: 'RegistrarCategoria', component: RegistrarCategoriaComponent },
    { path: 'ConsultarCategoria', component: ConsultarCategoriaComponent },
    { path: 'ModificarCategoria', component: ModificarCategoriaComponent },
    {path:'ModificarEvento',component:ModificarEventoComponent},
    {path:'ConsultarDispositivos',component:ConsultarDispositivosComponent},
    {path:'RegistrarTipo',component:RegistrarTipoComponent},
    {path:'ConsultarContenedor',component:ConsultarContenedorComponent},
    {path:'DetalleContenedor',component:DetalleContenedorComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }