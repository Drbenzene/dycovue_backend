import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto, HospitalResponseDto } from './dto/hospital.dto';

@ApiTags('hospitals')
@Controller('hospitals')
export class HospitalsController {
    constructor(private readonly hospitalsService: HospitalsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new hospital' })
    @ApiResponse({
        status: 201,
        description: 'Hospital created successfully',
        type: HospitalResponseDto,
    })
    create(
        @Body(ValidationPipe) createHospitalDto: CreateHospitalDto,
    ): Promise<HospitalResponseDto> {
        return this.hospitalsService.create(createHospitalDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all hospitals' })
    @ApiResponse({
        status: 200,
        description: 'List of all hospitals',
        type: [HospitalResponseDto],
    })
    findAll(): Promise<HospitalResponseDto[]> {
        return this.hospitalsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a hospital by ID' })
    @ApiResponse({
        status: 200,
        description: 'Hospital details',
        type: HospitalResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Hospital not found' })
    findOne(@Param('id') id: string): Promise<HospitalResponseDto> {
        return this.hospitalsService.findOne(id);
    }

    @Get(':id/nearest-ambulance')
    @ApiOperation({
        summary: 'Find the nearest ambulance to a specific hospital',
        description:
            'Uses PostGIS spatial queries to calculate the nearest ambulance to the specified hospital location.',
    })
    @ApiResponse({
        status: 200,
        description: 'Nearest ambulance found',
    })
    @ApiResponse({ status: 404, description: 'Hospital not found' })
    findNearestAmbulance(
        @Param('id') id: string,
    ) {
        return this.hospitalsService.findNearestAmbulance(id);
    }
}
