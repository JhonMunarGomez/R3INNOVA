import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { ServicioService } from '../service/servicio.service';



export class Validaciones {
    static valorunico(servicio: ServicioService): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (this.isPresent(Validators.required(control))) {
                return null;
            }

            var v = control.value;
            return new Promise((resolve, reject) => {
                servicio.ValidarCredencial(v).subscribe(
                    data => {
                        if (data.length > 0) {
                            resolve({ valorunico: true });
                        } else {
                            return resolve(null);
                        }
                    },
                    er => resolve({ valorunico: true })
                )
            })
        }

    }
     static codigounico(servicio: ServicioService): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (this.isPresent(Validators.required(control))) {
                return null;
            }

            var v = control.value;
            return new Promise((resolve, reject) => {
                servicio.ValidarDispositivo(v).subscribe(
                    data => {
                        if (data.length > 0) {
                            resolve({ codigounico: true });
                        } else {
                            return resolve(null);
                        }
                    },
                    er => resolve({ codigounico: true })
                )
            })
        }

    }

    static isPresent(obj: any): boolean {
        return obj != undefined && obj != null;
    }
}

