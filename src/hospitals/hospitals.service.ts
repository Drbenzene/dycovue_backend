import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalDto, HospitalResponseDto } from './dto/hospital.dto';
import { createPoint, pointToCoordinates } from '../common/types/spatial.types';
import { AmbulancesService } from '../ambulances/ambulances.service';
import { ProximityResponseDto } from '../proximity/dto/proximity-response.dto';
import { AmbulanceResponseDto } from '../ambulances/dto/ambulance.dto';

@Injectable()
export class HospitalsService {
    private readonly cacheTTL: number;

    constructor(
        @InjectRepository(Hospital)
        private hospitalsRepository: Repository<Hospital>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private ambulancesService: AmbulancesService,
        private configService: ConfigService,
    ) {
        this.cacheTTL = this.configService.get<number>('cache.ttl', 300);
    }

    async create(createHospitalDto: CreateHospitalDto): Promise<HospitalResponseDto> {
        const hospital = this.hospitalsRepository.create({
            name: createHospitalDto.name,
            address: createHospitalDto.address,
            numberOfBeds: createHospitalDto.numberOfBeds,
            specialties: createHospitalDto.specialties || [],
            location: createPoint(
                createHospitalDto.latitude,
                createHospitalDto.longitude,
            ),
        });

        const saved = await this.hospitalsRepository.save(hospital);
        return HospitalResponseDto.fromEntity(saved);
    }

    async findAll(): Promise<HospitalResponseDto[]> {
        const hospitals = await this.hospitalsRepository.find();
        return hospitals.map((hospital) => HospitalResponseDto.fromEntity(hospital));
    }

    async findOne(id: string): Promise<HospitalResponseDto> {
        const hospital = await this.hospitalsRepository.findOne({
            where: { id },
        });

        if (!hospital) {
            throw new NotFoundException(`Hospital with ID ${id} not found`);
        }

        return HospitalResponseDto.fromEntity(hospital);
    }

    async findOneEntity(id: string): Promise<Hospital> {
        const hospital = await this.hospitalsRepository.findOne({
            where: { id },
        });

        if (!hospital) {
            throw new NotFoundException(`Hospital with ID ${id} not found`);
        }

        return hospital;
    }

    async findNearestAmbulance(
        hospitalId: string,
    ): Promise<ProximityResponseDto> {
        const cacheKey = `nearest_ambulance:hospital:${hospitalId}`;
        const cachedResult = await this.cacheManager.get<ProximityResponseDto>(
            cacheKey,
        );

        if (cachedResult) {
            return {
                ...cachedResult,
                fromCache: true,
            };
        }

        const hospital = await this.findOneEntity(hospitalId);
        const coords = pointToCoordinates(hospital.location);

        const { ambulance, distance } =
            await this.ambulancesService.findNearestToPoint(
                coords.latitude,
                coords.longitude,
            );

        const result: ProximityResponseDto = {
            ambulance: AmbulanceResponseDto.fromEntity(ambulance),
            distance: Math.round(distance * 100) / 100,
            fromCache: false,
        };
        await this.cacheManager.set(cacheKey, result, this.cacheTTL * 1000);
        return result;
    }
}
