import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ProductService,
  ]
})
export class ProductComponent {

  productService = inject(ProductService);

  products$ = this.productService.getAll();

}
