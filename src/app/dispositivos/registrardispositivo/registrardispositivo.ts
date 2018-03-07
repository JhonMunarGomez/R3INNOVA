import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Dispositivos } from '../../clases/dispositivos';
import { Categoria } from '../../clases/categoria';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
import {Validaciones} from '../../validaciones/validaciones';
@Component({
  selector: 'app-registrardispositivo',
  templateUrl: './registrardispositivo.html',
  styleUrls: ['./registrardispositivo.css']
})
export class RegistrarDispositivoComponent implements OnInit {


  public form: FormGroup;
  lista: Categoria[] = [];
  public filesToUpload: Array<File> = [];
  public sesion:Credenciales;
  constructor(private fb: FormBuilder,
    private servicio: ServicioService,
    private datos: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.crearControles();
    this.servicio.ConsultarCategoria()
      .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log('terminado')
      )
  }

  ngOnInit(): void {
    this.sesion = this.datos.get<Credenciales>('credenciales');
    if (this.sesion == null) {
      let link = ['/index'];
      this.router.navigate(link);
    } else {
      if (this.sesion.nombre_rol == 'admin'|| this.sesion.nombre_rol=='estudiante') {

      } else {
        let link = ['/index'];
        this.router.navigate(link);
      }
    }
  }
  crearControles() {
    this.form = this.fb.group({
      codigo_dispositivo: ['', Validators.compose([Validators.required]),Validaciones.codigounico(this.servicio)],
      descripcion: ['', Validators.compose([Validators.required])],
      nombre_dispositivo: ['', Validators.compose([Validators.required])],
      codigo_categoria: ['', Validators.compose([Validators.required])],
    });
  }
  RegistrarDispositivo() {
    console.log(this.form.value);

      this.servicio.RegistrarDispositivo([], this.filesToUpload, this.form.value).then((result) => {
      console.log(result);
      this.form.reset();
      alert('Dispositivo Ingresado Registrado');


    }, (error) => {
      alert(error);
    });
  }
  handleUserUpdated(file) {
    // Handle the event
    this.filesToUpload = file;
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}