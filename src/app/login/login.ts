import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../clases/credenciales';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../service/servicio.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

    sesion: Credenciales = null;
    title = 'app';
    public form: FormGroup;
    constructor(private datos: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private servicio: ServicioService) {
        this.crearControles();
    }
    ngOnInit(): void {
        this.sesion = this.datos.get<Credenciales>('credenciales');
        if (this.sesion == null) {

        } else {
            let link = ['/home'];
            this.router.navigate(link);
        }
    }
    crearControles() {
        this.form = this.fb.group({
            nombre_credencial: ['', Validators.compose([Validators.required])],
            contrasena: ['', Validators.compose([Validators.required])]
        });
    }
    ValidarCredencial(valor: Credenciales) {
        this.servicio.ConsultarCredenciales(valor)
            .subscribe(
            rs => {
                this.sesion = rs[0];
            },
            er => console.log('error'),
            () => {
                if (this.sesion == null) {
                    console.log('nada');
                } else {
                    this.datos.set('credenciales', this.sesion);
                    console.log(this.sesion.nombre_rol);
                    let link = [''];
                    this.router.navigate(link);

                }
            }
            )
    }
}
