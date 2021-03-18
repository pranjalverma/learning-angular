import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { ProductService } from "./services/product-service/product.service";
import { getProductDetailsAction, getProductNumAction } from "./app.actions";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
    loadProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProductNumAction),
            switchMap(thisAction => {
                return this.productService.getProduct(thisAction.productId)
                    .pipe(
                        map(reqResponse => {
                            return getProductDetailsAction({data: reqResponse.response})
                        })
                        // catchError(() => of({ type: '[PRODUCT PAGE] Error getting product details' }))
                    )
            })
        )
    })

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}