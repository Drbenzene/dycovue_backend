# GIS-Integrated Hospital Dashboard - Backend

A NestJS-based backend API for managing hospital locations, ambulance tracking, and calculating proximity using PostGIS spatial queries with Redis caching.

## 🏗️ Architecture

### Tech Stack
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 15 with PostGIS extension
- **ORM**: TypeORM with spatial type support  
- **Caching**: Redis
- **API Documentation**: Swagger/OpenAPI

### Key Features
- ✅ Hospital and ambulance CRUD operations
- ✅ Spatial queries using PostGIS for accurate distance calculations
- ✅ Redis caching layer to optimize repeated proximity requests
- ✅ REST API with comprehensive Swagger documentation
- ✅ Input validation with class-validator
- ✅ Docker Compose for easy local development

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## 🚀 Setup Instructions

### 1. Clone & Install Dependencies

```bash
cd gis-hospital-dashboard-backend
npm install
```

### 2. Environment Configuration

The `.env` file has already been created with default values. You can modify it if needed:

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=hospital_user
DB_PASSWORD=hospital_pass
DB_DATABASE=hospital_dashboard

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Caching
CACHE_TTL=300
```

### 3. Start Infrastructure (PostgreSQL + Redis)

```bash
docker-compose up -d
```

This will start:
- PostgreSQL 15 with PostGIS on port 5432
- Redis on port 6379

### 4. Seed Database

Run the seed script to populate the database with 10 hospitals and 5 ambulances:

```bash
npm run seed
```

### 5. Start the Application

```bash
npm run start:dev
```

The API will be available at:
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## 📡 API Endpoints

### Hospitals

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/hospitals` | List all hospitals |
| `GET` | `/hospitals/:id` | Get hospital by ID |
| `POST` | `/hospitals` | Create a new hospital |

### Ambulances

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/ambulances` | List all ambulances |
| `GET` | `/ambulances/:id` | Get ambulance by ID |
| `POST` | `/ambulances` | Create a new ambulance |
| `PATCH` | `/ambulances/:id/location` | Update ambulance location |

### Proximity (Core Feature)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/proximity/hospitals/:id/nearest-ambulance` | Find nearest ambulance to a hospital |

**Example Response:**
```json
{
  "ambulance": {
    "id": "uuid",
    "vehicleNumber": "AMB-001",
    "status": "available",
    "latitude": 40.7580,
    "longitude": -73.9855,
    "lastUpdated": "2026-01-17T01:00:00.000Z"
  },
  "distance": 1234.56,
  "fromCache": false
}
```

## 🔍 How It Works

### Spatial Queries

The application uses PostGIS's `ST_Distance` function to calculate geodesic distances between points:

```sql
SELECT *, ST_Distance(
  location, 
  ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
) as distance
FROM ambulances
ORDER BY distance ASC
LIMIT 1;
```

This provides accurate distance calculations using the WGS84 coordinate system (SRID 4326).

### Caching Strategy

- **Cache Key**: `nearest_ambulance:hospital:{hospitalId}`
- **TTL**: 300 seconds (5 minutes, configurable via `CACHE_TTL`)
- **Invalidation**: Automatically handled when ambulance locations are updated
- **Benefits**: Reduces database load for repeated queries; improves response time

The `fromCache` field in the response indicates whether the result came from cache.

## 📦 Project Structure

```
src/
├── ambulances/          # Ambulance module
│   ├── entities/
│   ├── dto/
│   ├── ambulances.service.ts
│   ├── ambulances.controller.ts
│   └── ambulances.module.ts
├── hospitals/           # Hospital module
│   ├── entities/
│   ├── dto/
│   ├── hospitals.service.ts
│   ├── hospitals.controller.ts
│   └── hospitals.module.ts
├── proximity/           # Proximity calculations with caching
│   ├── dto/
│   ├── proximity.service.ts
│   ├── proximity.controller.ts
│   └── proximity.module.ts
├── database/            # Seeding scripts
│   ├── seeds/
│   └── seed.ts
├── config/              # Configuration modules
│   ├── database.config.ts
│   └── redis.config.ts
├── common/              # Shared utilities
│   └── types/
│       └── spatial.types.ts
├── app.module.ts
└── main.ts
```

## 🧪 Testing the Application

### Using Swagger UI

1. Navigate to http://localhost:3000/api
2. Explore and test all endpoints interactively

### Using curl

```bash
# Get all hospitals
curl http://localhost:3000/hospitals

# Get all ambulances
curl http://localhost:3000/ambulances

# Find nearest ambulance (replace {id} with actual hospital ID)
curl http://localhost:3000/proximity/hospitals/{id}/nearest-ambulance

# Update ambulance location
curl -X PATCH http://localhost:3000/ambulances/{id}/location \
  -H "Content-Type: application/json" \
  -d '{"latitude": 40.7580, "longitude": -73.9855, "status": "available"}'
```

### Verify Caching

1. Call the nearest ambulance endpoint for a hospital
2. Call it again immediately - notice `fromCache: true` and faster response time
3. Wait 5 minutes or update ambulance location to invalidate cache

## 🐛 Learning Log

### Challenge: PostGIS Geography Type with TypeORM

**Problem**: Initially struggled to get TypeORM to properly handle PostGIS geography types with spatial indexing. The entity column definition wasn't creating proper spatial indexes.

**Research**: 
- Reviewed TypeORM documentation on spatial types
- Explored PostGIS documentation for geography vs geometry types
- Tested different column configurations and index decorators

**Solution**: 
Used the correct TypeORM column definition with explicit SRID and spatial index:

```typescript
@Index({ spatial: true })
@Column({
  type: 'geography',
  spatialFeatureType: 'Point',
  srid: 4326,
})
location: Point;
```

The key insight was using `geography` type instead of `geometry` for accurate distance calculations across the globe, and ensuring the spatial index was properly applied for query performance.

## 🔧 Additional Scripts

```bash
# Format code
npm run format

# Lint code
npm run lint

# Build for production
npm run build

# Run production build
npm run start:prod
```

## 🛠️ Development Tips

- The database uses `synchronize: true` in development mode, so schema changes auto-apply
- Redis cache can be flushed manually if needed using `redis-cli FLUSHALL`
- Check Docker container logs: `docker-compose logs -f`
- Access PostgreSQL: `docker exec -it gis-hospital-db psql -U hospital_user -d hospital_dashboard`

## 📝 Future Enhancements

- Real-time ambulance location updates via WebSockets
- Multiple ambulance assignment logic
- Historical route tracking
- Advanced filtering (by ambulance status, hospital type)
- Performance metrics and monitoring

## 📄 License

This project is for technical assessment purposes.

---

**Built with ❤️ using NestJS, PostGIS, and Redis**
