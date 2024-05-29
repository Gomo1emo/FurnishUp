import { Component, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/checkout/authantication/auth.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

  export class loginComponent {
    form: any = {
      username: null,
      password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
  
    constructor(private authService: AuthService, private storageService: StorageService) { }
  
    ngOnInit():void
    {// this is the formcontrol as it hold both the data value and the valitator
      this.LoginForm = this.formbuilder.group({
        email: ['',Validators.required],
        password: ['', Validators.required]
      })}
  
      login()
      {
        this.http.get<any>("http://localhost:8080/api/FurnishUp/customers").subscribe(res=>{
           const user = res.find((details:any)=>
          {
            return details.email === this.LoginForm.value.email && details.password === this.LoginForm.value.password;
            
          });

          console.log(this.LoginForm);
          console.log(this.LoginForm);


          
          if(user)
          {
            alert('Successfully Logged in');
            this.loggedInEmail = this.LoginForm.value.email;
            this.isLoggedIn = true;
            this.authService.login(this.loggedInEmail);
            
            this.router.navigate(["/cart"])
          }
          else
          {
            alert("User not found")
          }
        },err=>
        {
          alert("Something went wrong");
        })
      }

         
  }



