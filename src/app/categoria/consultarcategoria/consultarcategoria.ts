import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import {Categoria} from '../../clases/categoria';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-consultarcategorias',
  templateUrl: './consultarcategoria.html',
  styleUrls: ['./consultarcategoria.css']
})
export class ConsultarCategoriaComponent {
title = 'app';
  lista: Categoria[]= [];
  listapro: Categoria[][]= [];
  listatemp: Categoria[]= [];
  tempentrega: Categoria[]= [];
 
  constructor(private fb: FormBuilder
    , public servicio: ServicioService,
      private route: ActivatedRoute,
      private router: Router) {
       this.ConsultarCategoria();
  }

  Formato(){
    var j = 0;
    var k=0;
    console.log(j);
     for(var i=0;i<this.lista.length;i++){
          if(j==3){
              j=0;
                k++;
                this.reiniciartemp();
               
          }
          this.listatemp[j] = this.lista[i];
           this.listapro[k] = this.listatemp;
       
          
          j++;
     }
    
  }
  reiniciartemp(){
      this.listatemp = [];
  }

  ModificarCategoria(obj: Categoria){
           let link = [ '/ModificarCategoria', {categoria: obj.codigo_categoria}];
    this.router.navigate(link);
  }

  ConsultarCategoria(){
       this.servicio.ConsultarCategoria()
       .subscribe(
           rs => this.lista = rs,
           er => console.log('error') ,
           () => this.Formato()
       )
  }
}