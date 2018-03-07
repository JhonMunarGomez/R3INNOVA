import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Dispositivos } from '../../clases/dispositivos';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
import { Evento } from '../../clases/evento';


@Component({
    selector: 'app-modificareventos',
    templateUrl: './modificareventos.html',
    styleUrls: ['./modificareventos.css'],
    entryComponents: [FileUploaderComponent]

})
export class ModificarEventoComponent implements OnInit {


    public form: FormGroup;
    public img: String = "";
    public filesToUpload: Array<File> = [];
    public sesion: Credenciales;
    public data: Evento;
    test: FormData;
    public codigo_evento: any;
    public edicion:boolean=false;
    constructor(private fb: FormBuilder,
        public servicio: ServicioService,
        private datos: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router) {
        this.codigo_evento = this.route.snapshot.params["codigo_evento"];
        this.crearControles();

    }
    ModificarEvento(){

    }
    ConsultarEvento() {
        this.servicio.ConsultarEvent(this.codigo_evento)
            .subscribe(
            rs => {
                this.data = rs[0]
            },
            er => {
                alert(er);
            },
            () => {
                let ctrl = this.form.get('nombre_evento');
                ctrl.disable();
                ctrl.setValue(this.data.nombre_evento);
                let ctrl2 = this.form.get('descripcion');
                ctrl2.disable();
                ctrl2.setValue(this.data.descripcion);
                let ctrl3 = this.form.get('fecha');
                ctrl3.disable();
                ctrl3.setValue(this.data.fecha.substring(0, 10));
                let ctrl4 = this.form.get('hora');
                ctrl4.disable();
                ctrl4.setValue(this.data.hora);
                let ctrl5 = this.form.get('hora_fin');
                ctrl5.disable();
                ctrl5.setValue(this.data.hora_fin);
                 let ctrl6 = this.form.get('estado');
                ctrl6.disable();
               ctrl6.setValue(this.data.estado);
                

            }
            )
    }
    crearControles() {
        this.form = this.fb.group({
            nombre_evento: ['', Validators.compose([Validators.required])],
            descripcion: ['', Validators.compose([Validators.required])],
            fecha: ['', Validators.compose([Validators.required])],
            hora: ['', Validators.compose([Validators.required])],
            hora_fin: ['', Validators.compose([Validators.required])],
            estado:['',Validators.compose([Validators.required])]

        });
        this.ConsultarEvento();
    }
    Edicion() {
        let ctrl = this.form.get('nombre_evento');
        ctrl.enable();
    
        let ctrl2 = this.form.get('descripcion');
        ctrl2.enable();
 
        let ctrl3 = this.form.get('fecha');
        ctrl3.enable();
     
        let ctrl4 = this.form.get('hora');
        ctrl4.enable();

        let ctrl5 = this.form.get('hora_fin');
        ctrl5.enable();
        let ctrl6 = this.form.get('estado');
                ctrl6.enable();
        this.edicion=true;
   
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


    upload() {
        
    }
    handleUserUpdated(file) {
        // Handle the event
        this.filesToUpload = file;
    }
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }








}