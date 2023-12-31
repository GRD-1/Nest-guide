import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TopLevelCategory } from '../top-page.model';

export class HhDataDto {
  @IsNumber()
    count: number;

  @IsNumber()
    juneSalary: number;

  @IsNumber()
    middleSalary: number;

  @IsNumber()
    seniorSalary: number;
}

class TopPageAdvantageDto {
  @IsString()
    title: string;

  @IsString()
    description: string;
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;

  @IsString()
    secondCategory: string;

  @IsString()
    category: string;

  @IsString()
    alias: string;

  @IsString()
    title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
    hh?: HhDataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
    advantages: TopPageAdvantageDto[];

  @IsString()
    seoText: string;

  @IsString()
    tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
    tags: string[];
}
