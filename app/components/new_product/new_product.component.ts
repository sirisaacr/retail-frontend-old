import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators }      from '@angular/forms';

import { Product, ProductAttribute, ProductCategory }            from '../shared/models/product.model';

import { ProductService }    from '../shared/services/product.service';
import { UserService }    from '../shared/services/user.service';

@Component({
  selector      : 'my-new-product',
  templateUrl   : 'app/components/new_product/new_product.template.html'
})
export class NewProductComponent {

  loading = false;
  pictures: string[] = [];
  formProduct: FormGroup;
  product: any;
  attribute: any;
  allcategories: any;
  categories: string[] = [];

  constructor(private router: Router, 
              public pfb: FormBuilder,
              private productService: ProductService,
              private userService: UserService){
      this.product = {  
            "name": ['', Validators.required],
            "attributes": this.pfb.array(
              [
                this.initAttribute()
              ]
            ),
            "description": ['', Validators.required],
      };
      this.formProduct = this.pfb.group(this.product);
  }

  ngOnInit(){
      const sc = this;
      this.allcategories = this.productService.categories;
      this.productService.getCategories();
  }

  initAttribute() {
      this.attribute = {
          "_id": '',
          "price": [null, Validators.compose([Validators.required, Validators.pattern("[1-9][0-9]*(\.[0-9]+)*")])],
          "discount": [null, Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
          "stock": [null, Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
          "state": [null, Validators.required],
          "style": [null, Validators.required],
          "color": ['', Validators.required],
          "size": ['', Validators.required]
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
    const id = this.allcategories.source._value[index]._id;
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
    this.loading = true;
    const sc = this;
    let product = this.formProduct.value;
    product.pictures = this.pictures;
    product.categories = this.categories;
    this.productService.createProduct(product);
    
    setTimeout(() => 
    {
        this.loading = false;
        this.router.navigate(['/my_products']);
    },
    3000);
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

  resize(img, MAX_WIDTH:number = 300, MAX_HEIGHT:number = 300){
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