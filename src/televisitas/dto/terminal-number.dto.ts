import { IsString } from "class-validator";

export class TerminalNumber {

    @IsString()
    terminalNumber: string;

}