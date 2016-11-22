import { Component, Input }      from '@angular/core';
import { Router }         from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators }      from '@angular/forms';

import { Product, ProductAttribute, ProductCategory }            from '../shared/models/product.model';

import { ProductService }    from '../shared/services/product.service';


@Component({
  selector      : 'my-edit-product',
  templateUrl   : 'app/components/edit_product/edit_product.template.html'
})
export class EditProductComponent {

  loading = false;
  pictures: string[] = [];
  formProduct: FormGroup;
  product: any;
  attribute: any;
  allcategories: any;
  categories: string[] = [];

  item: any;
  product_id: string = '';

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              public pfb: FormBuilder,
              private productService: ProductService){
        this.route.params.subscribe(params => {
            this.product_id = params['id'];
        });
  }

  ngOnInit(){
      const sc = this;
      this.allcategories = this.productService.categories;
      this.productService.getCategories();
 
      let tempProduct = this.productService.searchProduct(sc.product_id);
        if(!tempProduct){
            this.productService
                    .getProduct(sc.product_id)
                    .subscribe(data => {
                            sc.item = data.product;
                            sc.initVariables();  
                    }, error => console.log('Could not search any products.'));
        }
        else{
            sc.item = tempProduct;
            sc.initVariables();  
        }

        
  }

  initVariables(){
        const sc = this;
        sc.product = {  
            "name": [sc.item.name, Validators.required],
            "attributes": sc.pfb.array(
                sc.initAttributes(sc.item.attributes)
            ),
            "description": [sc.item.description, Validators.required],
        };
        sc.formProduct = sc.pfb.group(sc.product);
        sc.categories = sc.item.categories;
        sc.pictures = sc.item.pictures;
  }

  initAttributes(originalAttributes) {
      let attributes = [];
      
      for(let attribute of originalAttributes){
        attributes.push(this.pfb.group({
          "_id": attribute._id,
          "price": [attribute.price, Validators.compose([Validators.required, Validators.pattern("[1-9][0-9]*(\.[0-9]+)*")])],
          "discount": [attribute.discount, Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
          "stock": [attribute.stock, Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
          "state": [attribute.state, Validators.required],
          "style": [attribute.style, Validators.required],
          "color": [attribute.color, Validators.required],
          "size": [attribute.size, Validators.required],
          "active": attribute.active
      }));
      }

      return attributes;
  }

  initAttribute() {
      this.attribute = {
          "_id": '',
          "price": [null, Validators.compose([Validators.required, Validators.pattern("[0-9]+(\.[0-9]+)*")])],
          "discount": [null, Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
          "stock": [null, Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
          "state": [null, Validators.required],
          "style": [null, Validators.required],
          "color": ['', Validators.required],
          "size": ['', Validators.required],
          "active": true
      };
      return this.pfb.group(this.attribute);
  }

  addAttribute(){
      const control = <FormArray>this.formProduct.controls['attributes'];
      control.push(this.initAttribute());
  }

  removeAttribute(i: number) {
      const control = <FormArray>this.formProduct.controls['attributes'];
      control.removeAt(i);
  }

  deactivateAttribute(i: number) {
      const control = <FormArray>this.formProduct.controls['attributes'];
      control.at(i).value.active = !control.at(i).value.active;
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

  saveProduct(){
    this.loading = true;
    let product = this.formProduct.value;
    product._id = this.product_id;
    product.pictures = this.pictures;
    product.categories = this.categories;
    this.productService.saveProduct(product);
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

  selected(category_id){
      for(let category of this.categories){
          if(category === category_id){
              return true;
          }
      }
      return false;
  }

}