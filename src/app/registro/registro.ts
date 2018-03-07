import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../service/servicio.service';
import { Usuario } from '../clases/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../clases/credenciales';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})

export class RegistroComponent {

  title = 'app';
  usu: Usuario;
  identificacion: string = '';
  sesion: Credenciales;
  public form: FormGroup;
  constructor(private fb: FormBuilder
    , public servicio: ServicioService,
    private route: ActivatedRoute,
    private router: Router,
    private datos: LocalStorageService
  ) {
    this.identificacion = this.route.snapshot.params["id"];
   
    this.crearControles();
  }
  crearControles() {
    this.form = this.fb.group({
      identificacion: ['',Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      correo: ['', Validators.compose([Validators.required])],
      telefono: ['', Validators.compose([Validators.required])]
    });
     let ctrl = this.form.get('identificacion');
     ctrl.setValue(this.identificacion);
 
  }

  limpiarFormulario() {
    this.form.reset();
  }
  addUsuario() {
    this.CrearUsuario(this.form.value);
  }

  CrearUsuario(usu: Usuario) {
    if (usu.identificacion == "") {
      usu.identificacion = this.identificacion;
    }
    var estado;
    this.servicio.CrearUsuario(usu).subscribe(
      rt => estado = rt,
      er => alert(er),
      () => {
        if (estado != null) {
          if (estado.affectedRows > 0) {
            alert('usuario registrado correctamente');
            this.goDispositivos();
          } else {
               alert('Usuario No Registrado');
          }
        } else {
              alert('Usuario No Registrado');
        }

      }
    );
    this.limpiarFormulario();
  }

  goDispositivos() {
    this.sesion = this.datos.get<Credenciales>('credenciales');
    if (this.sesion == null) {
      let link = ['/index'];
      this.router.navigate(link);
    } else {
      let link = ['/Dispositivos', { id: this.identificacion }];
      this.router.navigate(link);
    }

  }
}