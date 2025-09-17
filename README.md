# MigoHealth - Digital Health Record Management System

QR-based health ID lookup system for migrant workers in Kerala.

## Tech Stack
- **Frontend**: React.js + TailwindCSS
- **Backend**: Spring Boot + Spring Data JPA + MySQL
- **QR Scanner**: react-qr-scanner

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Database Setup
1. Install MySQL and create database:
```sql
CREATE DATABASE migohealth;
```

2. Update database credentials in `backend/src/main/resources/application.properties`

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

### Frontend Setup
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

## API Endpoints

### Get Worker by Health ID
```
GET /api/workers/{healthId}
```

**Example Request:**
```
GET http://localhost:8080/api/workers/GH-TVM-023-MW-045
```

**Example Response:**
```json
{
  "id": 1,
  "healthId": "GH-TVM-023-MW-045",
  "name": "Ramesh Kumar",
  "age": 32,
  "gender": "Male",
  "originState": "Bihar",
  "photoUrl": "https://example.com/photos/ramesh.jpg"
}
```

## Sample Health IDs for Testing
- `GH-TVM-023-MW-045` (Ramesh Kumar)
- `GH-KCH-012-MW-089` (Priya Sharma)
- `GH-EKM-045-MW-123` (Suresh Yadav)

## Features
- ✅ Role-based home page (Doctor/Worker/Health Dept)
- ✅ QR code scanner with camera access
- ✅ Worker lookup by Health ID
- ✅ Responsive design with TailwindCSS
- ✅ Error handling for 404/network issues
- ✅ Sample data preloaded
- ✅ CORS enabled for frontend-backend communication

## Usage
1. Start backend server
2. Start frontend application
3. Select role (Doctor/Worker)
4. Scan QR code or use test buttons
5. View worker details

## Future Enhancements
- Spring Security + JWT authentication
- Government dashboard with aggregated data
- Medical history tracking
- Vaccination records
- AWS deployment (EC2/RDS)