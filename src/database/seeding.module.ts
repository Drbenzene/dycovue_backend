import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedingService } from './seeding.service';
import { Hospital } from '../hospitals/entities/hospital.entity';
import { Ambulance } from '../ambulances/entities/ambulance.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Hospital, Ambulance])],
    providers: [SeedingService],
    exports: [SeedingService],
})
export class SeedingModule { }
