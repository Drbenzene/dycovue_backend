import { DataSource } from 'typeorm';
import { Ambulance, AmbulanceStatus } from '../../ambulances/entities/ambulance.entity';
import { createPoint } from '../../common/types/spatial.types';

export async function seedAmbulances(dataSource: DataSource): Promise<void> {
    const ambulanceRepository = dataSource.getRepository(Ambulance);

    const ambulances = [
        {
            vehicleNumber: 'AMB-LG-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 6.5244,
            longitude: 3.3792,
        },
        {
            vehicleNumber: 'AMB-LG-002',
            status: AmbulanceStatus.EN_ROUTE,
            latitude: 6.4541,
            longitude: 3.3947,
        },
        {
            vehicleNumber: 'AMB-AB-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 9.0579,
            longitude: 7.4951,
        },
        {
            vehicleNumber: 'AMB-AB-002',
            status: AmbulanceStatus.BUSY,
            latitude: 9.0820,
            longitude: 7.4124,
        },
        {
            vehicleNumber: 'AMB-PH-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 4.8156,
            longitude: 7.0498,
        },
        {
            vehicleNumber: 'AMB-PH-002',
            status: AmbulanceStatus.EN_ROUTE,
            latitude: 4.8396,
            longitude: 6.9972,
        },
        {
            vehicleNumber: 'AMB-IB-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 7.3775,
            longitude: 3.9470,
        },
        {
            vehicleNumber: 'AMB-IB-002',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 7.4043,
            longitude: 3.9067,
        },
        {
            vehicleNumber: 'AMB-KN-001',
            status: AmbulanceStatus.BUSY,
            latitude: 12.0022, // Kano
            longitude: 8.5920,
        },
        {
            vehicleNumber: 'AMB-KN-002',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 11.9959, // Kano
            longitude: 8.5211,
        },
        {
            vehicleNumber: 'AMB-BE-001',
            status: AmbulanceStatus.EN_ROUTE,
            latitude: 6.3350, // Benin City
            longitude: 5.6037,
        },
        {
            vehicleNumber: 'AMB-BE-002',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 6.3174, // Benin City
            longitude: 5.6139,
        },
        {
            vehicleNumber: 'AMB-KD-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 10.5225, // Kaduna
            longitude: 7.4388,
        },
        {
            vehicleNumber: 'AMB-EN-001',
            status: AmbulanceStatus.BUSY,
            latitude: 6.4541, // Enugu
            longitude: 7.5455,
        },
        {
            vehicleNumber: 'AMB-AS-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 6.2088, // Asaba
            longitude: 6.6958,
        },
        {
            vehicleNumber: 'AMB-OW-001',
            status: AmbulanceStatus.EN_ROUTE,
            latitude: 5.4840, // Owerri
            longitude: 7.0351,
        },
        {
            vehicleNumber: 'AMB-JO-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 9.9256, // Jos
            longitude: 8.8921,
        },
        {
            vehicleNumber: 'AMB-IL-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 8.4967, // Ilorin
            longitude: 4.5425,
        },
        {
            vehicleNumber: 'AMB-AK-001',
            status: AmbulanceStatus.BUSY,
            latitude: 7.1475, // Abeokuta
            longitude: 3.3619,
        },
        {
            vehicleNumber: 'AMB-SO-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 13.0622, // Sokoto
            longitude: 5.2339,
        },
        {
            vehicleNumber: 'AMB-MB-001',
            status: AmbulanceStatus.EN_ROUTE,
            latitude: 11.8464, // Maiduguri
            longitude: 13.1571,
        },
        {
            vehicleNumber: 'AMB-MK-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 7.7332, // Makurdi
            longitude: 8.5241,
        },
        {
            vehicleNumber: 'AMB-YO-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 9.2094, // Yola
            longitude: 12.4760,
        },
        {
            vehicleNumber: 'AMB-UM-001',
            status: AmbulanceStatus.BUSY,
            latitude: 5.5265, // Umuahia
            longitude: 7.4896,
        },
        {
            vehicleNumber: 'AMB-JA-001',
            status: AmbulanceStatus.AVAILABLE,
            latitude: 8.8832, // Jalingo
            longitude: 11.3673,
        },
    ];

    for (const ambulanceData of ambulances) {
        const existing = await ambulanceRepository.findOne({
            where: { vehicleNumber: ambulanceData.vehicleNumber },
        });

        if (!existing) {
            const ambulance = ambulanceRepository.create({
                vehicleNumber: ambulanceData.vehicleNumber,
                status: ambulanceData.status,
                location: createPoint(ambulanceData.latitude, ambulanceData.longitude),
            });
            await ambulanceRepository.save(ambulance);
            console.log(`Created ambulance: ${ambulanceData.vehicleNumber}`);
        } else {
            console.log(`Ambulance already exists: ${ambulanceData.vehicleNumber}`);
        }
    }
}
