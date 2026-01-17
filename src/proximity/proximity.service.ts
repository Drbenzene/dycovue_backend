import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { HospitalsService } from '../hospitals/hospitals.service';
import { AmbulancesService } from '../ambulances/ambulances.service';
import { ProximityResponseDto } from './dto/proximity-response.dto';
import { AmbulanceResponseDto } from '../ambulances/dto/ambulance.dto';
import { pointToCoordinates } from '../common/types/spatial.types';

@Injectable()
export class ProximityService {
    private readonly cacheTTL: number;

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private hospitalsService: HospitalsService,
        private ambulancesService: AmbulancesService,
        private configService: ConfigService,
    ) {
        this.cacheTTL = this.configService.get<number>('cache.ttl', 300);
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

        const hospital = await this.hospitalsService.findOneEntity(hospitalId);
        const coords = pointToCoordinates(hospital.location);

        const { ambulance, distance } =
            await this.ambulancesService.findNearestToPoint(
                coords.latitude,
                coords.longitude,
            );

        const result: ProximityResponseDto = {
            ambulance: AmbulanceResponseDto.fromEntity(ambulance),
            distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
            fromCache: false,
        };

        await this.cacheManager.set(cacheKey, result, this.cacheTTL * 1000);

        return result;
    }

    async invalidateCache(hospitalId: string): Promise<void> {
        const cacheKey = `nearest_ambulance:hospital:${hospitalId}`;
        await this.cacheManager.del(cacheKey);
    }
}
