import { Component }      from '@angular/core';
import { Router, ActivatedRoute }         from '@angular/router';

import { ProductService }    from '../shared/services/product.service';

import { Product }            from '../shared/models/product.model';

@Component({
  selector      : 'my-searched_products',
  templateUrl   : 'app/components/searched_products/searched_products.template.html'
})
export class SearchedProductsComponent {

    // Variable containig the result of the search
    searchedProducts: any;

    // Variable containing all the categories of the products
    categories: any;
    
    // Variables from the URL parameters
    search: string;
    category: string;

    // Variables to control the filters selected by the user
    discountsFilter: Array<number> = [];
    categoriesFilter: Array<string> = [];
    stylesFilter: Array<string> = [];
    statesFilter: Array<string> = [];
    
    constructor(public router: Router, 
                private route: ActivatedRoute,
                private productService: ProductService){
        this.search = this.route.snapshot.queryParams['search'];
        this.category = this.route.snapshot.queryParams['category'];
    }

    ngOnInit(){
      // Call all the categories form the database
      this.categories = this.productService.categories;
      this.productService.getCategories();

      if(this.search && this.category){
        this.productService.searchProducts(this.search, this.category);
        this.searchedProducts = this.productService.my_search;
      }
      else if(this.search){
        this.productService.searchProducts(this.search, '');
        this.searchedProducts = this.productService.my_search;
      }
      else{
        this.router.navigate(['/']);
      }
    }

    editDiscountFilter(low, high){
        let indexOf = this.isValueIn(low, this.discountsFilter); 
        if(indexOf >= 0){
          this.discountsFilter.splice(indexOf, 2);
        }
        else{
          this.discountsFilter.push(low, high);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, 
                                           this.stylesFilter, this.statesFilter);
    }

    editCategoryFilter(id){
        let indexOf = this.isValueIn(id, this.categoriesFilter); 
        if(indexOf >= 0){
          this.categoriesFilter.splice(indexOf, 1);
        }
        else{
          this.categoriesFilter.push(id);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, 
                                           this.stylesFilter, this.statesFilter);
    }

    editStyleFilter(style){
        let indexOf = this.isValueIn(style, this.stylesFilter); 
        if(indexOf >= 0){
          this.stylesFilter.splice(indexOf, 1);
        }
        else{
          this.stylesFilter.push(style);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, 
                                           this.stylesFilter, this.statesFilter);
    }

    editStateFilter(state){
        let indexOf = this.isValueIn(state, this.statesFilter); 
        if(indexOf >= 0){
          this.statesFilter.splice(indexOf, 1);
        }
        else{
          this.statesFilter.push(state);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, 
                                           this.stylesFilter, this.statesFilter);
    }

    isValueIn(value, array){
      for(let i = 0; i < array.length; i++){
        let val = array[i] 
        if(val == value)
          return i;
      }
      return -1;
    }

 }