import { PartialType } from '@nestjs/mapped-types';
import { CreateTelevisitaDto } from './create-televisita.dto';

export class UpdateTelevisitaDto extends PartialType(CreateTelevisitaDto) {}
