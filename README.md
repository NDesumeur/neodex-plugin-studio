# Studio de plugins

Crée tes petites applis sans écrire de code : tu choisis un modèle, tu remplis un formulaire, et l'appli fonctionne tout de suite. Chaque création peut s'épingler en widget sur l'accueil de NeoDex, envoyer un rappel chaque jour et se partager par un code.

*English version: [README.en.md](README.en.md)*

## Appli à blocs et vrais plugins (nouveau en 3.0.0)

Un douzième modèle pour faire ton appli : écrans, boutons, listes, variables et blocs d'actions (si … alors, aller à l'écran…). Chaque création devient un vrai plugin .zip à installer dans NeoStore.

## Créer

**+ Nouveau**, puis choisis un modèle. Le formulaire est à côté de l'aperçu, qui se met à jour à chaque lettre tapée. Chaque création a son titre et sa couleur, et se retrouve dans **Mes créations**.

## Les douze modèles

- **Fiches de révision** : une fiche par ligne, « recto | verso ». On voit le recto, **Voir la réponse**, puis **Je savais** ou **À revoir**. C'est le système des boîtes de Leitner : une fiche sue revient 2, 4, 8, 16… jours plus tard (64 jours au plus) ; une fiche ratée revient le jour même et retourne au début. **Tout revoir quand même** lance une révision libre de toutes les fiches.
- **Routine du jour** : une tâche par ligne. La liste se décoche toute seule chaque matin ; la série compte les jours où tout a été coché.
- **Minuteur d'étapes** : des étapes avec leur durée (travail, pause…) et un nombre de tours. Les étapes s'enchaînent avec un bip ; on voit l'étape en cours, le temps restant et la suivante. **Pause**, **Passer**, **Recommencer** ; les séances finies sont comptées.
- **Suivi chiffré** : une valeur par jour (sommeil, poids, pas…) avec son unité. Une courbe des derniers jours, la dernière valeur, la moyenne sur 7 jours et une ligne d'objectif si tu en fixes un.
- **Tirage au sort** : un choix par ligne, une roue qui tourne et s'arrête sur l'un d'eux, avec les 10 derniers tirages. En option, un choix tiré est retiré de la roue (**Remettre tous les choix** les replace).
- **Comptes à rebours** : des événements avec leur date ; les jours qui restent avant chacun. Un anniversaire peut revenir chaque année.
- **Jeu de quiz** : des questions à choix multiples (au moins deux réponses), la bonne réponse montrée en cas d'erreur, un score et un meilleur score.
- **Compteur** : des compteurs avec **+** et **−**, un pas et un objectif avec une barre de progression.
- **Suivi d'habitudes** : une habitude par ligne, les 7 derniers jours en cases à cocher et la série de chacune.
- **Liste à cocher** : une liste qui garde ce que tu as coché (courses, valise, choses à faire), avec **Tout décocher**.
- **Page de liens** : une grille de boutons vers tes sites préférés.

## Appli à blocs et vrais plugins (3.0.0)

- **Appli à blocs** : le douzième modèle, pour faire ton appli à toi. Des **variables** gardent les données (nombre, texte ou liste). L'appli a des **écrans** (avec des onglets en haut si tu veux) ; chaque écran aligne des composants : titre, texte, grand nombre, bouton, champ à remplir, case à cocher, liste (avec cases à cocher), image, trait. Écris `{variable}` dans un texte pour afficher sa valeur, `{liste taille}` pour le nombre d'éléments.
- Chaque **bouton** reçoit des **blocs** de couleur, lancés dans l'ordre : aller à un écran, ajouter à une variable, mettre une variable à une valeur, nombre au hasard, ajouter à une liste, vider une liste, **si … alors** (avec ses propres blocs), afficher un message, jouer un bip, ouvrir un site.
- **⇩ VRAI PLUGIN**, sur n'importe quelle création : fabrique un plugin NeoDex complet (.zip avec plugin.json, code, README et icône). Installe-le avec **NeoStore → Installés → INSTALLER UN FICHIER .ZIP…** (NeoDex 3.4.2 ou plus) : il a son onglet, son icône et ses données, sans le Studio. Il n'est pas vérifié par NeoDex, donc il passe l'antivirus et reste dans le bac à sable. Pour le publier, mets les fichiers dans un dépôt GitHub avec le sujet « neodex-plugin ».

## Pour chaque création

- 📌 **Épingler** : son résumé apparaît dans un widget de l'accueil de NeoDex (par exemple « 3 fiche(s) à réviser » ou tes compteurs). Une seule création est épinglée à la fois.
- **Rappel chaque jour** à l'heure choisie : une notification de NeoDex, envoyée même si l'onglet du studio est fermé.
- ⇪ **Partager** : un code à envoyer à un ami. Il le colle dans son studio (**+ Nouveau → Importer un partage**) et reçoit la création, sans tes scores, tes séries ni tes valeurs.
- ⧉ **Dupliquer** et ✕ **Supprimer**.

## Données et synchronisation

Tes créations, leurs scores, séries et valeurs sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Studio de plugins → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
