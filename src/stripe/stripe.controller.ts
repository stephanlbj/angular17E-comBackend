import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
 import { PropductsDTO } from './dto/products.dto';

@Controller('checkout')
export class StripeController {


constructor(private stripeService:StripeService){}


@Post()
checkout(@Body() body:PropductsDTO){
return this.stripeService.checkout(body)
}





}
