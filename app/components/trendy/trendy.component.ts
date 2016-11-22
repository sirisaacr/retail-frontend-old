import { Component }          from '@angular/core';

import { ProductService }     from '../shared/services/product.service';

import { Product }            from '../shared/models/product.model';


@Component({
  selector      : 'my-trendy',
  templateUrl   : 'app/components/trendy/trendy.template.html'
})
export class TrendyComponent {
    trendyItems: any;

    constructor(private productService: ProductService){

    }

    ngOnInit() {
      this.trendyItems = this.productService.trendy_products;
      this.productService.getTrendyProducts();    
    }
  
 }