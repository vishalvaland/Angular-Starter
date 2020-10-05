import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { first } from 'rxjs/operators';
import { SignupService } from './../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  alertSwitch = false;
  alertMessage :any;
  alertClass :string;
  

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]]
    });
  } 

get f() { return this.registerForm.controls; }

  onSubmit() { 
    console.log(this.registerForm);
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.signupService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => { 
          this.alertSwitch=true;
          this.alertClass='success';
          this.alertMessage='Registration successful'; 
          this.router.navigate(['/login']);         
        },
        error => {
          this.alertSwitch=true;
          this.alertClass='danger';
           this.alertMessage=error.error;  
        });
  }

}
