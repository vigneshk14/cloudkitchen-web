import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {
  getMenuId:any;
  menuData: any[] = [];
  foodData:any;
  orderSummaries: any[] = [];

  constructor(private OrderDetailsService: OrderDetailsService) { }

  ngOnInit(): void {
    const orderSummariesJson = localStorage.getItem('orderSummaries');
    if (orderSummariesJson) {
      this.orderSummaries = JSON.parse(orderSummariesJson);
    }


    // Fetch cart items from the service when the component initializes
    this.menuData = this.OrderDetailsService.getCartItems();
  }

  

  placeOrder(): void {
    // Logic to place an order, you can send the order details to your backend
    // and reset the cartItems array
    this.OrderDetailsService.placeOrder(this.menuData);
    this.menuData = [];
  }
}
