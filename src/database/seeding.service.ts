import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Hospital } from '../hospitals/entities/hospital.entity';
import { Ambulance } from '../ambulances/entities/ambulance.entity';
import { seedHospitals } from './seeds/hospitals.seed';
import { seedAmbulances } from './seeds/ambulances.seed';

@Injectable()
export class SeedingService implements OnApplicationBootstrap {
    private readonly logger = new Logger(SeedingService.name);

    constructor(private readonly dataSource: DataSource) { }

    async onApplicationBootstrap() {
        try {
            this.logger.log('🧐 Checking if database needs seeding...');

            await this.dataSource.query('CREATE EXTENSION IF NOT EXISTS postgis');

            const hospitalCount = await this.dataSource.getRepository(Hospital).count();
            const ambulanceCount = await this.dataSource.getRepository(Ambulance).count();

            if (hospitalCount === 0 || ambulanceCount === 0) {
                this.logger.log('Database is empty. Starting automatic seeding...');

                if (hospitalCount === 0) {
                    await seedHospitals(this.dataSource);
                    this.logger.log('Hospitals seeded successfully');
                }

                if (ambulanceCount === 0) {
                    await seedAmbulances(this.dataSource);
                    this.logger.log('Ambulances seeded successfully');
                }

                this.logger.log('Automatic seeding completed!');
            } else {
                this.logger.log('Database already has data. Skipping seeding.');
            }
        } catch (error) {
            this.logger.error('Error during automatic seeding:', error.message);
        }
    }
}
