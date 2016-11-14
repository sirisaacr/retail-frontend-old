import {Component} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProductService }     from '../shared/services/product.service';
import { UserService }     from '../shared/services/user.service';
import { CartService }     from '../shared/services/cart.service';

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


    constructor(private route: ActivatedRoute, 
                private productService: ProductService,
                private cartService: CartService,
                private userService: UserService) {
        this.route.params.subscribe(params => {
            this.product_id = params['id'];
        });
    }

    ngOnInit(){
        const sc = this;
        this.productService.getProduct(sc.product_id)
                    .subscribe((result) => {
                        if (result.success) {
                            sc.initVariables(result.product);
                        }
                        else{
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

        const attributes = sc.attributes;
        attributes.sort(function(a, b){
            let priceA = a.price,
                discoA = a.discount,

                priceB = b.price,
                discoB = b.discount;

            let finalA = priceA - (priceA * (discoA /100)),
                finalB = priceB - (priceB * (discoB /100));
            return finalA - finalB;
        });

        sc.attributes = attributes;

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

    addToCart(index){
        if(this.userService.isLoggedIn()){      
            let product = this.tempBuy[index];
            let purchase = {
                cart    : this.cartService.getCartId(),
                product : {
                            product     : this.product_id,
                            attribute   : product.attribute_id,
                            quantity    : product.quantity
                            }
            };
            this.cartService.addToCart(purchase);
                            // .subscribe((result) => {
                            //     if(result.success){
                            //         console.log("Added to cart");
                            //     }
                            //     else{
                            //         console.log("err 1 ");
                            //     }
                            // });
            
        }
    }

}