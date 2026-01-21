import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsEnum } from 'class-validator';

export class CreatePitchDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsOptional()
    latitude?: number;

    @IsNumber()
    @IsOptional()
    longitude?: number;

    @IsString()
    @IsNotEmpty()
    sport: string;

    @IsNumber()
    @IsNotEmpty()
    pricePerHour: number;

    @IsString()
    @IsOptional()
    currency?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    photos?: string[];
}
