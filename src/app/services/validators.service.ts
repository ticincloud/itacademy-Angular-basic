import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GestApiService } from 'src/app/services/gest-api.service';


@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  static chkNumSoci(gas: GestApiService) {
    let resultat: any;

    return (control: FormControl) =>{
      if( !control.value ) {
        return Promise.resolve(null);
      }
      const numSoci = control.value;
      const idSoci = control.parent.get('id').value;
      return gas.chkNumSoci(numSoci,idSoci).
        pipe(
          map(response=>{
            resultat = response; 
            return resultat.error!==0 ? {existeixNumSoci: true} : null
          }));
    }
  }

  static chkDNI(gas: GestApiService) {
    let resultat: any;

    return (control: FormControl) =>{
      if( !control.value ) {
        return Promise.resolve(null);
      }
      const dni = control.value;
      const idSoci = control.parent.get('id').value;
      return gas.chkDNI(dni,idSoci).
        pipe(
          map(response=>{
            resultat = response; 
            return resultat.error!==0 ? {existeixNumSoci: true} : null
          }));
    }
  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    }

  }


}
