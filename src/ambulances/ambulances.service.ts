import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambulance, AmbulanceStatus } from './entities/ambulance.entity';
import {
    CreateAmbulanceDto,
    UpdateAmbulanceLocationDto,
    AmbulanceResponseDto,
} from './dto/ambulance.dto';
import { createPoint } from '../common/types/spatial.types';

@Injectable()
export class AmbulancesService {
    constructor(
        @InjectRepository(Ambulance)
        private ambulancesRepository: Repository<Ambulance>,
    ) { }

    async create(createAmbulanceDto: CreateAmbulanceDto): Promise<AmbulanceResponseDto> {
        const ambulance = this.ambulancesRepository.create({
            vehicleNumber: createAmbulanceDto.vehicleNumber,
            status: createAmbulanceDto.status,
            location: createPoint(
                createAmbulanceDto.latitude,
                createAmbulanceDto.longitude,
            ),
        });

        const saved = await this.ambulancesRepository.save(ambulance);
        return AmbulanceResponseDto.fromEntity(saved);
    }

    async findAll(): Promise<AmbulanceResponseDto[]> {
        const ambulances = await this.ambulancesRepository.find();
        return ambulances.map((ambulance) =>
            AmbulanceResponseDto.fromEntity(ambulance),
        );
    }

    async findOne(id: string): Promise<AmbulanceResponseDto> {
        const ambulance = await this.ambulancesRepository.findOne({
            where: { id },
        });

        if (!ambulance) {
            throw new NotFoundException(`Ambulance with ID ${id} not found`);
        }

        return AmbulanceResponseDto.fromEntity(ambulance);
    }

    async updateLocation(
        id: string,
        updateLocationDto: UpdateAmbulanceLocationDto,
    ): Promise<AmbulanceResponseDto> {
        const ambulance = await this.findOneEntity(id);

        ambulance.location = createPoint(
            updateLocationDto.latitude,
            updateLocationDto.longitude,
        );

        if (updateLocationDto.status) {
            ambulance.status = updateLocationDto.status;
        }

        const updated = await this.ambulancesRepository.save(ambulance);
        return AmbulanceResponseDto.fromEntity(updated);
    }

    async updateStatus(
        id: string,
        updateStatusDto: { status: AmbulanceStatus },
    ): Promise<AmbulanceResponseDto> {
        const ambulance = await this.findOneEntity(id);

        ambulance.status = updateStatusDto.status;

        const updated = await this.ambulancesRepository.save(ambulance);
        return AmbulanceResponseDto.fromEntity(updated);
    }

    async updatePosition(
        id: string,
        updatePositionDto: { coordinates: { lat: number; lng: number } },
    ): Promise<AmbulanceResponseDto> {
        const ambulance = await this.findOneEntity(id);

        ambulance.location = createPoint(
            updatePositionDto.coordinates.lat,
            updatePositionDto.coordinates.lng,
        );

        const updated = await this.ambulancesRepository.save(ambulance);
        return AmbulanceResponseDto.fromEntity(updated);
    }

    async findOneEntity(id: string): Promise<Ambulance> {
        const ambulance = await this.ambulancesRepository.findOne({
            where: { id },
        });

        if (!ambulance) {
            throw new NotFoundException(`Ambulance with ID ${id} not found`);
        }

        return ambulance;
    }

    async findNearestToPoint(
        latitude: number,
        longitude: number,
    ): Promise<{ ambulance: Ambulance; distance: number }> {
        const result = await this.ambulancesRepository
            .createQueryBuilder('ambulance')
            .select('ambulance')
            .addSelect(
                `ST_Distance(
          ambulance.location,
          ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography
        )`,
                'distance',
            )
            .setParameters({ latitude, longitude })
            .orderBy('distance', 'ASC')
            .limit(1)
            .getRawAndEntities();

        if (!result.entities.length) {
            throw new NotFoundException('No ambulances available');
        }

        return {
            ambulance: result.entities[0],
            distance: parseFloat(result.raw[0].distance),
        };
    }
}
