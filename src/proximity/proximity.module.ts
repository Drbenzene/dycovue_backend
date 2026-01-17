import { Module } from '@nestjs/common';
import { ProximityService } from './proximity.service';
import { ProximityController } from './proximity.controller';
import { HospitalsModule } from '../hospitals/hospitals.module';
import { AmbulancesModule } from '../ambulances/ambulances.module';

@Module({
    imports: [HospitalsModule, AmbulancesModule],
    controllers: [ProximityController],
    providers: [ProximityService],
})
export class ProximityModule { }
