import { Component } from '@angular/core';
import { Router }         from '@angular/router';

import { OrdersService }    from '../shared/services/orders.service';
import { CartService }    from '../shared/services/cart.service';

@Component({
  selector      : 'my-cart',
  templateUrl   : 'app/components/cart/cart.template.html'
})
export class CartComponent {

    loading = false;
    cart: any;

    constructor(public router: Router,
                public ordersService: OrdersService,
                public cartService: CartService){
    }

    ngOnInit(){
      this.cart = this.cartService.products;
    }

    getCartTotal(){
        let tempTotal = 0;
        for(let item of this.cart.source._value){
            tempTotal += (item.attribute.price - item.attribute.price*item.attribute.discount/100) * item.quantity;
        }
        return tempTotal;
    }

    proceedToBuy(){
        this.loading = true;
        this.ordersService.addOrders();
        setTimeout(() => 
        {
            this.loading = false;
            this.router.navigate(['/orders']);
        },
        500); 
    }
}