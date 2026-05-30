# OFPPT Regional Database

Centralized management system for OFPPT regional entities. Provides a web dashboard for administrative management and a REST API for satellite applications.

You can read more about it on this [blog post](https://wbaya.dev/?cmd=cat&arg=blog%2F001_how_i_built_a_data_platform_during_internship_after_discovering_there_was_no_database.md)

## Test Credentials

visit [ofppt-regional-database](https://ofppt-regional-database-main-mjnfv7.free.laravel.cloud) to test

| Code | Password | Role | Scope |
|------|----------|------|-------|
| `ADMIN01` | `ADMIN01` | Administrator | Global CRUD |
| `DRRG01` | `DRRG01` | Regional Director | BMKH Region |
| `DRCX01` | `DRCX01` | Complex Director | CFP-BM2 Complex |
| `DRPD01` | `DRPD01` | Pedagogical Director | ISTANTIC-BM Establishment |
| `FRMT01` | `FRMT01` | Trainer | Profile only |
| `AGAD01` | `AGAD01` | Administrative Agent | Establishment assets/rooms/trainings |

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                        This Project                       │
│                   (Laravel + Inertia)                     │
├───────────────────────────────────────────────────────────┤
│  Dashboard (Inertia)         │    REST API (Sanctum)      │
│  /routes/web.php             │    /routes/api.php         │
├───────────────────────────────────────────────────────────┤
│  Models / Policies / Scopes  │    Controllers / Resources │
└───────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                    Satellite Applications                 │
│  - Attestation Management                                 │
│  - (future applications...)                               │
└───────────────────────────────────────────────────────────┘
```

## Staff Roles

| Role | Label | Access Scope |
|------|-------|-------------|
| `admin` | Administrator | Global (all entities) |
| `DRRG` | Regional Director | Their Region |
| `DRCX` | Complex Director | Their Complex |
| `DRPD` | Pedagogical Director | Their Establishment |
| `AGAD` | Administrative Agent | Their Establishment (write: trainings, assets, rooms) |
| `FRMT` | Trainer | Their Profile only |

## Data Hierarchy

```
Region (DRRG)
  └─ Complex (DRCX)
       └─ Establishment (DRPD, AGAD, FRMT)
            ├─ Staff
            ├─ Training
            ├─ Asset
            └─ Room
```

## Models

- **Region** - Administrative region (e.g., Tanger-Tetouan)
- **Complex** - Training complex within a region
- **Establishment** - Specific establishment within a complex
- **User** - Staff with roles
- **Training** - Training programs
- **Asset** - Assets
- **Room** - Physical rooms

## API Endpoints

All endpoints (except login) require Sanctum authentication via the `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/login` | Login with code/password |
| POST | `/api/auth/logout` | Logout (revoke token) |
| GET | `/api/user` | Get authenticated user |

### Read Only (Hierarchy)

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/regions` | List regions |
| GET | `/api/regions/{region}` | Get a region |
| GET | `/api/complexes` | List complexes |
| GET | `/api/complexes/{complex}` | Get a complex |
| GET | `/api/establishments` | List establishments |
| GET | `/api/establishments/{establishment}` | Get an establishment |
| GET | `/api/users` | List staff |
| GET | `/api/users/{user}` | Get a staff member |

### Read + Write (Operational)

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/trainings` | List trainings |
| GET | `/api/trainings/{training}` | Get a training |
| POST | `/api/trainings` | Create a training |
| PUT | `/api/trainings/{training}` | Update a training |
| GET | `/api/assets` | List assets |
| GET | `/api/assets/{asset}` | Get an asset |
| POST | `/api/assets` | Create an asset |
| PUT | `/api/assets/{asset}` | Update an asset |
| GET | `/api/rooms` | List rooms |
| GET | `/api/rooms/{room}` | Get a room |
| POST | `/api/rooms` | Create a room |
| PUT | `/api/rooms/{room}` | Update a room |

### API Response Format

```json
{
  "message": "Operation description.",
  "payload": { ... }
}
```

### Example: Login

```bash
curl -X POST https://api.ofppt.local/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"code": "USR001", "password": "secret"}'
```

```json
{
  "message": "Login successful.",
  "payload": {
    "id": 1,
    "code": "USR001",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin",
    "establishment": null
  },
  "token": "1|aBcDeFgHiJkLmNoPqRsTuVwXyZ..."
}
```

## Web Routes

| Method | Controller | Description |
|--------|----------|-------------|
| GET/POST | `/regions` | Regions CRUD |
| GET/POST | `/complexes` | Complexes CRUD |
| GET/POST | `/establishments` | Establishments CRUD |
| GET/POST | `/users` | Staff CRUD |
| GET/POST | `/trainings` | Trainings CRUD |
| GET/POST | `/assets` | Assets CRUD |
| GET/POST | `/rooms` | Rooms CRUD |
| GET/POST | `/profile` | Profile |

## Policy-Based Access Control

Each model has a corresponding Policy that enforces:

- **Admin** (`admin`): Full access to all operations
- **DRRG**: Access to their region and downstream
- **DRCX**: Access to their complex and downstream
- **DRPD**: Access to their establishment and downstream
- **AGAD**: Read/write trainings, assets, rooms in their establishment
- **FRMT**: Read-only profile access

### Scope Behavior

| Model | Scope | Behavior |
|-------|-------|---------|
| Region | `forHead()` | Admin sees all; DRRG sees only their region |
| Complex | `forHead()` | Admin sees all; DRRG sees their region's complexes; DRCX sees only their complex |
| Establishment | `forHead()` | Admin sees all; DRRG sees those in their region; DRCX sees those in their complex; DRPD/AGAD see their establishment |
| Training | `forUser()` | Admin/DRRG/DRCX/DRPD/AGAD see all; FRMT sees nothing |
| Asset | `forUser()` | Admin/DRRG/DRCX/DRPD/AGAD see all; FRMT sees nothing |
| Room | `forUser()` | Admin/DRRG/DRCX/DRPD/AGAD see all; FRMT sees nothing |
| User | `forSuperior()` | Admin sees all; DRRG sees their region; DRCX sees their complex; DRPD sees their establishment |

## Dashboard Features by Role

### Administrator
- **Regions**: Full CRUD (filter by name)
- **Complexes**: Full CRUD (filter by name, regions)
- **Establishments**: Full CRUD (filter by name, regions, complexes)
- **Staff**: Full CRUD including passwords (filter by name, regions, complexes, establishments)
- **Trainings**: Full CRUD (filter by name, regions, complexes, establishments)
- **Assets**: Full CRUD (filter by name, regions, complexes, establishments)
- **Rooms**: Full CRUD (filter by name, regions, complexes, establishments)

### DRRG (Regional Director)
- **Their Profile**: Edit personal info
- **Their Region**: CRUD their region
- **Their Complexes**: CRUD their complexes (filter by name)
- **Their Establishments**: CRUD their establishments (filter by name, complexes)
- **Their Staff**: CRUD their staff including passwords (filter by name, complexes, establishments)
- **Their Trainings**: CRUD their trainings (filter by name, complexes, establishments)
- **Their Assets**: CRUD their assets (filter by name, complexes, establishments)
- **Their Rooms**: CRUD their rooms (filter by name, complexes, establishments)

### DRCX (Complex Director)
- **Their Profile**: Edit personal info
- **Their Complex**: CRUD their complex
- **Their Establishments**: CRUD their establishments (filter by name)
- **Their Staff**: CRUD their staff including passwords (filter by name, establishments)
- **Their Trainings**: CRUD their trainings (filter by name, establishments)
- **Their Assets**: CRUD their assets (filter by name, establishments)
- **Their Rooms**: CRUD their rooms (filter by name, establishments)

### DRPD (Pedagogical Director)
- **Their Profile**: Edit personal info
- **Their Establishment**: CRUD their establishment
- **Their Staff**: CRUD their staff including passwords (filter by name)
- **Their Trainings**: CRUD their trainings (filter by name)
- **Their Assets**: CRUD their assets (filter by name)
- **Their Rooms**: CRUD their rooms (filter by name)

### AGAD (Administrative Agent)
- **Their Profile**: Edit personal info
- **Their Trainings**: CRUD their establishment's trainings (filter by name)
- **Their Assets**: CRUD their establishment's assets (filter by name)
- **Their Rooms**: CRUD their establishment's rooms (filter by name)

### FRMT (Trainer)
- **Their Profile**: Edit personal info

## Tech Stack

- **Framework**: Laravel 12
- **Frontend**: React + Inertia
- **Auth**: Laravel Sanctum
- **Database**: MySQL
- **State**: React Query (via Inertia)

## Prerequisites

- PHP 8.2+
- MySQL 8.0+
- Node.js 20+

## Installation

```bash
# Install dependencies
composer install
npm install

# Configure environment
cp .env.example .env
# Edit .env with database credentials

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed the database
php artisan db:seed

# Start development
composer run dev
```

## Directory Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Api/          # REST API controllers
│   │   └── Web/          # Web controllers (Inertia)
│   ├── Middleware/
│   └── Resources/        # JSON API Resources
├── Models/
│   ├── Concerns/        # Traits (ForUserScope)
│   └── *.php
├── Policies/            # Authorization policies
routes/
├── api.php             # REST API routes
└── web.php            # Web routes
```

## AI Transparency

- **Crafted development**: Backend, architecture decisions.
- **LLM-assisted development**: Frontend.
