import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent 
{

  public signupForm !: FormGroup;
  constructor( private formBulider : FormBuilder,
    private http : HttpClient,
    private router: Router) { }

  togglePasswordVisibility() {
      const passwordInput = document.getElementById('exampleInputPassword2') as HTMLInputElement;
      passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text';
    }

  ngOnInit(): void {
    this.signupForm = this.formBulider.group({
      fullname:[''],
      email:[''],
      password:[''],
      mobile:[''],

    }) }
    signup() {
      this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.signupForm.value.email && a.password === this.signupForm.value.password;
        });
  
        if (user) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'signup Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.signupForm.reset();
          this.router.navigate(['home']);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'signup Failed',
            showConfirmButton: false,
            timer: 1500
          });
        }
    },err=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'signup Failed',
        showConfirmButton: false,
        timer: 1500
      });
    })
  }
  
}