import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    Max,
    IsLatitude,
    IsLongitude,
    IsInt,
    IsArray,
    IsOptional,
} from 'class-validator';
import { Point, pointToCoordinates } from '../../common/types/spatial.types';

export class CreateHospitalDto {
    @ApiProperty({ example: 'St. Mary Medical Center' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '123 Main St, New York, NY 10001' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: 40.7128 })
    @IsNumber()
    @IsLatitude()
    latitude: number;

    @ApiProperty({ example: -74.006 })
    @IsNumber()
    @IsLongitude()
    longitude: number;

    @ApiProperty({ example: 250 })
    @IsInt()
    @Min(1)
    numberOfBeds: number;

    @ApiPropertyOptional({ example: ['Cardiology', 'Emergency Medicine', 'Surgery'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    specialties?: string[];
}

export class HospitalResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty({ example: 250 })
    numberOfBeds: number;

    @ApiProperty({ example: ['Cardiology', 'Emergency Medicine', 'Surgery'] })
    specialties: string[];

    @ApiProperty({ example: 40.7128 })
    latitude: number;

    @ApiProperty({ example: -74.006 })
    longitude: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    static fromEntity(hospital: any): HospitalResponseDto {
        const coords = pointToCoordinates(hospital.location);
        return {
            id: hospital.id,
            name: hospital.name,
            address: hospital.address,
            numberOfBeds: hospital.numberOfBeds,
            specialties: hospital.specialties || [],
            latitude: coords.latitude,
            longitude: coords.longitude,
            createdAt: hospital.createdAt,
            updatedAt: hospital.updatedAt,
        };
    }
}
