import { Component, Input } from '@angular/core';

import { ProductAttribute } from '../shared/models/product.model';


@Component({
  selector      : 'my-product-attribute',
  templateUrl   : 'app/components/product_attributes/attribute.template.html'
})
export class AttributeComponent { 

  @Input() attribute: ProductAttribute;

}