import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, switchMap, of, catchError, tap } from "rxjs";
import { ProductService } from "src/app/service/product.service";
import { ERROR_PRODUCT, LOAD_PRODUCTS, REMOVE_DELETED_ITEM, deleteItem, getItems } from "./ProductActions";
import { Product } from "src/app/model/product";

@Injectable()
export class ProductEffects {

  loadItems$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getItems),
      switchMap( () => this.productService.getAll() ),
      switchMap( products => of({ type: LOAD_PRODUCTS, items: products })),
      catchError( error => of({ type: ERROR_PRODUCT, error })),
    );
  });

  deleteItem$ = createEffect( (): Observable<Action> => {
    let item: Product | null = null;
    return this.actions$.pipe(
      ofType(deleteItem),
      tap( action => item = action.item ),
      switchMap( action => this.productService.delete( action.item ) ),
      switchMap( () => of({ type: REMOVE_DELETED_ITEM, item })),
      catchError( error => of({ type: ERROR_PRODUCT, error })),
    );
  });

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store$: Store<any>,
  ) {}

}
