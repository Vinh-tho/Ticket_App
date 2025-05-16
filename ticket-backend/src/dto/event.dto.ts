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

  @IsUrl()
  detailImageUrl: string; // đổi cho giống entity

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}

export class CreateEventDto {
  @IsString()
  eventName: string;

  @IsUrl()
  mainImageUrl: string; // đổi cho giống entity

  @ValidateNested({ each: true })
  @Type(() => EventDetailDto)
  eventDetails: EventDetailDto[];
}
