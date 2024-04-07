import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    status: string;
}
