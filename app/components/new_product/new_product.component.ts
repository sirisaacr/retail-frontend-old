import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder, FormGroup, FormArray }      from '@angular/forms';

import { Product, ProductAttribute }            from '../shared/models/product.model';

import { ProductService }    from '../shared/services/product.service';

@Component({
  selector      : 'my-new-product',
  templateUrl   : 'app/components/new_product/new_product.template.html'
})
export class NewProductComponent {

  formProduct: FormGroup;
  product: any;
  attribute: ProductAttribute = {} as any;

  constructor(private router: Router, 
              public pfb: FormBuilder,
              private productService: ProductService){
      this.product = {  
            "name": '',
            "seller": '',
            "created": '',
            "attributes": this.pfb.array(
              [
                this.initAttribute(),
              ]
            ),
            "categories": this.pfb.array(
              ["580faff81ced8e9a25ddc3b6"]
            ),
            "description": '',
            "pictures": this.pfb.array(
              ["https://cdn.qwertee.com/images/mens-black.png"]
            )
      };
      this.formProduct = this.pfb.group(this.product);
  }

  ngOnInit(){

  }

  initAttribute() {
      this.attribute = {
          "price": null,
          "discount": null,
          "stock": null,
          "state": null,
          "style": null,
          "color": '',
          "size": ''
      };
      // initialize our address
      return this.pfb.group(this.attribute);
  }

  addAttribute(){
      const control = <FormArray>this.formProduct.controls['attributes'];
      control.push(this.initAttribute());
  }

  removeAtrribute(i: number) {
      // remove attribute from the list
      console.log(i);
      const control = <FormArray>this.formProduct.controls['attributes'];
      control.removeAt(i);
  }

  createProduct(){
    const sc = this;
    this.productService.createProduct(this.formProduct.value).subscribe((result) => {
      if (result.success) {
        sc.router.navigate(['/']); 
      }
      else {
          // login failed
          let error = result.msg;
          console.log(error);
      }
    });
  }

}