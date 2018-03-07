import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Dispositivos } from '../../clases/dispositivos';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetalleEntrega } from '../../clases/detalle_entrega';
import { Entrega } from '../../clases/entrega';
import { LocalStorageService } from 'angular-2-local-storage';
import { Credenciales } from '../../clases/credenciales';
import { Marca } from '../../clases/marca';

@Component({
  selector: 'app-consultardispositivos',
  templateUrl: './consultardispositivos.html',
  styleUrls: ['./consultardispositivos.css']
})
export class ConsultarDispositivosComponent implements OnInit {

  private sesion: Credenciales;
 
  edicion:boolean=false;
  peso1:number;
  descripcion1:string;
  detalle:DetalleEntrega[]=[];
  temporaldetalle: DetalleEntrega;
  busqueda:false;
  codigo:string='';
  codigo2:string;
  constructor(private fb: FormBuilder
    , public servicio: ServicioService,
    private route: ActivatedRoute,
    private router: Router,
    private datos: LocalStorageService) {
  
  
 
    this.ConsultarDetallesEntrega();
  
  }

ConsultarBusqueda(i:DetalleEntrega){
 
 if(this.busqueda){   
   if(this.codigo2.indexOf(this.codigo)==0){
        return true;
   }else{
       return false;
   } 
 }else{
     return false;
 }
    
}
  ModificarDetalle(dato: DetalleEntrega) {
    this.edicion = true;
    this.peso1 = dato.peso;
    this.descripcion1 = dato.descripcion;
    this.temporaldetalle = dato;
  }
  
  ngOnInit(): void {
    this.sesion = this.datos.get<Credenciales>('credenciales');
    if (this.sesion == null) {
      let link = ['/index'];
      this.router.navigate(link);
    } else {

    }
  }
  
  
  ConsultarDetallesEntrega() {
    this.servicio.ConsultarDispositivos()
      .subscribe(
      rs => this.detalle = rs,
      er => console.log(er),
      () => {

      }
      )
  }
  ConfirmaEdicion(peso, descripcion) {
    if (peso == undefined) {
      peso = 0;
    }
    if (descripcion == undefined) {
      descripcion = null;
    }
    this.temporaldetalle.peso = peso;
    this.temporaldetalle.descripcion = descripcion;
    this.servicio.ActualizarDetalle(this.temporaldetalle)
      .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.edicion = false;
        this.ConsultarDetallesEntrega();
      }
      )
  }
}


