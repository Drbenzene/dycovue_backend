import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsEnum,
    IsLatitude,
    IsLongitude,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Point, pointToCoordinates } from '../../common/types/spatial.types';
import { AmbulanceStatus } from '../entities/ambulance.entity';

export class CreateAmbulanceDto {
    @ApiProperty({ example: 'AMB-001' })
    @IsString()
    @IsNotEmpty()
    vehicleNumber: string;

    @ApiProperty({ enum: AmbulanceStatus, example: AmbulanceStatus.AVAILABLE })
    @IsEnum(AmbulanceStatus)
    @IsOptional()
    status?: AmbulanceStatus;

    @ApiProperty({ example: 40.7128 })
    @IsNumber()
    @IsLatitude()
    latitude: number;

    @ApiProperty({ example: -74.006 })
    @IsNumber()
    @IsLongitude()
    longitude: number;
}

export class UpdateAmbulanceLocationDto {
    @ApiProperty({ example: 40.7128 })
    @IsNumber()
    @IsLatitude()
    latitude: number;

    @ApiProperty({ example: -74.006 })
    @IsNumber()
    @IsLongitude()
    longitude: number;

    @ApiProperty({ enum: AmbulanceStatus, example: AmbulanceStatus.EN_ROUTE })
    @IsEnum(AmbulanceStatus)
    @IsOptional()
    status?: AmbulanceStatus;
}

export class UpdateAmbulanceStatusDto {
    @ApiProperty({ enum: AmbulanceStatus, example: AmbulanceStatus.BUSY })
    @IsEnum(AmbulanceStatus)
    @IsNotEmpty()
    status: AmbulanceStatus;
}

export class CoordinatesDto {
    @ApiProperty({ example: 7.619 })
    @IsNumber()
    @IsLatitude()
    @IsNotEmpty()
    lat: number;

    @ApiProperty({ example: 5.221 })
    @IsNumber()
    @IsLongitude()
    @IsNotEmpty()
    lng: number;
}

export class UpdateAmbulancePositionDto {
    @ApiProperty({ type: CoordinatesDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CoordinatesDto)
    coordinates: CoordinatesDto;
}

export class AmbulanceResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    vehicleNumber: string;

    @ApiProperty({ enum: AmbulanceStatus })
    status: AmbulanceStatus;

    @ApiProperty({ example: 40.7128 })
    latitude: number;

    @ApiProperty({ example: -74.006 })
    longitude: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    static fromEntity(ambulance: any): AmbulanceResponseDto {
        const coords = pointToCoordinates(ambulance.location);
        return {
            id: ambulance.id,
            vehicleNumber: ambulance.vehicleNumber,
            status: ambulance.status,
            latitude: coords.latitude,
            longitude: coords.longitude,
            createdAt: ambulance.createdAt,
            updatedAt: ambulance.updatedAt,
        };
    }
}
