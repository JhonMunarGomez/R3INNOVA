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
import { Evento } from '../../clases/evento';
import { TipoDispositivo } from '../../clases/tipo_dispositivo';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.html',
  styleUrls: ['./dispositivo.css']
})
export class DispositivoComponent implements OnInit {

  private sesion: Credenciales;
  detalle: DetalleEntrega[] = [];
  showDialog: boolean = false;
  title = 'app';
  lista: Dispositivos[] = [];
  listam: Marca[] = [];
  entrega: Dispositivos[] = [];
  registrar: boolean = true;
  posicion2: number;
  obj2: Dispositivos = null;
  cantidad: string;
  name: string = 'Ingresa Los Siguientes datos';
  data: any;
  posicion: number;
  ventana: boolean = false;
  identificacion: string;
  cont: number = 0;
  obj: Entrega;
  modificar: boolean = false;
  posicionmodificar: number = 0;
  descripcion: string;
  peso: number;
  edicion: boolean = false;
  peso1: number;
  descripcion1: string;
  temporaldetalle: DetalleEntrega;
  eventos: Evento[];
  public form: FormGroup;
  listatipo:TipoDispositivo[]=[];
  constructor(private fb: FormBuilder
    , public servicio: ServicioService,
    private route: ActivatedRoute,
    private router: Router,
    private datos: LocalStorageService) {
    this.identificacion = this.route.snapshot.params["id"];
    this.peso = 0;
    this.ConsultarDispositivos();
    this.ConsultarDetallesEntrega();
    this.ConsultarMarca();
    this.ConsultarEvento();
    this.crearControles();
  }
ConsultarTipos(obj){
  this.servicio.ConsultarTipos(obj)
  .subscribe(
    rs=>this.listatipo=rs,
    er=>alert(er),
    ()=>{
       if(this.listatipo.length>0){

       }
    }
  )
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

  Eliminar(dis: Dispositivos) {
    var i = this.entrega.indexOf(dis);
    let codigo_dispositivo;
    let codigo = 0;
    if (i !== -1) {
      codigo_dispositivo = this.entrega[i].codigo_dispositivo;
      codigo = this.entrega[i].codigo;
      this.entrega.splice(i, 1);

    }
    for (var j = 0; j < this.entrega.length; j++) {
      if (this.entrega[j].codigo_dispositivo == codigo_dispositivo) {
        if (codigo < this.entrega[j].codigo) {
          this.entrega[j].codigo -= 1;
        } else {

        }
      }
    }


  }
  mostrartabla() {
    if (this.entrega.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  ConsultarMarca() {
    this.servicio.ConsultarMarca()
      .subscribe(
      rs => this.listam = rs,
      er => console.log('error'),
      () => {

      }
      )
  }

  ConsultarDispositivos() {
    this.servicio.ConsultarTodosDispositivos()
      .subscribe(
      rs => this.lista = rs,
      er => console.log('error'),
      () => {

      }
      )
  }
  ingresarpeso(pos) {
    this.showDialog = true;
    this.posicion = pos;
    this.ConsultarTipos(this.lista[this.posicion].codigo_dispositivo);

  }
  AgregarDispositivo(dis: Dispositivos) {
    let maximo = 0;
    let cont = 0;
    var max = 0;
    for (var i = 0; i < this.entrega.length; i++) {
      if (this.entrega[i].codigo_dispositivo == dis.codigo_dispositivo) {
        if (max < this.entrega[i].codigo) {
          max = this.entrega[i].codigo;

        }
        cont++;
      }
    }
    if (cont == 0) {
      this.servicio.ConsultarCodigo(dis.codigo_dispositivo)
        .subscribe(
        rs => {
          maximo = rs[0].maximo;
        },
        er => {
          console.log('error');
        },
        () => {
          if (maximo == null) {
            dis.codigo = 1;
            this.entrega.push(dis);
          } else {
            dis.codigo = maximo + 1;
            this.entrega.push(dis);

          }

        }
        )
    } else {
      max = max + 1;
      dis.codigo = max;
      this.entrega.push(dis);

    }



  }
  ConfirmarPeso(peso, descripcion, marca,tipo) {
    if (!this.modificar) {
      if (peso == undefined) {
        peso = null;
      }
      if (descripcion == undefined) {
        descripcion = null;
      }
      if(tipo!=''&&tipo!=null&&tipo!=undefined){

      }else{
        tipo=null;
      }
      let temp = this.lista[this.posicion];
      this.obj2 = null;
      this.obj2 = {
        codigo: temp.codigo,
        codigo_dispositivo: temp.codigo_dispositivo,
        nombre_dispositivo: temp.nombre_dispositivo,
        imagen: temp.imagen,
        cantidad: temp.cantidad,
        descripcion: temp.descripcion,
        peso: temp.peso,
        codigo_marca: marca,
        codigo_tipo:tipo
      }
      this.obj2.peso = '' + peso;
      this.obj2.descripcion = descripcion;
      
      this.AgregarDispositivo(this.obj2);
      this.showDialog = false;
      
    } else {
      if (peso == undefined) {
        peso = null;
      }
      if (descripcion == undefined) {
        descripcion = null;
      }

      this.entrega[this.posicionmodificar].peso = "" + peso;
      this.entrega[this.posicionmodificar].descripcion = descripcion;
      this.entrega[this.posicionmodificar].codigo_marca = marca;
       this.entrega[this.posicionmodificar].codigo_tipo = tipo;
      console.log('marca');
      this.modificar = false;
      this.showDialog = false;
    }
    this.peso = 0;
    this.listatipo=[];
  }
  Cancelar() {
    this.showDialog = false;

  }
  Modificar(pos) {
    this.showDialog = true;
    this.modificar = true;
    this.posicionmodificar = pos;
  }
  Definir(obj) {

  }
  crearControles() {
    this.form = this.fb.group({
      codigo_evento: ['', Validators.compose([Validators.required])]
    });
  }
  RegistrarEntrega(codigo) {
    this.registrar = false;
    if (codigo != '' && codigo != null && codigo != undefined) {


     
      this.obj = {
        codigo_evento: codigo,
        identificacion: this.identificacion,
        dispositivo: this.entrega
      }
      let valor;
      this.servicio.HacerEntrega(this.obj)
        .subscribe(
        rs => { valor = rs; },
        er => { console.log(er) },
        () => {

          if (valor.estado == 'completado') {
            alert('Dispositivos Ingresado');
            this.entrega = [];
            this.ConsultarDetallesEntrega();
            this.registrar = true;
            
          } else {
            alert('Fallo En La Entrega Vuelve a Intentarlo');
          }
        }
        );
    } else {
      alert('Por Favor Selecciona Un evento');
    }
  }
  CancelarEdicion() {
    this.edicion = false;
    this.listatipo=[];
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
  ConsultarEvento() {
    this.servicio.ConsultarEvento()
      .subscribe(
      rs => this.eventos = rs,
      er => console.log('error'),
      () => {

      }
      )
  }
}


