import { IsObject, IsOptional, IsString } from "class-validator";
import { Televisita } from '../entities/televisita.entity';

export class CreateLocationDto {

    @IsString()
    dormitory: string;

    @IsString()
    module: string;

    @IsString()
    description: string;

    @IsOptional()
    televisita?: string

}