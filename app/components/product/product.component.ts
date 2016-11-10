import {Component} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProductService }     from '../shared/services/product.service';

import { Product, ProductAttribute }            from '../shared/models/product.model';

@Component({
    selector      : 'my-product',
    templateUrl   : 'app/components/product/product.template.html'
})
export class ProductComponent {

    Interval:number = 5000;
    noWrapSlides:boolean = false;
    product: Product = {} as any;
    tempAtrr: ProductAttribute = {} as any;
    pictures: string[] = [];
    attributes: ProductAttribute[] = [];
    tempBuy: Array<any> = [];

    product_id: string;


    constructor(private route: ActivatedRoute, private productService: ProductService) {
        this.route.params.subscribe(params => {
            this.product_id = params['id'];
        });
    }

    ngOnInit(){
        const sc = this;
        this.productService.getCurrentProduct()
                    .subscribe((result) => {
                        if (result.success) {
                            sc.initVariables(result.product);
                        }
                        else{
                            this.productService.getProduct(sc.product_id)
                                .subscribe((result) => {
                                    if(result.success){
                                        sc.initVariables(result.product[0]);
                                    }
                                });
                        }
                    });
    }

    initVariables(product: Product){
        const sc = this;
        sc.product = product;
        sc.pictures = product.pictures;
        sc.attributes = product.attributes;
        for(let i = 0; i < sc.attributes.length; i++){
            let tempAttribute = {
                product_id: sc.product._id,
                attribute_id: sc.attributes[i]._id, 
                quantity: 0
            };
            sc.tempBuy.push(tempAttribute);
        }
    }

    increaseQuantityOfTempBuy(index){
        let stock = this.attributes[index].stock;
        let actualQuantity = this.tempBuy[index].quantity;

        if(stock > actualQuantity){
            this.tempBuy[index].quantity = actualQuantity + 1;
        }
    }

    decreaseQuantityOfTempBuy(index){
        let actualQuantity = this.tempBuy[index].quantity;

        if(0 < actualQuantity){
            this.tempBuy[index].quantity = actualQuantity - 1;
        }
    }

}