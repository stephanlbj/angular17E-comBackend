import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private productService:ProductsService){}
    
    @Get('all')
    getProducts(){
     return this.productService.getAllProducts()
    }
 
}
