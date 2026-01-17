import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Point } from '../../common/types/spatial.types';

export enum AmbulanceStatus {
    AVAILABLE = 'available',
    EN_ROUTE = 'en_route',
    BUSY = 'busy',
}

@Entity('ambulances')
export class Ambulance extends BaseEntity {
    @Column({ type: 'varchar', length: 50, unique: true, name: 'vehicle_number' })
    vehicleNumber: string;

    @Column({
        type: 'enum',
        enum: AmbulanceStatus,
        default: AmbulanceStatus.AVAILABLE,
    })
    status: AmbulanceStatus;

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    location: Point;
}
