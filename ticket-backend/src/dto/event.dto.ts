import {
  IsString,
  IsOptional,
  IsUrl,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EventDetailDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  image_detail: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}

export class CreateEventDto {
  @IsString()
  title: string;

  @IsUrl()
  imageUrl: string;

  @ValidateNested()
  @Type(() => EventDetailDto)
  detail: EventDetailDto;
}
