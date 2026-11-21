# Pogona Production

Site indépendant de Gabriel Blervaque. La version A « Immersion » conserve la vidéo en lecture libre, le zoom au défilement et la révélation des projets.

## Modifier les contenus

Ouvrir https://app.pagescms.org/ et connecter son compte GitHub au dépôt. La configuration .pages.yml affiche des formulaires pour les textes, médias, projets et réglages visuels. Les changements sont enregistrés dans site.json.

Les médias peuvent être remplacés depuis la médiathèque. La mise en page complète reste dans index.html et styles.css. Les médias initiaux sont à la racine. Les nouveaux fichiers du CMS vont dans media/.

## Prévisualiser

Lancer python3 -m http.server 5190 dans ce dossier, puis ouvrir http://localhost:5190/. Une ouverture directe du fichier HTML ne permet pas de charger site.json.

## Héberger

Site statique sans étape de compilation. Relier le dépôt à un hébergeur statique et publier la racine. Par exemple Cloudflare Pages ou Netlify, dans le compte du propriétaire. Un domaine personnel peut ensuite être relié chez cet hébergeur.

Le dépôt conserve les sources. La connexion à l’éditeur CMS et à l’hébergeur doit être effectuée par son propriétaire. Ne jamais enregistrer de jeton GitHub ou de mot de passe dans les fichiers.

## Propriété

Les photographies, vidéos, textes et l’identité Pogona appartiennent à leur auteur. Ils ne sont pas distribués sous une licence libre. Le logo SVG est composé de tracés issus de la police EB Garamond Bold.
