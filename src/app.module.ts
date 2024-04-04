import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [StripeModule, AuthModule, 
    ConfigModule.forRoot({
      isGlobal:true,
      //envFilePath: "./.env"
    }), DatabaseModule, ProductsModule,],
  controllers: [AppController],
  providers: [AppService,  DatabaseService],
})
export class AppModule {}
