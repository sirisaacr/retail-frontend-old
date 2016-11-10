import { Component }          from '@angular/core';

import { ProductService }     from '../shared/services/product.service';

import { Product }            from '../shared/models/product.model';


@Component({
  selector      : 'my-trendy',
  templateUrl   : 'app/components/trendy/trendy.template.html'
})
export class TrendyComponent {
    trendyItems: Product[] = [];
    error = '';

    constructor(private productService: ProductService){

    }

    ngOnInit() {
      const sc = this;
      sc.productService.trending()
                        .subscribe((result) => {
                            if (result.success) {
                              sc.trendyItems = result.trending;
                            }
                            else {
                                // trending items failed
                                sc.error = result.msg;
                            }
                          });
    }
  
 }