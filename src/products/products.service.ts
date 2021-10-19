import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { OpenFoodApiService } from './openfoodapi.service';

@Injectable()
export class ProductsService {
  constructor(private openFoodApiService: OpenFoodApiService) {}

  findAll() {
    throw new NotImplementedException();
  }

  async findOne(id: number) {
    let response;
    try {
      response = await this.openFoodApiService.getProduct(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
    const data = response.data;
    if (data['status'] === 1) {
      return data;
    } else if (data['status'] === 0) {
      if (data['status_verbose'] === 'product not found') {
        throw new NotFoundException(undefined, data['status_verbose']);
      } else {
        throw new BadRequestException(undefined, data['status_verbose']);
      }
    }
  }
}
