import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule, provideStore, select } from '@ngrx/store';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { deleteItem, getItems } from 'src/app/store/product/ProductActions';
import { selectItems } from 'src/app/store/product/ProductReducer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule,
    StoreModule,
  ],
  providers: [
    ProductService,
  ]
})
export class ProductComponent implements OnInit {

  productService = inject(ProductService);

  store = inject(Store<any>);

  products$ = this.store.pipe( select(selectItems) );

  ngOnInit(): void {
    this.store.dispatch(getItems());
  }

  onDelete(product: Product): void {
    this.store.dispatch(deleteItem({item: product}));
  }

  // products$ = this.productService.getAll();



}
