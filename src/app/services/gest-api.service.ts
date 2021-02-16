import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SociModel, UserModel } from '../models/models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestApiService {

  httpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').
                  set('Accept', 'application/json');

  httpHeaders3 = new HttpHeaders().set('Content-type', '*/*').
                  set('Accept', 'application/json');

  httpHeaders2 = new HttpHeaders().
                    set('Content-type', 'application/json').
                    set('Accept', 'application/json');

  private url1 = 'http://localhost:80/ita/agora-be/';
  private url = 'http://ticincloud.cat/agora/be/';


  userToken: string;

  constructor( private http: HttpClient,private storageService: StorageService ) {
  }

  login( usuari: UserModel ) {
    const url = `${ this.url }login`
    const body = JSON.stringify(usuari);

    return this.http.post(url, body);
  }

  socis(page:number,pageSize: number, search: string='NO_SEARCH') {
    const url = `${ this.url }socis/${page}/${pageSize}/${search}/Bearer ${this.storageService.getCurrentToken()}`;
    //console.log(url);

    return this.http.get(url);
  }

  //get soci
  soci(id:number) {
    const url = `${ this.url }soci/${id}/Bearer ${this.storageService.getCurrentToken()}`;
    return this.http.get(url);
  }

    //comprovar numsoci repetit
    getNextNumSoci() {
      const url = `${ this.url }socis/numsoci/Bearer ${this.storageService.getCurrentToken()}`;
      return this.http.get(url);
    }
  
    //comprovar numsoci repetit
    chkNumSoci(numSoci:string,id: number) {
      const url = `${ this.url }socis/chk_numsoci/${numSoci}/${id}/Bearer ${this.storageService.getCurrentToken()}`;
      return this.http.get(url);
    }
  
      //comprovr dni repetit
  chkDNI(dni:string,id: number) {
    const url = `${ this.url }socis/chk_dni/${dni}/${id}/Bearer ${this.storageService.getCurrentToken()}`;
    return this.http.get(url);
  }

  //comprovr dni repetit
  postSoci(soci: SociModel) {
    const url = `${ this.url }soci/Bearer ${this.storageService.getCurrentToken()}`;
    const body = `{"soci":${JSON.stringify(soci)}}`;
    //console.log(url);
    //console.log(body);
    return this.http.post(url,body);
  }

  

}
