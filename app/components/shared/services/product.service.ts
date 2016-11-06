import { Injectable }                 from '@angular/core';
import { Http, Headers, Response, RequestOptions }    from '@angular/http';
import { Observable }                 from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class ProductService {
  private baseUrl: string = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005";

  constructor(private http: Http) {
  }

  trending(): Observable<any> {
    return this.http
            .get(`${this.baseUrl}/products/trendy`)
            .map((response: Response) => {
                // 
                let success = response.json() && response.json().success;
                if (success) {
                    let trending = response.json() && response.json().products;
                    return { success, trending };
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

}