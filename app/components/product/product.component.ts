import {Component} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ProductService }     from '../shared/services/product.service';
import { UserService }     from '../shared/services/user.service';
import { CartService }     from '../shared/services/cart.service';

import { Product, ProductAttribute }            from '../shared/models/product.model';

@Component({
    selector      : 'my-product',
    templateUrl   : 'app/components/product/product.template.html'
})
export class ProductComponent {

    loading = false;
    Interval:number = 5000;
    noWrapSlides:boolean = false;
    product: Product = {} as any;
    tempAtrr: ProductAttribute = {} as any;
    pictures: string[] = [];
    attributes: ProductAttribute[] = [];
    tempBuy: Array<any> = [];

    product_id: string;


    constructor(private router: Router,
                private route: ActivatedRoute, 
                private productService: ProductService,
                private cartService: CartService,
                private userService: UserService) {
        this.route.params.subscribe(params => {
            this.product_id = params['id'];
        });
    }

    ngOnInit(){
        const sc = this;
        let tempProduct = this.productService.searchProduct(sc.product_id);
        if(!tempProduct){
            tempProduct = this.productService
                                .getProduct(sc.product_id)
                                .subscribe(data => {
                                        sc.initVariables(data.product);  
                                }, error => console.log('Could not search any products.'));
        }
        else{
            sc.initVariables(tempProduct);  
        }

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
        this.loading = true;
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
            this.tempBuy[index].quantity = 0;   
            setTimeout(() => 
            {
                this.loading = false;
            },
            1000);         
        }
        else{
            //redirect to login
        }
    }

}