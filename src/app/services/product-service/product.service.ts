import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  getProduct(productId: number) {
    let url: string = ApiService.productApi + '/' + (productId as unknown as string);
    // return ajax(url);

    // return of({
    //   response: {
    //     id: 2,
    //     title: 'TEAMSPIRIT Striped Crew-Neck T-shirt',
    //     price: 245,
    //     category: 'Men\'s clothing',
    //     description: "Add funkiness to basics with the unique designs from Teamspirit. Look smart in stripes, wearing a top with mesh sleeves. To stand out in a crowd, pick a bolder style such as a hooded top with drop sleeves or a typographic print top with raglan sleeves. Keep up with the trends in a cold-shoulder top with panelled sleeves or a graphic print top with bell sleeves. Teamspirit Tshirts for men",
    //     image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff5%2Fc4%2Ff5c4939114fcc731acfada4ebb68f1da42cad909.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
    //   }
    // });

    return of({
      response: {
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff5%2Fc4%2Ff5c4939114fcc731acfada4ebb68f1da42cad909.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
      }
    });
  }
}
