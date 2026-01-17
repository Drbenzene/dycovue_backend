import 'dotenv/config';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../config/database.config';
import { seedHospitals } from './seeds/hospitals.seed';
import { seedAmbulances } from './seeds/ambulances.seed';

async function runSeeds() {
    const dataSource = new DataSource({
        ...dataSourceOptions,
        synchronize: true, // Auto-create tables
    });

    try {
        await dataSource.initialize();
        console.log('📊 Database connection established');

        // Enable PostGIS extension
        await dataSource.query('CREATE EXTENSION IF NOT EXISTS postgis');
        console.log('🗺️  PostGIS extension enabled');

        console.log('\n🌱 Starting database seeding...\n');

        await seedHospitals(dataSource);
        console.log('\n✅ Hospitals seeded successfully\n');

        await seedAmbulances(dataSource);
        console.log('\n✅ Ambulances seeded successfully\n');

        console.log('🎉 Database seeding completed!');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

runSeeds();
