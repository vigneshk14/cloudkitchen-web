import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { placeOrderModel } from './PlaceOrder.module';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {
  formValue!: FormGroup;
  placeOrder: placeOrderModel= new placeOrderModel();


  constructor (private param:ActivatedRoute,private service:OrderDetailsService,private api:ApiService, private formBuilder:FormBuilder) { }
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
          name: [''],
          address: [''],
          mobile: [''],
        });
        
    }
  

  postPlaceOrder() {
    if (this.formValue && this.formValue.value) {
      this.placeOrder.name = this.formValue.value.name;
      this.placeOrder.address = this.formValue.value.address;
      this.placeOrder.mobile = this.formValue.value.mobile;
      console.log('Search Term:', this.placeOrder.name);
      console.log('Search Term:', this.placeOrder.mobile);
      console.log('Search Term:', this.placeOrder.address);

      this.api.postPlaceOrder(this.placeOrder)
  .subscribe(res=>{
    console.log(res);
    alert(" Order Saved Successfully"); 
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();

      // Add logic to handle the order placement
      // You can use this.PlaceOrder and this.menuData for processing the order

  });}
  else {}

  }
}