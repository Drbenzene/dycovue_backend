import { DataSource } from 'typeorm';
import { Hospital } from '../../hospitals/entities/hospital.entity';
import { createPoint } from '../../common/types/spatial.types';

export async function seedHospitals(dataSource: DataSource): Promise<void> {
    const hospitalRepository = dataSource.getRepository(Hospital);

    const hospitals = [
        {
            name: 'Lagos University Teaching Hospital',
            address: 'Idi-Araba, Surulere, Lagos',
            latitude: 6.5027,
            longitude: 3.3724,
            numberOfBeds: 500,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Emergency Medicine'],
        },
        {
            name: 'National Hospital Abuja',
            address: 'Central Business District, Abuja',
            latitude: 9.0765,
            longitude: 7.3986,
            numberOfBeds: 450,
            specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Emergency Medicine'],
        },
        {
            name: 'University of Port Harcourt Teaching Hospital',
            address: 'Choba, Port Harcourt, Rivers State',
            latitude: 4.8936,
            longitude: 6.9164,
            numberOfBeds: 400,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Radiology', 'Pathology'],
        },
        {
            name: 'University College Hospital Ibadan',
            address: 'Queen Elizabeth Road, Ibadan, Oyo State',
            latitude: 7.3878,
            longitude: 3.9040,
            numberOfBeds: 480,
            specialties: ['Cardiology', 'Neurosurgery', 'Oncology', 'Pediatrics', 'Emergency Medicine'],
        },
        {
            name: 'Aminu Kano Teaching Hospital',
            address: 'Kano, Kano State',
            latitude: 12.0022,
            longitude: 8.5919,
            numberOfBeds: 350,
            specialties: ['General Medicine', 'Surgery', 'Obstetrics', 'Gynecology', 'Pediatrics'],
        },
        {
            name: 'Obafemi Awolowo University Teaching Hospital',
            address: 'Ile-Ife, Osun State',
            latitude: 7.5248,
            longitude: 4.5197,
            numberOfBeds: 320,
            specialties: ['General Medicine', 'Surgery', 'Orthopedics', 'Ophthalmology', 'ENT'],
        },
        {
            name: 'Lagos State University Teaching Hospital',
            address: 'Ikeja, Lagos',
            latitude: 6.6018,
            longitude: 3.3515,
            numberOfBeds: 380,
            specialties: ['Cardiology', 'Neurology', 'Emergency Medicine', 'Surgery', 'Pediatrics'],
        },
        {
            name: 'Ahmadu Bello University Teaching Hospital',
            address: 'Shika, Zaria, Kaduna State',
            latitude: 11.1404,
            longitude: 7.6756,
            numberOfBeds: 400,
            specialties: ['General Medicine', 'Surgery', 'Obstetrics', 'Pediatrics', 'Psychiatry'],
        },
        {
            name: 'Federal Medical Centre Asaba',
            address: 'Asaba, Delta State',
            latitude: 6.1989,
            longitude: 6.7303,
            numberOfBeds: 250,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Emergency Medicine'],
        },
        {
            name: 'Nnamdi Azikiwe University Teaching Hospital',
            address: 'Nnewi, Anambra State',
            latitude: 6.0177,
            longitude: 6.9166,
            numberOfBeds: 300,
            specialties: ['General Medicine', 'Surgery', 'Orthopedics', 'Obstetrics', 'Pediatrics'],
        },
        {
            name: 'University of Benin Teaching Hospital',
            address: 'Benin City, Edo State',
            latitude: 6.3350,
            longitude: 5.6037,
            numberOfBeds: 420,
            specialties: ['Cardiology', 'Neurology', 'Surgery', 'Emergency Medicine', 'Radiology'],
        },
        {
            name: 'Federal Medical Centre Owerri',
            address: 'Owerri, Imo State',
            latitude: 5.4840,
            longitude: 7.0351,
            numberOfBeds: 280,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Emergency Medicine'],
        },
        {
            name: 'Usmanu Danfodiyo University Teaching Hospital',
            address: 'Sokoto, Sokoto State',
            latitude: 13.0627,
            longitude: 5.2433,
            numberOfBeds: 300,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Gynecology'],
        },
        {
            name: 'Federal Medical Centre Abeokuta',
            address: 'Abeokuta, Ogun State',
            latitude: 7.1475,
            longitude: 3.3619,
            numberOfBeds: 260,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Emergency Medicine'],
        },
        {
            name: 'University of Maiduguri Teaching Hospital',
            address: 'Maiduguri, Borno State',
            latitude: 11.8339,
            longitude: 13.1511,
            numberOfBeds: 350,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Trauma Care', 'Emergency Medicine'],
        },
        {
            name: 'Federal Medical Centre Umuahia',
            address: 'Umuahia, Abia State',
            latitude: 5.5265,
            longitude: 7.4896,
            numberOfBeds: 220,
            specialties: ['General Medicine', 'Surgery', 'Obstetrics', 'Pediatrics'],
        },
        {
            name: 'Delta State University Teaching Hospital',
            address: 'Oghara, Delta State',
            latitude: 5.5580,
            longitude: 6.1167,
            numberOfBeds: 280,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Emergency Medicine', 'Ophthalmology'],
        },
        {
            name: 'Federal Medical Centre Makurdi',
            address: 'Makurdi, Benue State',
            latitude: 7.7314,
            longitude: 8.5370,
            numberOfBeds: 240,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'],
        },
        {
            name: 'University of Ilorin Teaching Hospital',
            address: 'Ilorin, Kwara State',
            latitude: 8.4799,
            longitude: 4.5418,
            numberOfBeds: 380,
            specialties: ['Cardiology', 'Surgery', 'Pediatrics', 'Emergency Medicine', 'Radiology'],
        },
        {
            name: 'Federal Medical Centre Yola',
            address: 'Yola, Adamawa State',
            latitude: 9.2094,
            longitude: 12.4760,
            numberOfBeds: 200,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Emergency Medicine'],
        },
        {
            name: 'Ekiti State University Teaching Hospital',
            address: 'Ado-Ekiti, Ekiti State',
            latitude: 7.6190,
            longitude: 5.2210,
            numberOfBeds: 250,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Gynecology'],
        },
        {
            name: 'Rivers State University Teaching Hospital',
            address: 'Port Harcourt, Rivers State',
            latitude: 4.8156,
            longitude: 7.0498,
            numberOfBeds: 320,
            specialties: ['Cardiology', 'Neurology', 'Surgery', 'Emergency Medicine', 'Pediatrics'],
        },
        {
            name: 'Federal Medical Centre Jalingo',
            address: 'Jalingo, Taraba State',
            latitude: 8.8907,
            longitude: 11.3604,
            numberOfBeds: 180,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Emergency Medicine'],
        },
        {
            name: 'Ladoke Akintola University Teaching Hospital',
            address: 'Ogbomoso, Oyo State',
            latitude: 8.1335,
            longitude: 4.2408,
            numberOfBeds: 300,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Orthopedics'],
        },
        {
            name: 'Federal Medical Centre Lokoja',
            address: 'Lokoja, Kogi State',
            latitude: 7.7974,
            longitude: 6.7406,
            numberOfBeds: 210,
            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Emergency Medicine', 'Radiology'],
        },
    ];

    for (const hospitalData of hospitals) {
        const existing = await hospitalRepository.findOne({
            where: { name: hospitalData.name },
        });

        if (!existing) {
            const hospital = hospitalRepository.create({
                name: hospitalData.name,
                address: hospitalData.address,
                numberOfBeds: hospitalData.numberOfBeds,
                specialties: hospitalData.specialties,
                location: createPoint(hospitalData.latitude, hospitalData.longitude),
            });
            await hospitalRepository.save(hospital);
            console.log(`✅ Created hospital: ${hospitalData.name}`);
        } else {
            console.log(`⏭️  Hospital already exists: ${hospitalData.name}`);
        }
    }
}
