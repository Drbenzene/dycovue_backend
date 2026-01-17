# GIS-Integrated Hospital Dashboard - Backend

Built with PostGIS for geographical precision and Redis for low-latency response times.

---

## Architecture

### Tech Stack

- **Framework**: [NestJS 11](https://nestjs.com/) (TypeScript)
- **Database**: [PostgreSQL 15](https://www.postgresql.org/) with [PostGIS](https://postgis.net/) extension
- **ORM**: [TypeORM](https://typeorm.io/) with spatial support
- **Caching**: [Redis](https://redis.io/) (via `cache-manager-redis-yet`)
- **API Documentation**: [Swagger/OpenAPI 3.0](https://swagger.io/)
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Key Features & Design Patterns

- **Uniform API Responses**: Standardized success and error JSON structures across all endpoints.
- **Spatial Excellence**: Geodesic distance calculations using PostGIS geography types.
- **BaseEntity Refactor**: Shared logic for `id` (UUID), `createdAt`, and `updatedAt`.
- **Caching Layer**: Intelligent Redis caching for proximity queries with automatic invalidation.
- **Global Validation**: Strict DTO validation and error handling.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 or higher (Required for NestJS 11 compatibility)
- **Docker**: Desktop or Engine
- **NPM**: v9 or higher

### 1. Installation & Environment

```bash
# Clone the repository
git clone https://github.com/Drbenzene/gis-hospital-dashboard-backend.git
cd gis-hospital-dashboard-backend

# Install dependencies
npm install
```

### 2. Infrastructure Setup

The project is fully dockerized. To start the database, cache, and application:

```bash
docker-compose up -d --build

```

### 3. Automatic Seeding

The application automatically seeds the database with over **25 Nigerian hospitals** and **25 ambulances** on the first startup if no data is found. No manual seeding is required!

---

## 📚 Learning Log: Standardizing Geo-Spatial Logic & API Architecture

### The Challenge
The most significant technical hurdle was architecting a **Unified Response Envelope** that could seamlessly handle diverse data types—from simple entity updates to complex PostGIS spatial results—while maintaining strict schema consistency for both successful requests and multi-layer exceptions (like `class-validator` arrays).

### Research & Debugging

I encountered an issue where manual error handling in services would skip the global success interceptor, leading to inconsistent response shapes. Researching the NestJS request lifecycle revealed that a combination of a global Interceptor for `2xx` and a custom Exception Filter for `4xx/5xx` was the only way to guarantee a 100% consistent API contract.