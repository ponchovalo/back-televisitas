import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateTelevisitaDto {

    @IsString()
    terminalNumber: string;

    @IsString()
    mac: string;

    @IsString()
    ip: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsBoolean()
    @IsOptional()
    installed?: boolean;
}
