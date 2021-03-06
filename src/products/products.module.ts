import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';
import { OpenFoodApiService } from './openfoodapi.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 3,
    }),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [OpenFoodApiService, ProductsService],
})
export class ProductsModule {}
