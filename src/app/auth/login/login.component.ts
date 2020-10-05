import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import {  FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html' 
})
export class LoginComponent implements OnInit {
  dismissible = true;
  loginForm : FormGroup;
  submitted = false;
  alertSwitch = false;
  alertMessage :any;
  alertClass :string;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService, 
    private route: ActivatedRoute,
    private router: Router, 
  ) { 
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]]
    });
   
  }

  get f() { return this.loginForm.controls; }

  onSubmit() { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';      
    console.log(this.loginForm);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => { 
          this.alertSwitch=true;
          this.alertClass='success';
          this.alertMessage='Login successful';  
         alert(this.returnUrl);  
          this.router.navigate([this.returnUrl]);    
           
        },
        error => {
          this.alertSwitch=true;
          this.alertClass='danger';
           this.alertMessage=error.error.message;  
        });
  }
     
 
  
}
