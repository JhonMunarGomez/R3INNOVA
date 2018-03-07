import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import {Dispositivos} from '../../clases/dispositivos';
@Component({
    selector: 'app-registrartipo',
    templateUrl: './registrartipo.html',
    styleUrls: ['./registrartipo.css']
})
export class RegistrarTipoComponent implements OnInit {

    sesion: Credenciales = null;
    title = 'app';
    public form: FormGroup;
   public lista: Dispositivos[]=[];
    constructor(private datos: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private servicio: ServicioService) {
        this.crearControles();
        this.ConsultarDispositivos();
    }
    ngOnInit(): void {
        this.sesion = this.datos.get<Credenciales>('credenciales');
        if (this.sesion == null) {

        } else {
           
        }
    }
    RegistrarTipo(){
        let obj=this.form.value.codigo_dispositivo;
        if(obj!="" &&obj!=null&&obj!=undefined){
              this.servicio.RegistrarTipos(this.form.value)
              .subscribe(
                  rs=>{

                  },
                  er=>alert(er),
                  ()=>{
                      alert('Registrado');
                      this.form.reset();
                  }
              )
        }else{
            alert('Seleccione Un Dispositivo');
        }
    }
    crearControles() {
        this.form = this.fb.group({
            nombre_tipo: ['', Validators.compose([Validators.required])],
            codigo_dispositivo:['',Validators.compose([Validators.required])]
        });
    }
    ConsultarDispositivos(){
        this.servicio.ConsultarTodosDispositivos()
        .subscribe(
              rs=>this.lista = rs,
              er=>alert(er),
              ()=>{

              }
        )
    }
   
}
