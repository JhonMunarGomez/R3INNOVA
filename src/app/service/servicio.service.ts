import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Usuario } from '../clases/Usuario';
import { Dispositivos } from '../clases/dispositivos';
import { Categoria } from '../clases/categoria';
import { Entrega } from '../clases/entrega';
import { Credenciales } from '../clases/credenciales';
import { Evento } from '../clases/evento';
import { DetalleEntrega } from '../clases/detalle_entrega';
import { Marca } from '../clases/marca';
import { TipoDispositivo } from '../clases/tipo_dispositivo';
import {Contenedor} from '../clases/contenedor';
import {DetalleContenedor} from '../clases/detallecontenedor';
@Injectable()
export class ServicioService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'http://localhost:8000';
  private options;
  constructor(
    private http: Http
  ) {
    this.options = new RequestOptions({ headers: this.headers });
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - $(error.statusText||'') $(err)`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
  public ConsultarCategoriaParams(codigo_categoria): Observable<[Categoria]> {
    let url = `${this.url}/categoria/${codigo_categoria}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  public ConsultarUsuario(identificacion): Observable<[Usuario]> {
    let url = `${this.url}/usuario/${identificacion}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  public ConsultarTipos(codigo_dispositivo): Observable<TipoDispositivo[]> {
    let url = `${this.url}/ConsultarTipos/${codigo_dispositivo}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }



  public ConsultarDispositivos(): Observable<DetalleEntrega[]> {
    let url = `${this.url}/DispositivosPeso/`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }


  public ConsultarTodosDispositivos(): Observable<[Dispositivos]> {
    let url = `${this.url}/Consultar/Dispositivos`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }

  public ConsultarCategoria(): Observable<[Categoria]> {
    let url = `${this.url}/ConsultarCategoriaWeb/`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  CrearUsuario(usu: Usuario) {
    let url = `${this.url}/usuario`;
    let iJson = JSON.stringify(usu);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json()).catch(this.handleError);
  }
  public CrearCategoria(ca: Categoria) {
    let url = `${this.url}/usuario`;
    let iJson = JSON.stringify(ca);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json()).catch(this.handleError);
  }




  public ActualizarDetalle(obj) {
    let url = `${this.url}/ActualizarPeso/`;
    let iJson = JSON.stringify(obj);
    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json()).catch(this.handleError);
  }

  public ConsultarCredenciales(obj: Credenciales): Observable<Credenciales[]> {

    let url = `${this.url}/ConsultarCredenciales/${obj.nombre_credencial}&${obj.contrasena}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }


  public ConsultarEvento(): Observable<Evento[]> {
    let url = `${this.url}/ConsultarEventos/`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  public ConsultarCodigo(codigo_dispositivo) {
    let url = `${this.url}/ConsultarCodigo/${codigo_dispositivo}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  public ConsultarEvent(obj): Observable<Evento[]> {
    let url = `${this.url}/ConsultarEvento/${obj}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }

  public ConsultarMarca(): Observable<Marca[]> {
    let url = `${this.url}/consultarmarcas/`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  RegistrarCredenciales(obj) {
    let url = `${this.url}/RegistrarCredenciales/`;
    let iJson = JSON.stringify(obj);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json()).catch(this.handleError);
  }
  public HacerEntrega(obj) {
    let url = `${this.url}/IngresarEntrega/`;
    let iJson = JSON.stringify(obj);
    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json()).catch(this.handleError);
  }
  public ValidarCredencial(obj) {
    let url = `${this.url}/credencial/${obj}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  public ValidarDispositivo(obj) {
    let url = `${this.url}/VerDispositivo/${obj}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }
  RegistrarEvento(params: Array<string>, files: Array<File>, Evento) {
    let u = this.url + '/RegistrarEvento';
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("imagen[]", files[i], files[i].name);
      }
      formData.append('nombre_evento', Evento.nombre_evento);
      formData.append('descripcion', Evento.descripcion);
      formData.append('fecha', Evento.fecha);
      formData.append('hora', Evento.hora);
      formData.append('horafin', Evento.hora_fin);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", u, true);
      xhr.send(formData);
    });
  }
  RegistrarCategoria(params: Array<string>, files: Array<File>, categoria) {
    let u = this.url + '/RegistrarCategoria';
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("imagen[]", files[i], files[i].name);
      }
      formData.append('nombre_categoria', categoria.nombre_categoria);
      formData.append('descripcion', categoria.descripcion);
      formData.append('estado', categoria.estado);
      formData.append('codigo_container', categoria.codigo_container);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", u, true);
      xhr.send(formData);
    });
  }

  RegistrarDispositivo(params: Array<string>, files: Array<File>, dispositivo) {
    let u = this.url + '/RegistrarDispositivo';
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("imagen[]", files[i], files[i].name);
      }
      formData.append('codigo_dispositivo', dispositivo.codigo_dispositivo);
      formData.append('codigo_categoria', dispositivo.codigo_categoria);
      formData.append('nombre_dispositivo', dispositivo.nombre_dispositivo);
      formData.append('descripcion', dispositivo.descripcion);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", u, true);
      xhr.send(formData);
    });
  }
  RegistrarTipos(obj) {
    let url = `${this.url}/Tipos/`;
    let iJson = JSON.stringify(obj);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json()).catch(this.handleError);
  }

  public ConsultarContenedor(): Observable<Contenedor[]> {

    let url = `${this.url}/ConsultarContenedor/`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }

  public ConsultarDetalleContenedor(id):Observable<DetalleContenedor[]>{
    let url = `${this.url}/ConsultarDetalleContenedor/${id}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }

  public RetirarContenedor(codigo){
      let url = `${this.url}/RetirarContenedor/${codigo}`;
    return this.http.get(url, this.options).first().map(r => r.json()).catch(this.handleError);
  }

}

