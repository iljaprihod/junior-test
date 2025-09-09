# IoT System with ESP32, Sensors, and REST API

This system connects **ESP32 devices with sensors** to a **backend and frontend application** through a **REST API**.  
The backend stores users, devices, and measurement data in an external data center (database).  
**Credentials** are used both for user authentication and for devices to send sensor data securely.

---

## Database Schema

```mermaid
erDiagram
    USERS {
        int user_id PK
        string username
        string password_hash
    }

    DEVICES {
        string device_id PK "MAC Address"
        string name
        string location
        datetime registered_at
        int user_id FK
    }

    MEASUREMENT {
        int measurement_id PK
        string device_id FK
        datetime timestamp
        float temperature
        float co2
        float humidity
    }

    USERS ||--o{ DEVICES : owns
    DEVICES ||--o{ MEASUREMENT : reports