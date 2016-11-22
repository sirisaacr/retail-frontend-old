import { Component, Input } from '@angular/core';
import { Router }         from '@angular/router';

import { ProductService }     from '../shared/services/product.service';


@Component({
  selector      : 'my-products',
  templateUrl   : 'app/components/my_products/my_products.template.html'
})
export class MyProductsComponent { 

    products:any;

    constructor(public router: Router, 
                public productService: ProductService){

    }

    ngOnInit(){
        this.products = this.productService.my_products;
        this.productService.getMyProducts();
    }

}