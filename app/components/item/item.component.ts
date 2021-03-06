import { Component, Input } from '@angular/core';
import { Router }         from '@angular/router';

import { ProductService }     from '../shared/services/product.service';

import { Product }            from '../shared/models/product.model';


@Component({
  selector      : 'my-item',
  templateUrl   : 'app/components/item/item.template.html'
})
export class ItemComponent { 

  @Input() item: any;
  finalPrice: number;

  constructor(private router: Router, private productService: ProductService){
  }

  ngOnInit()
  {
    const attributes = this.item.attributes;
    attributes.sort(function(a, b){
        let priceA = a.price,
            discoA = a.discount,

            priceB = b.price,
            discoB = b.discount;

        let finalA = priceA - (priceA * (discoA /100)),
            finalB = priceB - (priceB * (discoB /100));
        return finalA - finalB;
    });

    this.item.attributes = attributes;

    let attr = attributes[0];
    this.finalPrice = attr.price - attr.price * (attr.discount / 100);
  }

  sale(){
    let attr = this.item.attributes[0];
    return (attr.discount > 0);
  }


}