import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from  './components/options/home/home.component';
import { SocisComponent } from  './components/options/socis/socis.component';
import { SociComponent } from  './components/options/socis/soci.component';
import { SeccionsComponent } from  './components/options/seccions/seccions.component';
import { EspaisComponent } from  './components/options/espais/espais.component';
import { InventariComponent } from  './components/options/inventari/inventari.component';
import { LoginComponent } from  './components/options/login/login.component';
import {AuthorizatedGuard} from './services/authorizated.guard';

const  ROUTES:  Routes  = [
  {path:  'home',component:  HomeComponent,
      data: {
              title: 'Home Àgora',
              descrption: "Pàgina inicial d'Àgora",
              ogTitle: 'Home Àgora',
              robots:'home robots',
              viewport: 'width=device-width, initial-scale=1',
              charset:'utf-8'
            }
  },
  {path:  'socis',component:  SocisComponent,canActivate: [ AuthorizatedGuard]},
  {path:  'soci/:id',component:  SociComponent,canActivate: [ AuthorizatedGuard]},
  {path:  'seccions',component:  SeccionsComponent,canActivate: [ AuthorizatedGuard]},
  {path:  'espais',component:  EspaisComponent,canActivate: [ AuthorizatedGuard]},
  {path:  'inventari',component:  InventariComponent,canActivate: [ AuthorizatedGuard]},
  {path:  'login',component:  LoginComponent},
  {path: '**', component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

