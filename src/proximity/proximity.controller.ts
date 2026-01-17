import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProximityService } from './proximity.service';
import { ProximityResponseDto } from './dto/proximity-response.dto';

@ApiTags('proximity')
@Controller('proximity')
export class ProximityController {
    constructor(private readonly proximityService: ProximityService) { }

    @Get('hospitals/:id/nearest-ambulance')
    @ApiOperation({
        summary: 'Find the nearest ambulance to a hospital',
        description:
            'Uses PostGIS spatial queries to calculate the nearest ambulance. Results are cached for 5 minutes.',
    })
    @ApiResponse({
        status: 200,
        description: 'Nearest ambulance found',
        type: ProximityResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Hospital not found' })
    findNearestAmbulance(
        @Param('id') hospitalId: string,
    ): Promise<ProximityResponseDto> {
        return this.proximityService.findNearestAmbulance(hospitalId);
    }
}
