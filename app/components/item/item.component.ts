import { Component, Input } from '@angular/core';

import { Product }            from '../shared/models/product.model';


@Component({
  selector      : 'my-item',
  templateUrl   : 'app/components/item/item.template.html'
})
export class ItemComponent { 

  @Input() item: Product;
  finalPrice: number;

  ngOnInit()
  {
    let attr = this.item.attributes[0];
    if(attr.discount > 0){
      this.finalPrice = attr.price - attr.price * (attr.discount / 100);
    }
    else{
      this.finalPrice = this.item.attributes[0].price
    }
  }

  sale(){
    let attr = this.item.attributes[0];
    return (attr.discount > 0);
  }


}