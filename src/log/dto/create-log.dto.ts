import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateLogDTO {
  @IsString()
  choco_name: string;

  @IsString()
  choco_country: string;

  @IsString()
  kakao_type: string;

  @IsString()
  product_type: string;

  @IsString()
  choco_type: string;

  @IsString()
  @IsOptional()
  choco_desc?: string;

  @IsInt()
  @Min(0)
  @Max(10)
  ratings: number;

  @IsString()
  @IsOptional()
  image_url?: string;
}
