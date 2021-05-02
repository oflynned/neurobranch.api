import { IsNotEmpty } from 'class-validator';
import { Frequency } from '../../../../../../types/generated-types';

export class CreateTrialDto {
  @IsNotEmpty()
  title: string;

  startTime: Date;
  endTime: Date;
  synopsis: string;
  description: string;
  tags: string[];
  frequency: Frequency;
}
