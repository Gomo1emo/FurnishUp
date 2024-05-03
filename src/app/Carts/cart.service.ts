import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart, cItems } from '../interface/shoppingCart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cartItems';
  
  private cart: any[] = []

  cartItemCount = new BehaviorSubject<number>(0) 
  

  constructor( private http : HttpClient){}
  
 
  getCart(){
    return this.cart
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  // ADD TO CART BUTTON
  addTocart(products:any){
    let added = false;
    this.cart.forEach((item) => {
      if(item.id === products.id){
        item.quantity += 1;
        added = !added;
      }
     
    });
    if (!added) {
      products.quantity = 1;
      this.cart.push(products);
    }
    
      this.cartItemCount.next(this.cartItemCount.value + 1);
  
    

  }

  
  saveCart(): void {
    // localStorage.setItem('cItems', JSON.stringify(this.cart))
    this.http.post<any>(this.apiUrl, this.addTocart)
  }

   loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cItems') as any) || [];
  }

  clearCart(){
    localStorage.clear()
  }
} 


// #### CODE ON HOLD #######
// setProduct(product : any){
  //   this.cart.push(...product);
  //   this.productList.next(product);
  // }

  // addToCart(addedProduct: any) {
  //   this.cart.push(addedProduct);
  //       this.productList.next(this.productList);
  //       this.getTotalPrice();
  //       this.saveCart();
  // }

  // removeProduct(product: any) {
  //   const index = this.cart.findIndex((x: any) => x.id === product.id);

  //   if (index > -1) {
  //     this.cart.splice(index, 1);
  //     this.saveCart();
  //   }
  //   this.cartItemCount.next(this.cartItemCount.value - 1);
  // }

 
  // let grandTotal = 0;
    // this.cart.map((a:any)=>{
    //   grandTotal += a.total;
    // })
    // return grandTotal;
  

   // productInCart(product: any): boolean {
  //   return this.cart.findIndex((x: any) => x.id === product.id) > -1;
  // }
  
  // //CALCULATE TOTAL
  // getTotalPrice() : number{
  //   return this.cart.reduce((sum, product) => ({
  //           quantity: 1,
  //           price: sum.price + product.price * product.quantity,
  //         }),
          
  //         { quantity: 1, price: 0 }
  //       ).price;
        
  // }