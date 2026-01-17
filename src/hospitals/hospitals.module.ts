import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { Hospital } from './entities/hospital.entity';
import { AmbulancesModule } from '../ambulances/ambulances.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Hospital]),
        AmbulancesModule,
    ],
    controllers: [HospitalsController],
    providers: [HospitalsService],
    exports: [HospitalsService],
})
export class HospitalsModule { }
