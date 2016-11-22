import { Component, Input } from '@angular/core';
import { Router }         from '@angular/router';

import { Product }            from '../shared/models/product.model';


@Component({
  selector      : 'my-own-item',
  templateUrl   : 'app/components/own_item/own_item.template.html'
})
export class OwnItemComponent { 

  @Input() item: Product;
  finalPrice: number;

  constructor(private router: Router){}

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