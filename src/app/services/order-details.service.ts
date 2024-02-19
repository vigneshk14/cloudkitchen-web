import { Injectable } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private menuDataSubject = new BehaviorSubject<any[]>([]);
  menuData$ = this.menuDataSubject.asObservable();

  foodData: any;
  menuData: any;
  addToMenuData(item: any) {
    const currentMenuData = this.menuDataSubject.value;
    currentMenuData.push(item);
    this.menuDataSubject.next(currentMenuData);
  }




  
  placeOrder(menuData: any[]): void {
    

    // For now, let's log the order details to the console.
    console.log('Order placed:', menuData);

    // Optionally, you may want to reset the cartItems array after placing the order.
    this.menuData = [];
  }
  getCartItems(): any {
    return this.menuData;
  }

  constructor() { }

// fooddetails 
  
foodDetails = [
  {
    id:1,
    foodName:"Paneer Grilled Sandwich",
    foodDetails:"Paneer Sandwich is a quick, delicious and protein-packed Indian sandwich made with crumbled paneer, spices, veggies and bread.",
    foodPrice:200,
    foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq"
  },
  {
    id:2,
    foodName:"Veggie Supreme",
    foodDetails:"Crispy golden crust, light and fresh tomato sauce, melty mozzarella, sweet bell peppers, zest onion, and sliced mushrooms are topped with oregano and basil.",
    foodPrice:369,
    foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/sgbobtbxlojbtdnr2m5k"
  },
  {
    id:3,
    foodName:"Paneer Burger",
    foodDetails:"Crispy fired paneer which is marinated in Indian spices & herbs and dabbed with smoky chilli mayonnaise and crunchy onion rings & tomatoes.",
    foodPrice:149,
    foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/xbeqlsck3p0kei53to7k"
  },
  {
    id:4,
    foodName:"Veg Masala Roll In Naan",
    foodDetails:"A homely mix of mashed potato and veggies, seasoned with Indian spices. A filling sure to take you back to mom's kitchen.",
    foodPrice:140,
    foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/l2ng6gtge30sqaafqng7"
  },
  {
    id:5,
    foodName:"Indulgence Brownie",
    foodDetails:"(Eggless) Indulge in richly decadent chocolate brownie crafted with love & topped with bitter-sweet chocolate that provides ultra-rich chocolate experience.",
    foodPrice:105,
    foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/iqlmbg1hlyc0dspdyzzv"
  },
  {
    id:6,
    foodName:"Oreo Cheesecake Ice Cream",
    foodDetails:"Vanilla flavour ice cream with crushed chocolate flavour cookie pieces, coated in crushed chocolate flavour cookie with a vanilla flavour filling.",
    foodPrice:219,
    foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wtj8esaeslvlscv8glj6"
  }
]
}