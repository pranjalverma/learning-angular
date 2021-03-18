import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getProductNumAction } from '../app.actions';
import { State } from '../reducers';
import { Product } from '../models/product.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass']
})
export class ProductPageComponent implements OnInit {
  productId!: number;
  product$: Observable<Product> = this.storeService.select(state => state.app.data);

  constructor(
    private route: ActivatedRoute,
    private storeService: Store<State>
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.productId = params.get('productId') as unknown as number;
        this.storeService.dispatch(getProductNumAction({productId: this.productId}));
      });
  }

}
