import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Dispositivos } from '../../clases/dispositivos';
import { Categoria } from '../../clases/categoria';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
import { Validaciones } from '../../validaciones/validaciones';
@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.html',
  styleUrls: ['./crearusuario.css']
})
export class CrearUsuarioComponent implements OnInit {

  public valido: boolean = true;
  public form: FormGroup;
  lista: Categoria[] = [];
  public filesToUpload: Array<File> = [];
  public sesion: Credenciales;
  private usu: Usuario;
  control: boolean = false;
  constructor(private fb: FormBuilder,
    private servicio: ServicioService,
    private datos: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.crearControles();
    this.isDisabled();
  }
  isDisabled() {
    if (!this.control) {
      let ctrl = this.form.get('nombre_credencial');
      ctrl.enabled ? ctrl.disable() : ctrl.enable();
      let ctrl2 = this.form.get('password');
      ctrl2.enabled ? ctrl2.disable() : ctrl2.enable();
      let ctrl3 = this.form.get('password2');
      ctrl3.enabled ? ctrl3.disable() : ctrl3.enable();
    }
  }

  ngOnInit(): void {
    this.sesion = this.datos.get<Credenciales>('credenciales');
    if (this.sesion == null) {
      let link = ['/index'];
      this.router.navigate(link);
    } else {
      if (this.sesion.nombre_rol == 'admin') {

      } else {
        let link = ['/index'];
        this.router.navigate(link);
      }
    }
  }
  crearControles() {
    this.form = this.fb.group({
      identificacion: [''],
      nombre_credencial: ['', Validators.compose([Validators.required]), Validaciones.valorunico(this.servicio)],
      password: ['', Validators.compose([Validators.required])],
      password2: ['', Validators.compose([Validators.required])]
    });
  }

  addUsuario(datos) {
    if (datos.password == datos.password2) {
      let p = {
        codigo_usuario: this.usu.codigo_usuario,
        nombre_credencial: datos.nombre_credencial,
        contrasena: datos.password,
        codigo_rol: 2
      }
      let valor;
      this.servicio.RegistrarCredenciales(p)
        .subscribe(
        rs => {
          valor = rs;
        },
        er => {

        },
        () => {
          if (valor.affectedRows > 0) {
            alert('Credencial Registrada');
            this.LimpiarFormulario();
          } else {
            alert('Este Usuario ya tiene una Credencial');
          }
        }
        )
    }


  }
  LimpiarFormulario() {
    this.form.reset();
    this.control = false;
    this.isDisabled();
    this.usu = null;

  }
  ConsultarUsuario() {
    this.servicio.ConsultarUsuario(this.form.value.identificacion)
      .subscribe(
      rs => {
        this.usu = rs[0];
      },
      er => alert('Usuario No Encontrado'),
      () => {
        if (this.usu == null) {
          alert('Usuario No Encontrado')

          if (this.control = true) {
            this.isDisabled();
          }

        } else {
          this.isDisabled();
          this.control = true;
        }
      }
      )
  }

}