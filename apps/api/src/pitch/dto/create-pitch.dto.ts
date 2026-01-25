import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsEnum } from 'class-validator';
import { PaymentType } from '@prisma/client';

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

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    facilities?: string[];

    @IsOptional()
    autoApprove?: boolean;

    @IsNumber()
    @IsOptional()
    cancellationHours?: number;

    @IsArray()
    @IsEnum(PaymentType, { each: true })
    @IsOptional()
    acceptedPaymentTypes?: PaymentType[];
}
