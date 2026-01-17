# Response Structure Usage Guide

## Overview

All API responses now follow a consistent structure for both success and error cases.

## Success Response Structure

```typescript
{
  success: true,
  statusCode: 200,
  message: "Request successful",
  data: { ... },
  timestamp: "2026-01-17T02:07:20.000Z",
  path: "/api/hospitals"
}
```

## Error Response Structure

```typescript
{
  success: false,
  statusCode: 404,
  message: "Hospital with ID xyz not found",
  error: "Not Found",
  errors?: [...],  // Only for validation errors
  timestamp: "2026-01-17T02:07:20.000Z",
  path: "/api/hospitals/xyz"
}
```

---

## Usage in Controllers and Services

### Basic Usage (Automatic)

Controllers can return data directly - the interceptor will wrap it:

```typescript
@Get()
async findAll() {
  return await this.hospitalsService.findAll();
}
// Response: { success: true, statusCode: 200, message: "Request successful", data: [...], ... }
```

### Custom Success Messages

Use the `createResponse` helper to add custom messages:

```typescript
import { createResponse } from '../common/utils/response.util';

@Post()
async create(@Body() createDto: CreateHospitalDto) {
  const hospital = await this.hospitalsService.create(createDto);
  return createResponse(hospital, 'Hospital created successfully');
}
// Response: { success: true, statusCode: 201, message: "Hospital created successfully", data: {...}, ... }
```

### Throwing Errors

Use standard NestJS exceptions - the filter will format them:

```typescript
import { NotFoundException } from '@nestjs/common';

async findOne(id: string) {
  const hospital = await this.repository.findOne({ where: { id } });
  
  if (!hospital) {
    throw new NotFoundException(`Hospital with ID ${id} not found`);
  }
  
  return hospital;
}
// Error Response: { success: false, statusCode: 404, message: "Hospital with ID xyz not found", ... }
```

---

## Examples

### GET /api/hospitals

**Success Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": [
    {
      "id": "uuid",
      "name": "Lagos University Teaching Hospital",
      "address": "Idi-Araba, Surulere, Lagos",
      "numberOfBeds": 500,
      "specialties": ["General Medicine", "Surgery"],
      "latitude": 6.5027,
      "longitude": 3.3724
    }
  ],
  "timestamp": "2026-01-17T02:07:20.123Z",
  "path": "/api/hospitals"
}
```

### POST /api/hospitals (Validation Error)

**Error Response (400):**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "numberOfBeds must be a positive number",
  "error": "Bad Request",
  "errors": [
    "numberOfBeds must be a positive number",
    "name should not be empty"
  ],
  "timestamp": "2026-01-17T02:07:20.123Z",
  "path": "/api/hospitals"
}
```

### GET /api/hospitals/:id (Not Found)

**Error Response (404):**
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Hospital with ID abc-123 not found",
  "error": "Not Found",
  "timestamp": "2026-01-17T02:07:20.123Z",
  "path": "/api/hospitals/abc-123"
}
```

---

## Benefits

✅ **Consistency**: All responses follow the same structure  
✅ **Type Safety**: TypeScript interfaces ensure correct response shape  
✅ **Developer Experience**: Easy to parse responses on frontend  
✅ **Debugging**: Timestamp and path help track issues  
✅ **Flexibility**: Custom messages when needed, automatic otherwise
