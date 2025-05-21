import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FakeStoreUrls } from './constants/fakestore-urls.constant';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { FakeStoreProductResponseDto } from './dto/fakestore-products-response.dto';

@Injectable()
export class ProductsFakestoreConnector {
  private readonly logger: Logger;
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger(ProductsFakestoreConnector.name);
    this.baseUrl = configService.get<string>('FAKESTORE_API_BASE_URL') ?? '';
  }

  async getAllProducts(): Promise<FakeStoreProductResponseDto[]> {
    this.logger.log(`Getting products from remote address ${this.baseUrl}`);

    const { data } = await firstValueFrom(
      this.httpService
        .get<
          FakeStoreProductResponseDto[]
        >(`${this.baseUrl}${FakeStoreUrls.RESOURCE_GET_ALL_PRODUTCS}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error?.response?.data);
            throw 'An error occurred';
          }),
        ),
    );
    this.logger.log(`Products retrieved count: ${data.length}`);

    return data;
  }
}
