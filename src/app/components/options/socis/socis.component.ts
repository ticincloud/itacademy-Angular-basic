  import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 

import { SociModel } from 'src/app/models/models';
import { GestApiService } from 'src/app/services/gest-api.service';

@Component({
  selector: 'app-socis',
  templateUrl: './socis.component.html',
  styleUrls: ['./socis.component.scss']
})
export class SocisComponent implements OnInit {
  socis: SociModel[];
  totalItems: number;
  page: number;
  previousPage: number;
  showPagination: boolean;
  pageSize = 10;

  constructor(private router: Router,
              private config: NgbPaginationConfig,
              private gas: GestApiService,
              ) { 
    config.size = 'lg';
    config.boundaryLinks = true;
    config.rotate = true;
    config.maxSize = 6;
    config.directionLinks = true;
              
  }

  ngOnInit(): void {
    this.page = 1;
	  this.previousPage = 1;
    this.getSocis(this.page);
  }

  private getSocis(page: number){
    let resultat: any;
    this.gas.socis(page,this.pageSize).
      subscribe(result=>{
        resultat = result;
          if (resultat.error !== 0){
            this.showPagination = false;
          }else{
            this.socis = resultat.data.items;
            this.totalItems = resultat.data.total_items_count;
            this.showPagination = (this.totalItems/this.pageSize>1) ? true : false;
          }
      },
      error=>{console.log(error)}
    )
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getSocis(this.page-1);
    }
  }

  editSoci(id: number){
    this.router.navigate(['/soci',id]);

  }
}
