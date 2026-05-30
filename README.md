# Base de Données Régionale OFPPT

Système centralisé de gestion des entités régionales OFPPT. Fournit un tableau de bord web pour la gestion administrative et une API REST pour les applications satellites.

Vous pouvez en savoir plus à ce sujet sur ce [blog](https://wbaya.dev/?cmd=cat&arg=blog%2F001_how_i_built_a_data_platform_during_internship_after_discovering_there_was_no_database.md)

## Identifiants de Test

visitez [ofppt-regional-database](https://ofppt-regional-database-main-mjnfv7.free.laravel.cloud) pour tester

| Code | Mot de passe | Rôle | Portée |
|------|-------------|------|--------|
| `ADMIN01` | `ADMIN01` | Administrateur | CRUD global |
| `DRRG01` | `DRRG01` | Directeur Régional | Région BMKH |
| `DRCX01` | `DRCX01` | Directeur de Complexe | Complexe CFP-BM2 |
| `DRPD01` | `DRPD01` | Directeur Pédagogique | Établissement ISTANTIC-BM |
| `FRMT01` | `FRMT01` | Formateur | Profil uniquement |
| `AGAD01` | `AGAD01` | Agent Administratif | Actifs/salles/formations de l'établissement |

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                         Ce Projet                         │
│                   (Laravel + Inertia)                     │
├───────────────────────────────────────────────────────────┤
│  Tableau de bord (Inertia)  │    API REST (Sanctum)       │
│  /routes/web.php            │    /routes/api.php          │
├───────────────────────────────────────────────────────────┤
│  Models / Policies / Scopes │    Controllers / Resources  │
└───────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                   Applications Satellites                 │
│  - Gestion des Attestations                               │
│  - (futures applications...)                              │
└───────────────────────────────────────────────────────────┘
```

## Rôles du Personnel

| Rôle | Libellé | Portée d'Accès |
|------|--------|---------------|
| `admin` | Administrateur | Global (toutes les entités) |
| `DRRG` | Directeur Régional | Sa Région |
| `DRCX` | Directeur de Complexe | Son Complexe |
| `DRPD` | Directeur Pédagogique | Son Établissement |
| `AGAD` | Agent Administratif | Son Établissement (écriture: formations, actifs, salles) |
| `FRMT` | Formateur | Son Profil uniquement |

## Hiérarchie des Données

```
Région (DRRG)
  └─ Complexe (DRCX)
       └─ Établissement (DRPD, AGAD, FRMT)
            ├─ Personnel
            ├─ Formation
            ├─ Actif
            └─ Salle
```

## Modèles

- **Region** - Région administrative (ex: Tanger-Tétouan)
- **Complex** - Complexe de formation au sein d'une région
- **Establishment** - Établissement spécifique au sein d'un complexe
- **User** - Personnel avec rôles
- **Training** - Programmes de formation
- **Asset** - Actifs
- **Room** - Salles physiques

## Points de Terminaison API

Tous les points de terminaison (sauf connexion) nécessitent une authentification Sanctum via l'en-tête `Authorization: Bearer <token>`.

### Authentification

| Méthode | Point de Terminaison | Description |
|--------|---------------------|-------------|
| POST | `/api/auth/login` | Connexion avec code/mot de passe |
| POST | `/api/auth/logout` | Déconnexion (suppression du token) |
| GET | `/api/user` | Obtenir l'utilisateur authentifié |

### Lecture Seule (Hiérarchie)

| Méthode | Point de Terminaison | Description |
|--------|---------------------|-------------|
| GET | `/api/regions` | Liste des régions |
| GET | `/api/regions/{region}` | Obtenir une région |
| GET | `/api/complexes` | Liste des complexes |
| GET | `/api/complexes/{complex}` | Obtenir un complexe |
| GET | `/api/establishments` | Liste des établissements |
| GET | `/api/establishments/{establishment}` | Obtenir un établissement |
| GET | `/api/users` | Liste du Personnel |
| GET | `/api/users/{user}` | Obtenir un membre du Personnel |

### Lecture + Écriture (Opérationnel)

| Méthode | Point de Terminaison | Description |
|--------|---------------------|-------------|
| GET | `/api/trainings` | Liste des formations |
| GET | `/api/trainings/{training}` | Obtenir une formation |
| POST | `/api/trainings` | Créer une formation |
| PUT | `/api/trainings/{training}` | Modifier une formation |
| GET | `/api/assets` | Liste des actifs |
| GET | `/api/assets/{asset}` | Obtenir un actif |
| POST | `/api/assets` | Créer un actif |
| PUT | `/api/assets/{asset}` | Modifier un actif |
| GET | `/api/rooms` | Liste des salles |
| GET | `/api/rooms/{room}` | Obtenir une salle |
| POST | `/api/rooms` | Créer une salle |
| PUT | `/api/rooms/{room}` | Modifier une salle |

### Format de Réponse API

```json
{
  "message": "Description de l'opération.",
  "payload": { ... }
}
```

### Exemple: Connexion

```bash
curl -X POST https://api.ofppt.local/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"code": "USR001", "password": "secret"}'
```

```json
{
  "message": "Connexion réussie.",
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

## Routes Web

| Méthode | Contrôleur | Description |
|--------|----------|-------------|
| GET/POST | `/regions` | CRUD régions |
| GET/POST | `/complexes` | CRUD complexes |
| GET/POST | `/establishments` | CRUD établissements |
| GET/POST | `/users` | CRUD Personnel |
| GET/POST | `/trainings` | CRUD formations |
| GET/POST | `/assets` | CRUD actifs |
| GET/POST | `/rooms` | CRUD salles |
| GET/POST | `/profile` | Profil |

## Contrôle d'Accès Basé sur les Politiques

Chaque modèle possède une Politique correspondante qui enforce:

- **Admin** (`admin`): Accès complet à toutes les opérations
- **DRRG**: Accès à sa région et en aval
- **DRCX**: Accès à son complexe et en aval
- **DRPD**: Accès à son établissement et en aval
- **AGAD**: Lecture/écriture formations, actifs, salles dans son établissement
- **FRMT**: Accès lecture seule au profil

### Comportement des Scopes

| Modèle | Scope | Comportement |
|-------|-------|------------|
| Region | `forHead()` | Admin voit tout; DRRG voit seulement sa région |
| Complex | `forHead()` | Admin voit tout; DRRG voit les complexes de sa région; DRCX voit seulement son complexe |
| Establishment | `forHead()` | Admin voit tout; DRRG voit ceux de sa région; DRCX voit ceux de son complexe; DRPD/AGAD voient leur établissement |
| Training | `forUser()` | Admin/DRRG/DRCX/DRPD/AGAD voient tout; FRMT ne voit rien |
| Asset | `forUser()` | Admin/DRRG/DRCX/DRPD/AGAD voient tout; FRMT ne voit rien |
| Room | `forUser()` | Admin/DRRG/DRCX/DRPD/AGAD voient tout; FRMT ne voit rien |
| User | `forSuperior()` | Admin voit tout; DRRG voit sa région; DRCX voit son complexe; DRPD voit son établissement |

## Fonctionnalités du Tableau de Bord par Rôle

### Administrateur
- **Régions**: CRUD total (filtrer par nom)
- **Complexes**: CRUD total (filtrer par nom, régions)
- **Établissements**: CRUD total (filtrer par nom, régions, complexes)
- **Personnel**: CRUD total y compris mots de passe (filtrer par nom, régions, complexes, établissements)
- **Formations**: CRUD total (filtrer par nom, régions, complexes, établissements)
- **Actifs**: CRUD total (filtrer par nom, régions, complexes, établissements)
- **Salles**: CRUD total (filtrer par nom, régions, complexes, établissements)

### DRRG (Directeur Régional)
- **Son Profil**: Modifier infos personnelles
- **Sa Région**: CRUD sa région
- **Ses Complexes**: CRUD ses complexes (filtrer par nom)
- **Ses Établissements**: CRUD ses établissements (filtrer par nom, complexes)
- **Son Personnel**: CRUD son personnel y compris mots de passe (filtrer par nom, complexes, établissements)
- **Ses Formations**: CRUD ses formations (filtrer par nom, complexes, établissements)
- **Ses Actifs**: CRUD ses actifs (filtrer par nom, complexes, établissements)
- **Ses Salles**: CRUD ses salles (filtrer par nom, complexes, établissements)

### DRCX (Directeur de Complexe)
- **Son Profil**: Modifier infos personnelles
- **Son Complexe**: CRUD son complexe
- **Ses Établissements**: CRUD ses établissements (filtrer par nom)
- **Son Personnel**: CRUD son personnel y compris mots de passe (filtrer par nom, établissements)
- **Ses Formations**: CRUD ses formations (filtrer par nom, établissements)
- **Ses Actifs**: CRUD ses actifs (filtrer par nom, établissements)
- **Ses Salles**: CRUD ses salles (filtrer par nom, établissements)

### DRPD (Directeur Pédagogique)
- **Son Profil**: Modifier infos personnelles
- **Son Établissement**: CRUD son établissement
- **Son Personnel**: CRUD son personnel y compris mots de passe (filtrer par nom)
- **Ses Formations**: CRUD ses formations (filtrer par nom)
- **Ses Actifs**: CRUD ses actifs (filtrer par nom)
- **Ses Salles**: CRUD ses salles (filtrer par nom)

### AGAD (Agent Administratif)
- **Son Profil**: Modifier infos personnelles
- **Ses Formations**: CRUD les formations de son établissement (filtrer par nom)
- **Ses Actifs**: CRUD les actifs de son établissement (filtrer par nom)
- **Ses Salles**: CRUD les salles de son établissement (filtrer par nom)

### FRMT (Formateur)
- **Son Profil**: Modifier infos personnelles

## Stack Technologique

- **Framework**: Laravel 12
- **Frontend**: React + Inertia
- **Auth**: Laravel Sanctum
- **Database**: MySQL
- **State**: React Query (via Inertia)

## Prérequis

- PHP 8.2+
- MySQL 8.0+
- Node.js 20+

## Installation

```bash
# Installer les dépendances
composer install
npm install

# Configurer l'environnement
cp .env.example .env
# Modifier .env avec les identifiants de base de données

# Générer la clé
php artisan key:generate

# Exécuter les migrations
php artisan migrate

# Peuppler la base de données
php artisan db:seed

# Démarrer le développement
composer run dev
```

## Structure des Répertoires

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Api/          # Contrôleurs API REST
│   │   └── Web/          # Contrôleurs Web (Inertia)
│   ├── Middleware/
│   └── Resources/        # Ressources JSON API
├── Models/
│   ├── Concerns/        # Traits (ForUserScope)
│   └── *.php
├── Policies/            # Politiques d'autorisation
routes/
├── api.php             # Routes API REST
└── web.php            # Routes Web
```

## Notes de Production

Ce projet est un **MVP (Minimum Viable Product)**. Avant une mise en production, les éléments suivants doivent être implémentés :

- Gestion des erreurs robuste
- Tests unitaires et d'intégration
- Rate limiting
- Filtrage avancé
- Pagination
- Validation des entrées avancé
- Logging et monitoring
- Optimisation des performances avancé
- Configuration de sécurité (CORS, HTTPS, etc.)

## Transparence IA

- **Développement artisanal** : Backend, décisions d'architecture.
- **Développement assisté par LLM** : Frontend.

