import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { Categoria } from '../../clases/categoria';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-registrarcategoria',
  templateUrl: './registrarcategoria.html',
  styleUrls: ['./registrarcategoria.css']
})
export class RegistrarCategoriaComponent {
  public form: FormGroup;
  objecto: Categoria;
   public filesToUpload: Array<File> = [];
   public cod_container:boolean=false;
   public data:string;
  constructor(private fb: FormBuilder,
  public servicio:ServicioService) {

    this.crearControles();
  }
  Definir(obj){
   var valor=this.form.value.estado;
   if(valor=='web'){
        this.cod_container=false;
   }else{
         this.cod_container=true;
   }
  }
  crearControles() {
    this.form = this.fb.group({
      descripcion: ['', Validators.compose([Validators.required])],
      nombre_categoria: ['', Validators.compose([Validators.required])],
      estado:['',Validators.compose([Validators.required])],
      codigo_container:['',Validators.required]
    });
     
  }
    RegistrarCategoria() {
    console.log(this.form.value);
    let cod=0;
    if(this.cod_container){
        cod=this.form.value.codigo_container;   
    }
    console.log(this.form.value.codigo_container);
    let obj={
        nombre_categoria:this.form.value.nombre_categoria,
        descripcion:this.form.value.descripcion,
        estado:this.form.value.estado,
        codigo_container: cod
    }

    
    
      this.servicio.RegistrarCategoria([], this.filesToUpload,obj).then((result) => {
      console.log(result);
      this.form.reset();
      alert('Categoria Ingresada Ingresado Registrado');


    }, (error) => {
      alert(error);
    });
  }
  handleUserUpdated(file) {
    // Handle the event
    this.filesToUpload = file;
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });


}
}