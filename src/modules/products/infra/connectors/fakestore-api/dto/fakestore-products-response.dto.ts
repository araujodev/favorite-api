export class FakeStoreRatingProductResponseDto {
  rate: number;
  count: number;
}

export class FakeStoreProductResponseDto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: FakeStoreRatingProductResponseDto;
}
