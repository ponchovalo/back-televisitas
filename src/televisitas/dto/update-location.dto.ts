import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';

export class UpdateTelevisitaDto extends PartialType(CreateLocationDto) {}