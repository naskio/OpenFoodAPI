import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class OpenFoodApiService {
  constructor(private httpService: HttpService) {}

  getProduct(id: number): Promise<AxiosResponse> {
    return firstValueFrom(
      this.httpService.get(
        `https://world.openfoodfacts.org/api/v0/product/${id}.json`,
      ),
    );
  }
}
