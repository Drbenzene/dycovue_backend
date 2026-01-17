import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Point } from '../../common/types/spatial.types';

@Entity('hospitals')
export class Hospital extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'int', name: 'number_of_beds', default: 100 })
    numberOfBeds: number;

    @Column({ type: 'text', array: true, default: '{}' })
    specialties: string[];

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    location: Point;
}
