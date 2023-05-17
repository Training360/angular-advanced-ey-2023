import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpService<Product> {

  constructor() {
    super('products');
  }
}
