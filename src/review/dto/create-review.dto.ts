import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
    name: string;

  @IsString()
    title: string;

  @IsString()
    description: string;

  @IsNumber()
  @Max(5, { message: 'The rating value should be <= 5' })
  @Min(1, { message: 'The rating value should be >= 1' })
    rating: number;

  @IsString()
    productId: string;
}
