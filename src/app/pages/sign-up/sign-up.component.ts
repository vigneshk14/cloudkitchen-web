import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
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
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text';
    }

  ngOnInit(): void {
    this.signupForm = this.formBulider.group({
      fullname:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      mobile:['',[Validators.required, Validators.pattern('[0-9]{10}')]]

    }) }
    signup() {
      this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe(
        (res) => {
          // Show a SweetAlert success message
          Swal.fire({
            icon: 'success',
            title: 'Signup Successful',
            text: 'You have successfully signed up!',
          });
  
          // Reset the form and navigate to login
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          // Show a SweetAlert error message
          Swal.fire({
            icon: 'error',
            title: 'Signup Failed',
            text: err.message || 'Something went wrong',
          });
        }
      );
      }

      }