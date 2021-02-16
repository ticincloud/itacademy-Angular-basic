import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/options/home/home.component';
import { EspaisComponent } from './components/options/espais/espais.component';
import { InventariComponent } from './components/options/inventari/inventari.component';
import { SeccionsComponent } from './components/options/seccions/seccions.component';
import { SocisComponent } from './components/options/socis/socis.component';
import { LoginComponent } from './components/options/login/login.component';
import { SociComponent } from './components/options/socis/soci.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EspaisComponent,
    InventariComponent,
    SeccionsComponent,
    SocisComponent,
    LoginComponent,
    SociComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
