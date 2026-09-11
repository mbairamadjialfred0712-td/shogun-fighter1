# SHOGUN FIGHT SPORT CLUB

# SPORT CLUB MANAGER — MASTER PRODUCT BRAIN

## ROLE

Tu es un Lead Product Architect, UX/UI Designer, SaaS Engineer et Business Analyst spécialisé dans les logiciels de gestion métier.

Tu travailles sur SPORT CLUB MANAGER, un logiciel de gestion de salle de sport existant depuis plusieurs années et actuellement utilisé en interne.

MISSION :

Transformer progressivement le logiciel actuel en un SaaS web professionnel, moderne, responsive, sécurisé et évolutif, tout en conservant la logique métier essentielle du logiciel existant.

IMPORTANT :

Ne pas considérer le projet comme une simple application CRUD.

Il s'agit de transformer un logiciel métier existant en véritable produit SaaS.

## OBJECTIF MVP

Créer une première version fonctionnelle permettant à une salle de sport de :

- créer son espace ;

- se connecter ;

- gérer ses membres ;

- créer des abonnements ;

- suivre les dates de début et de fin ;

- enregistrer les paiements ;

- suivre les renouvellements ;

- identifier les abonnements actifs, expirés et bientôt expirés ;

- recevoir/voir des rappels d'expiration ;

- consulter son tableau de bord ;

- rechercher rapidement un membre ;

- consulter l'historique d'un membre ;

- générer/imprimer un reçu professionnel.

## ARCHITECTURE

Préparer dès le départ une architecture compatible SaaS multi-tenant.

Chaque salle de sport doit posséder son propre espace de données.

Structure logique :

Platform

 └── Organization / Gym

      ├── Users

      ├── Members

      ├── Memberships

      ├── Payments

      ├── Activities

      ├── Receipts

      └── Notifications

Ne jamais mélanger les données de deux salles.

Prévoir les rôles :

- Owner

- Admin

- Staff

Le système doit être conçu pour permettre ultérieurement plusieurs salles et plusieurs utilisateurs par salle.

## MODULES MVP

1. Authentification

2. Onboarding de la salle

3. Dashboard

4. Membres

5. Abonnements

6. Paiements

7. Renouvellements

8. Activités

9. Reçus

10. Notifications / rappels

11. Paramètres

## MEMBER

Un membre peut contenir :

- numéro membre

- nom

- prénom

- téléphone

- email

- adresse

- date d'inscription

- photo optionnelle

- statut

- notes

## MEMBERSHIP

Un abonnement contient :

- membre

- activité

- formule

- montant

- date début

- date fin

- statut

- numéro de renouvellement

- date de paiement

Statuts :

ACTIVE

EXPIRING_SOON

EXPIRED

SUSPENDED

CANCELLED

## ACTIVITIES

Prévoir les activités de salle :

- Gym

- Fitness

- Arts martiaux

- Danse

- Aikido

- autres activités personnalisables

L'activité doit être configurable par l'administrateur.

Le logiciel existant montre notamment une logique d'activité, de montant mensuel, de nombre de mois et de montant total.

## DASHBOARD

Le dashboard doit afficher :

- Membres actifs

- Abonnements actifs

- Abonnements expirant bientôt

- Abonnements expirés

- Paiements du jour

- Revenus du mois

- Renouvellements récents

Ajouter une liste :

"Abonnements à renouveler"

avec :

Nom

Téléphone

Activité

Date d'expiration

Jours restants

Action

## ALERTES

Créer une logique de rappel :

- expiration dans 7 jours

- expiration dans 3 jours

- expiration demain

- expiration aujourd'hui

- abonnement expiré

Pour le MVP, commencer par les alertes internes dans l'application.

L'architecture doit permettre ultérieurement :

WhatsApp

SMS

Email

Notifications automatiques

## REÇU

Le système doit pouvoir générer un reçu professionnel contenant :

- logo de la salle

- nom de la salle

- numéro de reçu

- numéro membre

- nom et prénom

- téléphone

- activité

- période d'abonnement

- montant unitaire

- nombre de mois

- montant total

- date

- signature/cachet optionnel

Le reçu actuel constitue une référence fonctionnelle, mais l'interface du nouveau reçu doit être beaucoup plus moderne et professionnelle.

## UX/UI

Style :

Premium

Sport

Modern SaaS

Simple

Rapide

Professionnel

Mobile-first

Éviter :

- interfaces surchargées

- couleurs excessives

- effets inutiles

- dashboards complexes

- animations lourdes

Navigation :

Dashboard

Membres

Abonnements

Paiements

Activités

Reçus

Notifications

Paramètres

Prévoir une sidebar desktop et une navigation adaptée mobile.

## DATABASE

Utiliser une base de données relationnelle.

Tables principales :

organizations

users

members

activities

membership_plans

subscriptions

payments

renewals

receipts

notifications

Toutes les données métier doivent être liées à organization_id.

Implémenter les règles de sécurité au niveau des données.

## BUSINESS RULES

Lorsqu'un abonnement est créé :

1. vérifier le membre ;

2. sélectionner l'activité ;

3. sélectionner la formule ;

4. saisir le montant ;

5. sélectionner la durée ;

6. calculer automatiquement la date de fin ;

7. enregistrer le paiement ;

8. générer le renouvellement ;

9. mettre à jour le statut du membre ;

10. rendre le reçu disponible.

Lorsqu'un abonnement expire :

- passer automatiquement à EXPIRED ;

- afficher une alerte ;

- proposer l'action "Renouveler".

## PRINCIPES DE DÉVELOPPEMENT

Ne jamais casser une fonctionnalité existante pour en ajouter une nouvelle.

Avant chaque modification :

1. analyser l'existant ;

2. identifier les dépendances ;

3. modifier uniquement ce qui est nécessaire ;

4. tester ;

5. vérifier les régressions.

Construire progressivement.

Ne pas créer de fonctionnalités inutiles dans le MVP.

Priorité absolue :

STABILITÉ > DESIGN > FONCTIONNALITÉS SECONDAIRES.

Le produit doit être suffisamment réaliste pour être présenté à un propriétaire de salle de sport comme une vraie solution SaaS.

## VISION FUTURE

Préparer l'architecture pour :

- paiement en ligne

- WhatsApp automatique

- SMS

- QR Code membre

- contrôle d'accès

- application mobile

- gestion des coachs

- cours collectifs

- multi-salles

- analytics avancés

- abonnement SaaS mensuel

- facturation de la salle

- plateforme SaaS publique

Ne développer ces fonctionnalités que lorsque demandé.

## RÈGLE FONDAMENTALE

À chaque étape :

Construire moins, mais construire correctement.

Le MVP doit être démontrable, utilisable et commercialisable.

À partir du MASTER PRODUCT BRAIN fourni précédemment, commence par concevoir l'architecture et l'interface du MVP de SPORT CLUB MANAGER.

NE CONNECTE PAS ENCORE la base de données.

Objectif :

Créer une démonstration visuelle extrêmement professionnelle permettant de présenter le futur SaaS au propriétaire du logiciel.

Construis :

1. Landing / écran de connexion

2. Dashboard

3. Page Membres

4. Page détail membre

5. Page Abonnements

6. Page Paiements

7. Page Activités

8. Page Reçus

9. Page Notifications

10. Page Paramètres

Utilise des données de démonstration réalistes.

Le dashboard doit montrer :

- Membres actifs

- Abonnements actifs

- Expirent bientôt

- Expirés

- Revenus du mois

- Paiements récents

- Liste des abonnements à renouveler

Créer une sidebar professionnelle.

Le design doit être :

Premium SaaS

Sport business

Moderne

Responsive

Rapide

Minimaliste.

Ne développe aucune fonctionnalité non demandée.

Ne connecte aucune API externe.

À la fin, vérifie toutes les routes et interactions de navigation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://shogun-fighter.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d96af84f-8505-4a8d-8cc2-30778c66f780).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
