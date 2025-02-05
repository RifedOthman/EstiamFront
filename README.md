# Projet Angular - EstiamFront

## Description
Ce projet est une application Angular qui implémente les fonctionnalités suivantes :
- Authentification et Autorisation
- Navigation
- Utilisation d'une API externe
- Recherche et Filtrage
- Tests unitaires
- Optimisation des performances
- Gestion des erreurs
- Formulaires et validation
- Opérations CRUD
- Pagination des résultats

**Ce projet utilise un backend Node.js disponible ici : [Estiam API](https://github.com/RifedOthman/API).**

## Installation
1 - Exécutez le backend ( **Veuillez lire la [documentation](https://github.com/RifedOthman/API) )**

2- Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/RifedOthman/EstiamFront.git
cd EstiamFront
npm install
```

## Exécution
Lancez l'application en mode développement :
```sh
ng serve
```
Puis ouvrez votre navigateur à l'adresse : `http://localhost:4200`


## Optimisations
L'application inclut les optimisations suivantes :
- **Lazy loading** : <code>\src\app\app.routes.ts</code>  pour le chargement différé des modules et images . 

- **Préchargement des données** pour améliorer la rapidité  

- **Optimisation des requêtes API** pour réduire les appels inutiles  <code>\src\app\services</code> 

## Gestion des erreurs
L'application gère les erreurs globalement grâce à un intercepteur HTTP et des notifications utilisateur. 
 <code>\src\app\interceptors</code> 

## Authentification et Autorisation. 
<code>\src\app\pages\services\auth.service.ts</code> 
<code>\src\app\pages\services\token.service.ts</code> 

## Recherche & Filtrage (par categorie)
![alt text](<1.gif>)



## Auteur
- **Rifed Othman** 
- **Ghaya Zaabi** 



