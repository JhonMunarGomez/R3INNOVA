import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from './clases/credenciales';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sesion: Credenciales = null;
  title = 'app';
  constructor(private datos: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.sesion = this.datos.get<Credenciales>('credenciales');
  }
  ngOnInit(): void {
    if (this.ConsultarSesion()) {

    }
  }

  CerrarSesion() {
    this.datos.set('credenciales', null);
    this.sesion = null;
    let link = ['/index'];
    this.router.navigate(link);
  }
  ConsultarSesion() {
    this.sesion = this.datos.get<Credenciales>('credenciales');
    return !this.sesion ? true : false;
  }
  ConsultarRol() {
    if (!this.ConsultarSesion()) {
      if (this.sesion.nombre_rol == 'admin') {

        return true;
      } else {

        return false;
      }
    } else {
      return false;
    }

  }
}
