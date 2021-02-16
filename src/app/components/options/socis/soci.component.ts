import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Router} from '@angular/router';

import { SociModel } from 'src/app/models/models';
import { GestApiService } from 'src/app/services/gest-api.service';
import { ValidatorsService } from '../../../services/validators.service';

@Component({
  selector: 'app-soci',
  templateUrl: './soci.component.html',
  styleUrls: ['./soci.component.scss']
})
export class SociComponent implements OnInit {
  soci: SociModel = {id:0,num_soci:0,nom:'',data_alta: '',data_baixa:'',data_neixement:'',dni:'',email:''};
  formSoci: FormGroup;
  error: boolean;
  msgError: string;
  titol: string = '';

  @ViewChild("myinput") myInputField: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
  constructor(private router: Router,private fb: FormBuilder,
               private activateRoute: ActivatedRoute,
               //private validador: ValidatorsService,
               private gas: GestApiService) { 
    this.crearFormulario();
    this.crearListeners();
    this.activateRoute.params.subscribe(params =>{
          this.getSoci(params['id']);
    });
  }

  ngOnInit(): void {
  }

  private crearFormulario() {
    const patternEmail = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

    this.formSoci = this.fb.group({
      id: [0],
      num_soci: [0,,ValidatorsService.chkNumSoci(this.gas)],
      nom: ['',Validators.required],
      dni: ['',,ValidatorsService.chkDNI(this.gas)],
      email : ['',[ Validators.required,Validators.pattern(patternEmail)]],
      data_alta : ['', Validators.required ],
      data_baixa : [''],
      data_neixement : [''],
    });
  }

  crearListeners() {
    this.formSoci.valueChanges.subscribe( valor => {
       this.error = false;
       this.msgError = '';
    });
  }

  private getSoci(id: number){
    let resultat: any;

    this.titol = (id == 0) ? 'Nou soci ' : 'Editar soci ';
    if (id>0){
      this.gas.soci(id).
        subscribe(
          result=>{
            resultat = result;
            if (resultat.error !== 0){
            }else{
              this.soci = resultat.data;
              this.formSoci.setValue(this.soci); 
            }
          },
          error=>{console.log(error)}
        )
    }else{
      this.gas.getNextNumSoci().
        subscribe(
          result=>{
            resultat = result;
            if (resultat.error !== 0){
            }else{
              this.soci.num_soci = resultat.data.num_soci;
              this.formSoci.setValue(this.soci); 
            }
          },
          error=>{console.log(error)}
        )
    }
  }

  get emailIncorrect() {
    return this.formSoci.get('email').invalid && this.formSoci.get('email').touched
  }

  get numSociRepetit(){
    return this.formSoci.get('num_soci').invalid && this.formSoci.get('num_soci').touched; 
  }
  get dniRepetit(){
    return this.formSoci.get('dni').invalid && this.formSoci.get('dni').touched; 
  }

  get titolSoci(){
    if (this.formSoci.get('num_soci').value!='0'){
      const nom = ((this.formSoci.get('nom').value as string).length>0) ? 
                ' - '+this.formSoci.get('nom').value : '';
      return this.formSoci.get('num_soci').value+nom;
    }else{
      return '';
    }

  }

  get nomSoci(){
    return this.formSoci.get('nom').value;
  }
  
  desar(){
    let resultat: any;

    this.soci = this.formSoci.value;
    if (this.soci.data_baixa==''){
      this.soci.data_baixa = null;
    }
    if (this.soci.data_neixement==''){
      this.soci.data_neixement = null;
    }
    this.gas.postSoci(this.soci).
    subscribe(
      result=>{
        resultat = result;
        if (resultat.error !== 0){
          this.error = true;
          this.msgError = 'Error en desar les dades';
        }else{
          this.tornar();
        }
      },
      error=>{
        console.log(error);
        this.error = true;
        this.msgError = 'Error en desar les dades';
    }
    )
}

  tornar(){
    this.router.navigate(['/socis']);
  }
}
