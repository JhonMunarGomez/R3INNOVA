import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import {Dispositivos } from '../../clases/dispositivos'; 
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Categoria} from '../../clases/categoria' ; 

@Component({
  selector: 'app-modificarcategoria',
  templateUrl: './modificarcategoria.html',
  styleUrls: ['./modificarcategoria.css']
})
export class ModificarCategoriaComponent {
   public form: FormGroup;
   objecto: string;
   dato: Categoria;
   editable: Boolean = false;
 constructor(private fb: FormBuilder,private route: ActivatedRoute,
      private router: Router,
      private servicio:ServicioService){
    this.objecto = this.route.snapshot.params["categoria"];
     this.servicio.ConsultarCategoriaParams(this.objecto)
       .subscribe(
           rs => this.dato = rs[0],
           er => console.log('error') ,
           () => console.log(this.objecto +' ' +this.dato.nombre_categoria)
       )

     // console.log(this.objecto.descripcion);
    this.crearControles();
 }
 Modificar(){
   return this.editable;
 }
 edicion(){
this.editable=true;
 }
crearControles() {
    this.form = this.fb.group({
      descripcion: ['', Validators.compose([Validators.required])],
      nombre_categoria: ['', Validators.compose([Validators.required])],
      hora: ['', Validators.compose([Validators.required])],
      imagen_url: ['', Validators.compose([Validators.required])]
    });
  }


}