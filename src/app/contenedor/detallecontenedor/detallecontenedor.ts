import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
import { DetalleContenedor } from '../../clases/detallecontenedor';
@Component({
    selector: 'app-detallecontenedor',
    templateUrl: './detallecontenedor.html',
    styleUrls: ['./detallecontenedor.css']
})
export class DetalleContenedorComponent {
    title = 'app';
    lista: DetalleContenedor[] = [];
    sesion: Credenciales;
    codigo_categoria: string;
    constructor(private fb: FormBuilder
        , public servicio: ServicioService,
        private route: ActivatedRoute,
        private router: Router,
        public sanitizer: DomSanitizer,
        private datos: LocalStorageService) {
        this.codigo_categoria = this.route.snapshot.params["categoria"];
        this.ConsultarContenedor();
    }

    cleanURL(oldURL: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }
    VerContenedor() {

    }
    ConsultarContenedor() {
        this.servicio.ConsultarDetalleContenedor(this.codigo_categoria)
            .subscribe(
            rs => { this.lista = rs },
            er => console.log('error'),
            () => {

            }
            )
    }

    VaciarContenedor(){
        console.log('entra');
        this.servicio.RetirarContenedor(this.codigo_categoria)
        .subscribe(
            rs=>  console.log(rs.estado),
            er=> console.log(er),
            ()=>{
                 this.lista=null;

            }
        )
    }

}