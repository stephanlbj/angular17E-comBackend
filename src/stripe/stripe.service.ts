import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { PropductsDTO } from './dto/products.dto';
import { Observable, catchError, throwError } from 'rxjs';


const stripe = require('stripe')('sk_test_51OzJetIbMsQLwBAlW4rG6uCwP3epTz1NftgQyBvHqrDu3ByY1UxG7SZCL1QtyABNQCQC17TL0z4hpLiKUSEqBpzJ005LkByvJa');


@Injectable()
export class StripeService {


  checkout(body: PropductsDTO) {
    const lineItems = body.items.map((item: ProductDTO) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.img],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    }))
  
    return new Observable(observer => {
      stripe.checkout.sessions.create({
                line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:4200/success`,
        cancel_url: `http://localhost:4200/canceled`,
      }).then((session:unknown) => {
        observer.next(session);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );


}

}
