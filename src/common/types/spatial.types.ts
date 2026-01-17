export interface Point {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export function createPoint(latitude: number, longitude: number): Point {
    return {
        type: 'Point',
        coordinates: [longitude, latitude],
    };
}

export function pointToCoordinates(point: Point): Coordinates {
    return {
        longitude: point.coordinates[0],
        latitude: point.coordinates[1],
    };
}
