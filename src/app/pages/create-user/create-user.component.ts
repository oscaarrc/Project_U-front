import { Component, OnInit } from '@angular/core';
import { createUserRequest } from './create-userRequest';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/createUser/register-service.service';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  registerError: string = '';
  userLoginOn:boolean=false;
  isUserAdmin: boolean = false;

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    roleAdmin: [false]
  });

  

  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router: Router, 
    private registerService: RegisterService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.loginService.currentUserIsAdmin.subscribe({
      next: (isAdmin) => {
        this.isUserAdmin = isAdmin;
      }
    });

    if (this.userLoginOn) {
      this.loginService.isAdmin().subscribe();
    }

  }



  get username() {
    return this.registerForm.controls.username;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get roleAdmin(){
    return this.registerForm.controls.roleAdmin;
  }

  register() {
    if (this.registerForm.valid) {
      this.registerError = '';
      this.registerService.register(this.registerForm.value as createUserRequest).subscribe({
        next: (response) => {
          console.log('User created and token granted: ' + response);
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError = errorData.message;
        },
        complete: () => {
          this.router.navigateByUrl("/users");
          this.registerForm.reset();
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}