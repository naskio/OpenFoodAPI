import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { OpenFoodApiService } from './openfoodapi.service';
import { AxiosResponse } from 'axios';
import { NotImplementedException } from '@nestjs/common';

class OpenFoodApiServiceMock {
  async getProduct(id: number): Promise<AxiosResponse> {
    return {
      data: {
        code: String(id),
        status: 1,
        status_verbose: 'product found',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
  }
}

describe('ProductsService', () => {
  let module: TestingModule;
  let productsService: ProductsService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: OpenFoodApiService,
          useClass: OpenFoodApiServiceMock,
        },
        ProductsService,
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const barcode = 737628064502;
      const product = await productsService.findOne(barcode);
      expect(product['status']).toEqual(1);
      expect(product['status_verbose']).toEqual('product found');
      expect(Number(product['code'])).not.toBeNaN();
      expect(+product['code']).toEqual(barcode);
    });
  });

  describe('findAll', () => {
    it('Should raise NotImplementedException', () => {
      const t = () => {
        productsService.findAll();
      };
      expect(t).toThrow(NotImplementedException);
    });
  });
});
