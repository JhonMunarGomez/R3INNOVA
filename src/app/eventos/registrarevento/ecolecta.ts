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



@Component({
  selector: 'app-ecolecta',
  templateUrl: './ecolecta.html',
  styleUrls: ['./ecolecta.css'],
  entryComponents: [FileUploaderComponent]

})
export class EcolectaComponent implements OnInit {


  public form: FormGroup;
  public img: String = "";
  public filesToUpload: Array<File> = [];
  public sesion: Credenciales;
  test: FormData;
  constructor(private fb: FormBuilder,
    public servicio: ServicioService,
    private datos: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.crearControles();

  }
  crearControles() {
    this.form = this.fb.group({
      nombre_evento: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      fecha: ['', Validators.compose([Validators.required])],
      hora: ['', Validators.compose([Validators.required])],
      hora_fin: ['', Validators.compose([Validators.required])]

    });
  }
  RegistrarEvento() {
    this.upload();
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
    this.servicio.RegistrarEvento([], this.filesToUpload, this.form.value).then((result) => {
      console.log(result);
      this.form.reset();
      alert('Evento Registrado');


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








}