import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

/**
 * API to access products from OpenFood public API
 */
@Injectable()
export class OpenFoodApiService {
  constructor(private httpService: HttpService) {}

  /**
   * get a product by barcode
   * @param {number} id - barcode of the product
   */
  getProduct(id: number): Promise<AxiosResponse> {
    return firstValueFrom(
      this.httpService.get(
        `https://world.openfoodfacts.org/api/v0/product/${id}.json`,
      ),
    );
  }
}
