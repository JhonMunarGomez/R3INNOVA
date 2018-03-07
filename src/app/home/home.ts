import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../service/servicio.service';
import {Usuario} from '../clases/usuario';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  title = 'app';
  usu:Usuario;

  public form: FormGroup;
  constructor(private fb: FormBuilder
    , public servicio: ServicioService,
      private route: ActivatedRoute,
      private router: Router) {

    this.crearControles();
  }
  ConsultarUsuario() {
    this.servicio.ConsultarUsuario(this.form.value.identificacion)
      .subscribe(
      rs => this.usu = rs[0],
      err => console.log('error'),
      () => {
        if (this.usu != null) {
          console.log('existe');
          this.goDispositivos();
        } else {
          console.log('no existe');
          this.goRegistro();
        }
      }
      );
  }
  goDispositivos() {
    let link=['/Dispositivos',{id: this.form.value.identificacion}];
    this.router.navigate(link);
  }
  goRegistro() {
    let link = [ '/Registro',{id: this.form.value.identificacion}];
    this.router.navigate(link);
}
  crearControles() {
    this.form = this.fb.group({
      identificacion: ['', Validators.compose([Validators.required])]
    });
  }
}
