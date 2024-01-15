import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}
  logout() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to LogOut?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      didClose: () => {
       
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      } else {
        // Logic to handle cancellation
      }
    });
  }

}
