import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  userLoginOn:boolean=false;
  isUserAdmin: boolean = false;

  
  constructor(private loginService:LoginService){}
  

  ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe({
        next:(userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      });
      
      this.loginService.isUserAdmin.subscribe({
      next: (isUserAdmin) => {
        this.isUserAdmin = isUserAdmin;
      }
    });

    if (this.userLoginOn) {
      this.loginService.isAdmin().subscribe();
    }
  }

  logout(): void {
    this.loginService.logout();
  }
}
