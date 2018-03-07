import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Evento } from '../../clases/evento';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
@Component({
    selector: 'app-consultarevento',
    templateUrl: './consultarevento.html',
    styleUrls: ['./consultarevento.css']
})
export class ConsultarEventoComponent {
    title = 'app';
    lista: Evento[] = [];
    sesion: Credenciales;
    constructor(private fb: FormBuilder
        , public servicio: ServicioService,
        private route: ActivatedRoute,
        private router: Router,
        public sanitizer: DomSanitizer,
        private datos: LocalStorageService) {
        this.ConsultarEvento();
    }

    cleanURL(oldURL: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }

    ConsultarEvento() {
        this.servicio.ConsultarEvento()
            .subscribe(
            rs => this.lista = rs,
            er => console.log('error'),
            () => {

            }
            )
    }
    VerEvento(datos) {
        this.sesion = this.datos.get<Credenciales>('credenciales');
        if (this.sesion == null) {

        } else {
            if (this.sesion.nombre_rol == 'admin') {
                let link = ['/ModificarEvento', {codigo_evento:datos.codigo_evento}];
                this.router.navigate(link);
            } else {
                //VerDescripcion
            }
        }
    }
}