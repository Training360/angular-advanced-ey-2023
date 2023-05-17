import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/model/product";
import { errorItem, loadItems, removeDeletedItem } from "./ProductActions";


export interface State {
  [x: string]: any;
  products: { items: Product[], error: any };
}

export const initialState: State = {
  products: { items: [], error: null }
};

export const ProductReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    items: action.items
  })),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(removeDeletedItem, (state, action) => ({
    ...state,
    items: (state['items'] as Product[]).filter( item => item.id !== action.item.id )
  })),
);

export const selectItems = (state: State) => state.products.items;
export const selectError = (state: State) => state.products.error?.error;
