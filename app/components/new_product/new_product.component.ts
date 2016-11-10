import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder, FormGroup, FormArray }      from '@angular/forms';

import { Product, ProductAttribute, ProductCategory }            from '../shared/models/product.model';

import { ProductService }    from '../shared/services/product.service';
import { UserService }    from '../shared/services/user.service';

@Component({
  selector      : 'my-new-product',
  templateUrl   : 'app/components/new_product/new_product.template.html'
})
export class NewProductComponent {

  pictures: string[] = [];
  formProduct: FormGroup;
  product: any;
  attribute: ProductAttribute = {} as any;
  allcategories: ProductCategory[] = [];
  categories: string[] = [];

  constructor(private router: Router, 
              public pfb: FormBuilder,
              private productService: ProductService,
              private userService: UserService){
      this.product = {  
            "name": '',
            "seller": '',
            "created": '',
            "attributes": this.pfb.array(
              [
                this.initAttribute()
              ]
            ),
            "description": ''
      };
      this.formProduct = this.pfb.group(this.product);
  }

  ngOnInit(){
      const sc = this;
      let cal = this.productService.categoriesList().subscribe((result) => {
        if (result.success) {
          sc.allcategories = result.categories; 
        }
      });

      // this.userService.canIbe().subscribe((result) => {
      //   if (result.success) {
      //     sc.allcategories = result.categories; 
      //   }
      // });
  }

  initAttribute() {
      this.attribute = {
          "_id": '',
          "price": null,
          "discount": null,
          "stock": null,
          "state": null,
          "style": null,
          "color": '',
          "size": ''
      };
      return this.pfb.group(this.attribute);
  }

  addAttribute(){
      const control = <FormArray>this.formProduct.controls['attributes'];
      control.push(this.initAttribute());
  }

  removeAtrribute(i: number) {
      const control = <FormArray>this.formProduct.controls['attributes'];
      control.removeAt(i);
  }

  categoryAddSubs(index, flag){
    const id = this.allcategories[index]._id;
    if(flag){
      this.categories.push(id);
    }
    else{
      const length = this.categories.length;
      for (var i = 0; i < length; i++) {
        let _id = this.categories[i];
          if(_id === id){
            this.categories.splice(i, 1);
          }
      }
    }
  }

  createProduct(){
    const sc = this;
    let product = this.formProduct.value;
    product.pictures = this.pictures;
    product.categories = this.categories;
    this.productService.createProduct(product).subscribe((result) => {
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

  fileChange(input){
      for (var i = 0; i < input.files.length; i++) {
          // Create an img element and add the image file data to it
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(input.files[i]);

          // Create a FileReader
          var target: EventTarget;
          var reader = new FileReader();

          // Add an event listener to deal with the file when the reader is complete
          reader.addEventListener("load", (event:any) => {
              // Get the event.target.result from the reader (base64 of the image)
              img.src = event.target.result;
              var resized_img = this.resize(img);
              this.pictures.push(resized_img);
          }, false);

          reader.readAsDataURL(input.files[i]);
      }
  }

  resize(img, MAX_WIDTH:number = 400, MAX_HEIGHT:number = 400){
      var canvas = document.createElement("canvas");

      var width = img.width;
      var height = img.height;

      if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
          }
      } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
          }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, width, height);

      var dataUrl = canvas.toDataURL('image/png');
      return dataUrl;
  }

}