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
System Architecture
mermaid
Копировать код
flowchart LR
    subgraph User_System[Backend + Frontend]
        A[Frontend (Web/App)] -->|REST API| B[Backend]
        B --> DB[(Database)]
    end

    subgraph Device_System[ESP32 + Sensors]
        D[ESP32 + Sensors] -->|Send Measurements| B
    end

    DB -->|Provide Data| A
Authentication & Credentials
Users

Register and login through the frontend.

Passwords are stored as password_hash (not plain text).

Devices (ESP32 + Sensors)

Each device has a unique device_id (MAC address).

Backend issues credentials for the device.

Device authenticates with backend before sending measurements.

Backend

Validates credentials.

Accepts and stores sensor data only from authorized devices.

Data Flow Example
User registers → record stored in Users table.

User registers device (MAC address, location, etc.) → stored in Devices table.

Backend issues credentials to the ESP32 device.

ESP32 authenticates with backend using credentials.

ESP32 sends sensor measurements (temperature, CO2, humidity) via REST API.

Backend validates credentials and stores the data in Measurement table.

Frontend queries data from backend (via REST API).

User views live and historical data for their devices.

Sequence Diagram – ESP32 Data Submission
mermaid
Копировать код
sequenceDiagram
    participant ESP32
    participant Backend
    participant Database
    participant Frontend
    participant User

    User->>Frontend: Login (Username + Password)
    Frontend->>Backend: Send credentials
    Backend->>Database: Verify user & issue token
    Backend->>Frontend: Return session token

    User->>Frontend: Register new device (MAC, name, location)
    Frontend->>Backend: Save device info
    Backend->>Database: Store device linked to user
    Backend->>ESP32: Provide device credentials

    ESP32->>Backend: Authenticate with credentials
    Backend->>Database: Validate device

    loop Periodic Data
        ESP32->>Backend: Send measurement (temperature, CO2, humidity)
        Backend->>Database: Store measurement
    end

    Frontend->>Backend: Request measurements
    Backend->>Database: Fetch data
    Backend->>Frontend: Return data
    Frontend->>User: Display charts/reports