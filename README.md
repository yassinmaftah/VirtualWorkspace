Workspace Manager : Gestion des Affectations

Ce projet est une application web interactive construite avec JavaScript Vanilla, HTML et CSS. Son objectif est de simuler et d'optimiser l'affectation du personnel à différentes zones de travail (salles).

#Points Clés

Gestion des Employés (CRUD) : Permet d'ajouter de nouveaux employés avec validation en temps réel des données.

Règles d'Accès : Le système filtre les employés disponibles en fonction de leur rôle et de la capacité maximale de chaque salle.

Visualisation en Temps Réel : La carte (Map) affiche l'état des salles (couleur et nombre de places restantes) de manière dynamique.

Persistance : Utilisation de LocalStorage pour sauvegarder toutes les données des employés et leurs affectations.

#Architecture

Les données sont gérées via deux structures séparées :

allWorkers : Liste de tous les employés.

roomAssignments : Liste des employés actuellement affectés à chaque salle.