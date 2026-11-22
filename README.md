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

## Studio visuel

Ouvrir `studio.html` pour modifier une composition par glisser-déposer : blocs, images, vidéo, typographie, couleurs, tailles, espacements et liens. Les pages sont enregistrées en projet GrapesJS ; un brouillon local est aussi gardé dans le navigateur. `admin.html` redirige vers ce studio.

La publication utilise l’API GitHub : créer un jeton limité à ce dépôt avec la permission `Contents: Read and write`, puis le saisir dans le Studio et cliquer sur Publier. Le jeton reste en mémoire de l’onglet et n’est pas mis dans les fichiers. Les médias peuvent être envoyés depuis le Studio, jusqu’à 20 Mo. Pour des vidéos plus lourdes, utiliser une URL externe ou ajouter le fichier au dépôt par un autre moyen.

Le Studio est accessible en lecture par toute personne connaissant son URL car GitHub Pages héberge un site public. Seul le propriétaire disposant d’un jeton valable peut publier. Ne jamais insérer de jeton dans un bloc, un lien ou un texte de page.
