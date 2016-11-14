import { Injectable }                 from '@angular/core';
import { Http, Headers, Response, RequestOptions }    from '@angular/http';
import { Observable }                 from 'rxjs/Rx';
import { Product }                    from '../models/product.model';

import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  private baseUrl: string = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005";

  trendyProducts: Product[] = [];
  searchedProducts: Product[] = [];

  constructor(private http: Http) {
  }

  searchProduct(product_id){
      for(var i=0; i < this.trendyProducts.length; i++){
          let product = this.trendyProducts[i];
          if(product._id == product_id){
              return product;
          }
      }
      return {"_id": ''};
  }

    getProduct(product_id): Observable<any>{
        const sc = this;   
        let product = sc.searchProduct(product_id);
        if(product._id != ''){
            return Observable.of({success: true, product});
        }
        else{
            return this.http
                .get(`${this.baseUrl}/products?item=${product_id}`)
                .map((response: Response) => {
                    // 
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
    }

  trending(): Observable<any> {
    const sc = this;
    return this.http
            .get(`${this.baseUrl}/products/trendy`)
            .map((response: Response) => {
                // 
                let success = response.json() && response.json().success;
                if (success) {
                    let trending = response.json() && response.json().products;
                    sc.trendyProducts = trending;
                    return { success, trending: sc.trendyProducts };
                } else {
                    // return false to indicate failed
                    let msg = response.json() && response.json().msg;
                    return { success, msg };
                }
            });
  }

  createProduct(product): Observable<any> {
    let token     = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers   = new Headers({ 'Authorization': `JWT ${token}` });
    let options   = new RequestOptions({ headers }); 

    return this.http
            .post(`${this.baseUrl}/products`, product, options)
            .map((response: Response) => {
                // 
                let success = response.json() && response.json().success;
                if (success) {
                    let createdProduct = response.json() && response.json().createdProduct;
                    return { success, createdProduct };
                } else {
                    // return false to indicate failed
                    let msg = response.json() && response.json().msg;
                    return { success, msg };
                }
            });
  }

  categoriesList(): Observable<any> {
    return this.http
            .get(`${this.baseUrl}/products/categories`)
            .map((response: Response) => {
                // 
                let success = response.json() && response.json().success;
                if (success) {
                    let categories = response.json() && response.json().categories;
                    return { success, categories };
                } 
                else {
                    // return false to indicate failed
                    let msg = response.json() && response.json().msg;
                    return { success, msg };
                }
            });
  }

}