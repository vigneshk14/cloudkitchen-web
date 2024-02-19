import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { placeOrderModel } from './placeorder.module';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {
  formValue!: FormGroup;
  placeOrder: placeOrderModel= new placeOrderModel();
  OrderDetailsService: any;
  orderSummaries: any[] = [];

  constructor (private param:ActivatedRoute,private service:OrderDetailsService,private api:ApiService, private formBuilder:FormBuilder,private router:Router) { }
  getMenuId:any;
  menuData:any;
  searchTerm: string ='';

  

  ngOnInit(): void {
    this.getMenuId = this.param.snapshot.paramMap.get('id');
    console.log(this.getMenuId,'getmenu');
    if(this.getMenuId)
    {
      this.menuData =  this.service.foodDetails.filter((value)=>{
          return value.id == this.getMenuId;
        });
        console.log(this.menuData,'menudata>>');
      }
        this.formValue = this.formBuilder.group({
          name: ['',Validators.required],
          address: [''],
          mobile: ['',[Validators.required, Validators.pattern('[0-9]{10}')]],
        });
        this.getOrderSummary();
    }
    
    
  
  postPlaceOrder() {
    if (this.formValue && this.formValue.value) {
      this.placeOrder.name = this.formValue.value.name;
      this.placeOrder.address = this.formValue.value.address;
      this.placeOrder.mobile = this.formValue.value.mobile;
      this.placeOrder.menuData = this.menuData[0];
      console.log('fullName:', this.placeOrder.name);
      console.log('mobile:', this.placeOrder.mobile);
      console.log('address:', this.placeOrder.address);
      console.log('menuData:', this.placeOrder.menuData);

      this.api.postPlaceOrder(this.placeOrder)
  .subscribe(res=>{
    console.log(res);
    alert(" Order Saved Successfully"); 
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    // Create a new object that combines the order details and menu data
    const orderSummary = {
      orderDetails: this.placeOrder,
      menuData: this.menuData[0]
    };

    // Add the new orderSummary to the array
    this.orderSummaries.push(orderSummary);

      // Add logic to handle the order placement
      // You can use this.PlaceOrder and this.menuData for processing the order
      localStorage.setItem('orderSummaries', JSON.stringify(this.orderSummaries));
      
  });}
  else {}

}
getOrderSummary() {
  const orderSummariesJson = localStorage.getItem('orderSummaries');
  if (orderSummariesJson) {
    this.orderSummaries = JSON.parse(orderSummariesJson);
    console.log('Order Summaries:', this.orderSummaries);
  }
}

}