import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  errorMessage:String = "";
  userIdData?:User;
  users?:User[];
  userLoginOn:boolean=false;

  userIdForm=this.formBuilder.group({
    id : ['', Validators.required],
  })

  sortForm = this.formBuilder.group({
    sort: [''],
    order: ['asc']
  });
  

  constructor(private formBuilder:FormBuilder, private loginService:LoginService,
    private userService:UserService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.loadUsers();
  }


  
  get id(){
    return this.userIdForm.controls.id
  }

  get sort() {
    return this.sortForm.controls.sort;
  }

  get order() {
    return this.sortForm.controls.order;
  }

  loadUsers() {
    
    const sortValue = this.sort.value;
    const orderValue = this.order.value;
    const sortParam = sortValue ? `${sortValue},${orderValue}` : undefined;

    this.userService.getUsers(sortParam).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  onSortChange() {
    this.loadUsers();
  }

  searchUser() {
    if(this.userIdForm.valid){
      const userId = this.id.value;

      if (userId !== null) {
        const userIdNumber: number = +userId;

        this.userService.getUserById(userIdNumber).subscribe({
          next: (user) => {
            this.userIdData = user;
          },
          error: (errorData) => {
            this.errorMessage=errorData
          },

          complete: () => {
            console.log("User Data ok")
          }
        });
      }
    }
  }
}
