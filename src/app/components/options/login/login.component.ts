import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidatorsService } from '../../../services/validators.service';
import { GestApiService } from '../../../services/gest-api.service';
import { UserModel,Session } from '../../../models/models';
import {Router} from '@angular/router';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  usuari: UserModel = {email:'',password:'',nom:''} ;
  error: boolean = false;
  msgError: string = '';

  @ViewChild("myinput") myInputField: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
  constructor( private fb: FormBuilder,
               private router: Router,
               private validador: ValidatorsService,
               private gas: GestApiService,
               private storageService: StorageService
               ) { 

    this.crearFormulario();
    //this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    const patternEmail = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
    this.formLogin = this.fb.group({
      email : ['', [ Validators.required,Validators.pattern(patternEmail)]],
      password : ['', Validators.required ]
    });
  }

  crearListeners() {
    this.formLogin.valueChanges.subscribe( valor => {
       this.error = false;
       this.msgError = '';
    });
  }


  get emailIncorrect() {
    return this.formLogin.get('email').invalid && this.formLogin.get('email').touched
  }

  get passIncorrect() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }

  desar(){
    this.usuari.email = this.formLogin.get('email').value;
    this.usuari.password = this.formLogin.get('password').value;
    this.getLogin();
  }

  getLogin(){
    let resultat: any;
    this.gas.login(this.usuari).
      subscribe(result=>{
        resultat = result;
          if (resultat.error !== 0){
            this.msgError = 'Email i/o password incorrecte';
            this.error = true;
          }
          else{
            this.usuari.nom = resultat.data.nom;
            const session = new Session();
            session.token = resultat.data.token;
            session.user = this.usuari;
            session.user.password = '';
            this.storageService.setCurrentSession(session);
            this.router.navigate(['/home']);
          }
      },
      error=>{console.log(error)}
    )
  }

}
