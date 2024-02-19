import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  
  public loginForm !: FormGroup;
  constructor(private formBulider : FormBuilder,
    private http : HttpClient,
    private router: Router) { }

    togglePasswordVisibility() {
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text';
    }

  ngOnInit(): void {
    this.loginForm = this.formBulider.group({
      email:[''],
      password:[''],
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });

        if (user) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.loginForm.reset();
          this.router.navigate(['home']);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Login Failed',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }, err => {
        alert("Something went wrong !!");
      });
  }
}