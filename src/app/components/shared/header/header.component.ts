import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private storageService: StorageService  ) {               
  }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return this.storageService.isAuthenticated();
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout() {
    this.storageService.logout();
}

}
