# API Documentation — Michelin Drop App

Base URL : `https://your-domain.com` (ou `http://localhost:3002` en local)

Toutes les réponses sont en **JSON**. Les routes protégées requièrent un header `Authorization: Bearer <token>`.

---

## Authentification

### POST `/api/auth/login`

Connecte un utilisateur et retourne un token d'accès.

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "email": "user@example.com",
  "password": "monmotdepasse"
}
```

**Réponse 200**

```json
{
  "token": "oat_MQ.eXg3WF...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "developer"
  }
}
```

**Réponse 400** — Validation échouée (email invalide, mot de passe trop court)

```json
{
  "errors": [{ "message": "The email field must be a valid email address", "field": "email" }]
}
```

**Réponse 400** — Identifiants incorrects

```json
{
  "message": "Invalid credentials"
}
```

> **Flutter** : stocke `token` dans `flutter_secure_storage` et injecte-le dans chaque requête suivante via le header `Authorization`.

---

### DELETE `/api/auth/logout` 🔒

Invalide le token courant.

**Headers**

```
Authorization: Bearer <token>
```

**Réponse 200**

```json
{
  "message": "Logged out"
}
```

---

## Drops

### GET `/api/drops/:dropId/context` 🔒

Retourne les informations générales d'un drop et indique si l'utilisateur connecté y est éligible.

**Headers**

```
Authorization: Bearer <token>
```

**Paramètres URL**
| Paramètre | Type | Description |
|-----------|--------|--------------------------|
| `dropId` | string | Slug unique du drop |

**Drops disponibles (mockup)**
| dropId | Titre |
|-------------------|-----------------|
| `drop-gravel-02` | Gravel Edition |
| `drop-route-01` | Route Classic |
| `drop-urbain-03` | Urbain Commuter |

**Réponse 200**

```json
{
  "dropId": "drop-gravel-02",
  "title": "Gravel Edition",
  "expiresAt": "2026-06-19T12:00:00.000+00:00",
  "isEligible": true
}
```

| Champ        | Type    | Description                                                                         |
| ------------ | ------- | ----------------------------------------------------------------------------------- |
| `dropId`     | string  | Identifiant du drop                                                                 |
| `title`      | string  | Nom affiché du drop                                                                 |
| `expiresAt`  | string  | Date/heure d'expiration en ISO 8601 UTC — utilise ce champ pour le compte à rebours |
| `isEligible` | boolean | `true` si l'utilisateur connecté peut accéder à ce drop                             |

**Réponse 404**

```json
{ "message": "Drop not found" }
```

> **Flutter** : parse `expiresAt` avec `DateTime.parse(expiresAt).toLocal()` pour afficher le compte à rebours en heure locale.

---

### GET `/api/drops/:dropId/packs` 🔒

Retourne la liste des packs disponibles pour un drop, avec leurs technologies et l'état du stock.

**Headers**

```
Authorization: Bearer <token>
```

**Paramètres URL**
| Paramètre | Type | Description |
|-----------|--------|---------------------|
| `dropId` | string | Slug unique du drop |

**Query params (optionnel)**
| Paramètre | Type | Valeurs possibles | Description |
|------------|--------|--------------------------------|---------------------------|
| `category` | string | `GRAVEL`, `ROUTE`, `URBAIN` | Filtre par catégorie |

**Exemple**

```
GET /api/drops/drop-gravel-02/packs?category=GRAVEL
```

**Réponse 200**

```json
[
  {
    "id": "pack-gravel-premium",
    "category": "GRAVEL",
    "name": "POWER GRAVEL",
    "subtitle": "Pack Gravel – 2 pneus + chambre à air + casquette",
    "imageUrl": "https://images.michelin.com/tires/power-gravel.jpg",
    "price": 94.0,
    "originalPrice": 142.0,
    "discountPercentage": 34,
    "stock": {
      "totalInitial": 500,
      "remainingPercentage": 33
    },
    "technologies": [
      { "icon": "bolt", "label": "Résistance au roulement", "value": "Ultra-Low (3 sur 5)" },
      { "icon": "shield", "label": "Protection", "value": "ProTek+ 5 mm" },
      { "icon": "straighten", "label": "Dimension", "value": "700x40c / 650b-47" }
    ],
    "description": "Conçu pour les terrains mixtes..."
  }
]
```

**Description des champs**
| Champ | Type | Description |
|------------------------------|---------|-------------------------------------------------------------------|
| `id` | string | Identifiant du pack — utilise-le pour récupérer les avis |
| `price` | number | Prix après remise (€) |
| `originalPrice` | number | Prix barré (€) |
| `discountPercentage` | number | Pourcentage de réduction |
| `stock.totalInitial` | number | Stock de départ |
| `stock.remainingPercentage` | number | Pourcentage restant — utilise-le pour la barre de progression |
| `technologies[].icon` | string | Nom d'icône Material (`bolt`, `shield`, `straighten`) |

**Réponse 404**

```json
{ "message": "Drop not found" }
```

---

## Produits

### GET `/api/products/:productId/reviews` 🔒

Retourne la note globale et les derniers avis clients pour un pack.

**Headers**

```
Authorization: Bearer <token>
```

**Paramètres URL**
| Paramètre | Type | Description |
|-------------|--------|-----------------------------------------------------|
| `productId` | string | Correspond au champ `id` retourné par `/packs` |

**Exemple**

```
GET /api/products/pack-gravel-premium/reviews
```

**Réponse 200**

```json
{
  "averageRating": 4.8,
  "totalReviews": 5,
  "reviews": [
    {
      "author": "Léa F.",
      "initial": "L",
      "text": "Adhérence sur gravier mouillé absolument remarquable."
    },
    {
      "author": "Marc D.",
      "initial": "M",
      "text": "J'ai gagné 12 watts sur mon parcours habituel."
    }
  ]
}
```

| Champ           | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| `averageRating` | number | Note moyenne sur 5 (arrondie à 1 décimale) |
| `totalReviews`  | number | Nombre total d'avis                        |
| `reviews`       | array  | Les 10 derniers avis                       |
| `initial`       | string | Initiale de l'auteur pour l'avatar         |

**Réponse 404**

```json
{ "message": "Product not found" }
```

---

## Gestion des erreurs

| Code HTTP | Signification                                                      |
| --------- | ------------------------------------------------------------------ |
| `200`     | Succès                                                             |
| `400`     | Données invalides (validation) ou identifiants incorrects          |
| `401`     | Token absent, expiré ou invalide — rediriger vers l'écran de login |
| `404`     | Ressource introuvable                                              |
| `500`     | Erreur serveur                                                     |

---

## Flux Flutter recommandé

```
1. POST /api/auth/login
        ↓
   Stocker le token (flutter_secure_storage)
        ↓
2. GET /api/drops/:dropId/context
        ↓
   Afficher le titre + compte à rebours (expiresAt)
   Si isEligible = false → afficher écran "non éligible"
        ↓
3. GET /api/drops/:dropId/packs?category=GRAVEL
        ↓
   Afficher le catalogue (tabs Route / Gravel / Urbain)
        ↓
4. GET /api/products/:productId/reviews
        ↓
   Afficher la note + avis sur la fiche produit
        ↓
5. DELETE /api/auth/logout
        ↓
   Supprimer le token stocké → écran de login
```

---

## Données de test (mockup)

**Comptes disponibles**

| Email                | Mot de passe | Rôle       |
| -------------------- | ------------ | ---------- |
| `admin@schoolhub.io` | `demo-admin` | superadmin |
| `user@schoolhub.io`  | `demo-user`  | developer  |

**Éligibilités**

Les deux comptes sont éligibles aux drops `drop-gravel-02` et `drop-route-01`.
Le drop `drop-urbain-03` retournera `isEligible: false`.

**IDs de packs pour les avis**

| productId               | Drop associé     | Catégorie |
| ----------------------- | ---------------- | --------- |
| `pack-gravel-premium`   | `drop-gravel-02` | GRAVEL    |
| `pack-gravel-essential` | `drop-gravel-02` | GRAVEL    |
| `pack-route-premium`    | `drop-route-01`  | ROUTE     |
| `pack-urbain-premium`   | `drop-urbain-03` | URBAIN    |
