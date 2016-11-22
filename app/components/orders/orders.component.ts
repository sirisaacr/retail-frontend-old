import { Component }      from '@angular/core';
import { Router }         from '@angular/router';

import { OrdersService }    from '../shared/services/orders.service';

@Component({
  selector      : 'my-orders',
  templateUrl   : 'app/components/orders/orders.template.html'
})
export class OrdersComponent {

    orders: any;

    constructor(public ordersService: OrdersService){}

    ngOnInit(){
      this.orders = this.ordersService.orders;
      this.ordersService.getOrders();
    }

    getTotalOfOrder(index){
      const products = this.orders.source._value[index].products;
      let price = 0;
      for(let product of products){
        price += (product.p_price-product.p_price*product.p_discount/100)*product.p_quantity;
      }
      return price; 
    }

 }