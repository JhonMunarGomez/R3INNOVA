import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
import {Contenedor} from '../../clases/contenedor';
@Component({
    selector: 'app-contenedor',
    templateUrl: './contenedor.html',
    styleUrls: ['./contenedor.css']
})
export class ConsultarContenedorComponent {
    title = 'app';
    lista: Contenedor[] = [];
    sesion: Credenciales;
    constructor(private fb: FormBuilder
        , public servicio: ServicioService,
        private route: ActivatedRoute,
        private router: Router,
        public sanitizer: DomSanitizer,
        private datos: LocalStorageService) {
        this.ConsultarContenedor();
    }

    cleanURL(oldURL: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }
VerContenedor(id){
    
   let link=['/DetalleContenedor',{categoria:id}];
    this.router.navigate(link);
}
    ConsultarContenedor() {
        this.servicio.ConsultarContenedor()
            .subscribe(
            rs => {this.lista=rs },
            er => console.log('error'),
            () => {

            }
            )
    }

}