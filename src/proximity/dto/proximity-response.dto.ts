import { ApiProperty } from '@nestjs/swagger';
import { AmbulanceResponseDto } from '../../ambulances/dto/ambulance.dto';

export class ProximityResponseDto {
    @ApiProperty({ type: AmbulanceResponseDto })
    ambulance: AmbulanceResponseDto;

    @ApiProperty({ example: 1234.56, description: 'Distance in meters' })
    distance: number;

    @ApiProperty({ example: false })
    fromCache: boolean;
}
