import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AmbulancesService } from './ambulances.service';
import {
    CreateAmbulanceDto,
    UpdateAmbulanceLocationDto,
    UpdateAmbulanceStatusDto,
    UpdateAmbulancePositionDto,
    AmbulanceResponseDto,
} from './dto/ambulance.dto';

@ApiTags('ambulances')
@Controller('ambulances')
export class AmbulancesController {
    constructor(private readonly ambulancesService: AmbulancesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new ambulance' })
    @ApiResponse({
        status: 201,
        description: 'Ambulance created successfully',
        type: AmbulanceResponseDto,
    })
    create(
        @Body(ValidationPipe) createAmbulanceDto: CreateAmbulanceDto,
    ): Promise<AmbulanceResponseDto> {
        return this.ambulancesService.create(createAmbulanceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all ambulances' })
    @ApiResponse({
        status: 200,
        description: 'List of all ambulances',
        type: [AmbulanceResponseDto],
    })
    findAll(): Promise<AmbulanceResponseDto[]> {
        return this.ambulancesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an ambulance by ID' })
    @ApiResponse({
        status: 200,
        description: 'Ambulance details',
        type: AmbulanceResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Ambulance not found' })
    findOne(@Param('id') id: string): Promise<AmbulanceResponseDto> {
        return this.ambulancesService.findOne(id);
    }

    @Patch(':id/location')
    @ApiOperation({ summary: 'Update ambulance location' })
    @ApiResponse({
        status: 200,
        description: 'Location updated successfully',
        type: AmbulanceResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Ambulance not found' })
    updateLocation(
        @Param('id') id: string,
        @Body(ValidationPipe) updateLocationDto: UpdateAmbulanceLocationDto,
    ): Promise<AmbulanceResponseDto> {
        return this.ambulancesService.updateLocation(id, updateLocationDto);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update ambulance status' })
    @ApiResponse({
        status: 200,
        description: 'Status updated successfully',
        type: AmbulanceResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Ambulance not found' })
    updateStatus(
        @Param('id') id: string,
        @Body(ValidationPipe) updateStatusDto: UpdateAmbulanceStatusDto,
    ): Promise<AmbulanceResponseDto> {
        return this.ambulancesService.updateStatus(id, updateStatusDto);
    }

    @Patch(':id/position')
    @ApiOperation({ summary: 'Update ambulance position' })
    @ApiResponse({
        status: 200,
        description: 'Position updated successfully',
        type: AmbulanceResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Ambulance not found' })
    updatePosition(
        @Param('id') id: string,
        @Body(ValidationPipe) updatePositionDto: UpdateAmbulancePositionDto,
    ): Promise<AmbulanceResponseDto> {
        return this.ambulancesService.updatePosition(id, updatePositionDto);
    }
}
