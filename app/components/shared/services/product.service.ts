import { Injectable }                 from '@angular/core';
import { Http, Headers, Response, RequestOptions }    from '@angular/http';
import { Observable }                 from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product }                    from '../models/product.model';

import { CartService }    from './cart.service';

import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    private baseUrl: string = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005";

    // For users who can create products //
    private dataStore: { products: any[] };
    private _products: BehaviorSubject<any[]>;
    // For users who can create products //

    // Variables for Trending products
    private trendingStore: { products: any[] };
    private _trending: BehaviorSubject<any[]>;
    // Variables for Trending products
    
    // Variables for the searched products
    private searchedStore: { products: any[]};
    private filteredStore: { products: any[]};
    private _searched: BehaviorSubject<any[]>;
    // Variables for the searched products

    // Variables for product categories
    private categoriesStore: { categories: any[] };
    private _categories: BehaviorSubject<any[]>;
    // Variables for product categories

    constructor(private http: Http,
                private cartService: CartService) {
        this.dataStore = { products: [] };
        this._products = <BehaviorSubject<any[]>>new BehaviorSubject([]);

        this.trendingStore = { products: [] };
        this._trending = <BehaviorSubject<any[]>>new BehaviorSubject([]);

        this.searchedStore = { products: []};
        this.filteredStore = { products: []};
        this._searched = <BehaviorSubject<any[]>>new BehaviorSubject([]);

        this.categoriesStore = { categories: []};
        this._categories = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    }   

    
    // This function is used to search a products on a local Store and
    // avoid going to the database
    searchProduct(product_id){
        let productFromTrendy = this.trendy_product(product_id);
        if(productFromTrendy){
            return productFromTrendy;
        }

        let productFromMines = this.my_product(product_id);
        if(productFromMines){
            return productFromMines;
        }

        let productFromSearch = this.my_searching(product_id);
        if(productFromSearch){
            return productFromSearch;
        }

        // not found in local
        return null;
    }

    // This function returns an Obserable of a product searched by id
    // The function first check if the product is in memory else it will
    // go and search it in the database
    getProduct(product_id): Observable<any> {
        return this.http
                .get(`${this.baseUrl}/products?item=${product_id}`)
                .map((response: Response) => {
                    let success = response.json() && response.json().success;
                    if (success) {
                        let product = response.json() && response.json().product;
                        return { success, product };
                    } else {
                        // return false to indicate failed
                        let msg = response.json() && response.json().msg;
                        return { success, msg };
                    }
                });
    }

    // This functions sends a request to the database for adding a new product 
    createProduct(product){
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers }); 

        return this.http
                .post(`${this.baseUrl}/products`, product, options)
                .map(response => response.json())
                .subscribe(data => {
                        let success = data.success;
                        if (success) {
                            let createdProduct = data.createdProduct;
                            this.dataStore.products.push(createdProduct);
                            this._products.next(Object.assign({}, this.dataStore).products);
                        } else {
                            // return false to indicate failed
                            let msg = data.msg;
                            return { success, msg };
                        }
                            
                    }, error => console.log('Could not your load products.'));;
    }

    // This function Updates a product on the data base
    saveProduct(product) {
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers }); 

        this.http.put(`${this.baseUrl}/products`, product, options)
                    .map(response => response.json()).subscribe(data => {

                        let tempStore = this.dataStore.products;//.push(data.products);
                        let flag = true;
                        for(let i = 0; i < tempStore.length; i++){
                            let product = tempStore[i];
                            if(product._id === data.updatedProduct._id){
                                flag = false;
                                this.dataStore.products.splice(i, 1);
                                this.dataStore.products.splice(i, 0, data.updatedProduct);
                            }
                        }
                        if(flag){
                            this.dataStore.products.push(data.updatedProduct);
                        }

                        this._products.next(Object.assign({}, this.dataStore).products);
                        //
                        this.cartService.getCart();
                        this.getTrendyProducts();
                    }, error => console.log('Could not create product.'));
    }

    //////////////////////////////////////
    // MANAGE TRENDY PRODUCTS FUNCTIONS //
    //////////////////////////////////////

    // This function returns an Observable of the trendy products
    get trendy_products() {
        return this._trending.asObservable();
    }

    trendy_product(id) {
        for(let product of this.trendingStore.products){
            if(product._id === id){
                return product;
            }
        }
        return null;
    }

    // This function gets the trendy products from the database
    getTrendyProducts() {
        const sc = this;
        this.http.get(`${this.baseUrl}/products/trendy`)
                 .map(response => response.json())
                 .subscribe(data => {
                    let success = data.success;
                    if (success) {
                        this.trendingStore.products = data.products;
                        this._trending.next(Object.assign({}, this.trendingStore).products);
                    }  
                }, error => console.log('Could not your load products.'));
    }

    ///////////////////////////////////////////////
    // MANAGE CREATED (OWNER) PRODUCTS FUNCTIONS //
    ///////////////////////////////////////////////

    // This function returns an Observable of the products created by the logued in user
    get my_products() {
        return this._products.asObservable();
    }

    // This function returns a product located by id in the dataStore of products
    my_product(id) {
        for(let product of this.dataStore.products){
            if(product._id === id){
                return product;
            }
        }
        return null;
    }

    // This function gets the products created by the logued in user from the database
    getMyProducts(){
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers });

        this.http.get(`${this.baseUrl}/products/myProducts`, options)
                 .map(response => response.json())
                 .subscribe(data => {
                            this.dataStore.products = data.products;
                            this._products.next(Object.assign({}, this.dataStore).products);
                    }, error => console.log('Could not your load products.'));
    }

    ////////////////////////////////////////
    // MANAGE SEARCHED PRODUCTS FUNCTIONS //
    ////////////////////////////////////////

    // This function returns an Observable of the products created by the logued in user
    get my_search() {
        return this._searched.asObservable();
    }

    // This function returns a product located by id in the dataStore of products
    my_searching(id) {
        for(let product of this.searchedStore.products){
            if(product._id === id){
                return product;
            }
        }
        return null;
    }

    // This function gets the products searched by an user from the database
    searchProducts(search, category){
        let searchingURL = `?search=${search}`;

        if(category != ''){
            searchingURL = `?search=${search}&category=${category}`;
        }

        this.http.get(`${this.baseUrl}/search${searchingURL}`)
                 .map(response => response.json())
                 .subscribe(data => {
                            this.searchedStore.products = data.products;
                            this.filteredStore.products = data.products;
                            this._searched.next(Object.assign({}, this.searchedStore).products);
                    }, error => console.log('Could not search any products.'));
    }

    filterProducts(discountsFilter, categoriesFilters, stylesFilters, statesFilter){
        let products = this.searchedStore.products;
        // Discunt Filter
        let discountProducts = products.filter(function(product) {
            let attributes = product.attributes;
            let filteredAttributes = attributes.filter(function(attribute) {
                // On the attribute I will check the filtes of discount, style and state
                let discountFlag = false;
                let styleFlag = false;
                let stateFlag = false;

                // Filter of discounts
                if(discountsFilter.length > 0){
                    for(let i = 0; i < discountsFilter.length; i+=2){
                        let low = discountsFilter[i];
                        let high = discountsFilter[i+1];
                        if(attribute.discount >= low && attribute.discount < high){
                            discountFlag = true;
                        }    
                    }
                }
                else{
                    discountFlag = true;
                }

                // Filter of styles
                if(stylesFilters.length > 0){
                    for(let i = 0; i < stylesFilters.length; i+=2){
                        let tempStyle = stylesFilters[i];
                        if(attribute.style == tempStyle){
                            styleFlag = true;
                        }    
                    }
                }
                else{
                    styleFlag = true;
                }

                // Filter of states
                if(statesFilter.length > 0){
                    for(let i = 0; i < statesFilter.length; i+=2){
                        let tempState = statesFilter[i];
                        if(attribute.state == tempState){
                            stateFlag = true;
                        }    
                    }
                }
                else{
                    stateFlag = true;
                }

                return discountFlag && styleFlag && stateFlag;

            });

            let product_categories = product.categories;
            let filteredCategories = product_categories.filter(function(category) {
                if(categoriesFilters.length > 0){
                    for(let i = 0; i < categoriesFilters.length; i++){
                        let cat = categoriesFilters[i];
                        if(category == cat){
                            return true;
                        }    
                    }
                    return false;
                }
                else{
                    return true;
                }
            });

            if(filteredAttributes.length > 0 && filteredCategories.length > 0){
                return true;
            }
            else{
                return false;
            }
        });

        this.filteredStore.products = discountProducts;
        this._searched.next(Object.assign({}, this.filteredStore).products);
    }

    /////////////////////////////////
    // MANAGE CATEGORIES FUNCTIONS //
    /////////////////////////////////

    // This function returns an Observable of the categories available
    get categories() {
        return this._categories.asObservable();
    }

    // This function gets all the categories of the products from the database
    getCategories(){
        this.http.get(`${this.baseUrl}/products/categories`)
                 .map(response => response.json())
                 .subscribe(data => {
                        if(data.success){
                            this.categoriesStore.categories = data.categories;
                            this._categories.next(Object.assign({}, this.categoriesStore).categories);
                        }
                    }, error => console.log('Could not get the categories.'));          
    }

}