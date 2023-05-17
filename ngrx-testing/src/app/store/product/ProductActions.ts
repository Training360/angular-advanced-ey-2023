import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product";

// Actions' names.
export const GET_PRODUCTS = '[PRODUCT] get items';
export const LOAD_PRODUCTS = '[PRODUCT] load items';
export const DELETE_ITEM = '[PRODUCT] delete item';
export const REMOVE_DELETED_ITEM = '[PRODUCT] remove deleted item';

export const ERROR_PRODUCT = '[PRODUCT] error item';

// Actions.
export const getItems = createAction(GET_PRODUCTS);

export const loadItems = createAction(
  LOAD_PRODUCTS,
  props<{items: Product[]}>()
);

export const deleteItem = createAction(
  DELETE_ITEM,
  props<{item: Product}>()
);

export const removeDeletedItem = createAction(
  REMOVE_DELETED_ITEM,
  props<{item: Product}>()
);

export const errorItem = createAction(
  ERROR_PRODUCT,
  props<{error: any}>()
);
