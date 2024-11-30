// Importation de Netlify CMS
import CMS from 'netlify-cms-app';

// Exemple de widget personnalisé
import MyCustomWidget from './widgets/MyCustomWidget'; // Assurez-vous de créer ce widget si nécessaire

// Enregistrement de widgets personnalisés
CMS.registerWidget('my_custom_widget', MyCustomWidget);

// Personnalisation de l'interface de l'administration
CMS.init = () => {
  // Changer la couleur de fond du panneau d'administration
  document.body.style.backgroundColor = '#f7f7f7';

  // Modifier le texte de l'en-tête de la page
  const header = document.querySelector('h1');
  if (header) {
    header.innerText = 'Bienvenue dans le CMS d\'InnoRex';
  }

  // Ajouter un événement lors de la soumission du formulaire
  document.querySelector('form').addEventListener('submit', function(event) {
    if (!confirm('Êtes-vous sûr de vouloir soumettre ce formulaire ?')) {
      event.preventDefault();  // Annuler la soumission si l'utilisateur n'est pas sûr
    }
  });
};

// Configuration du CMS avec des collections personnalisées
CMS.init({
  config: {
    backend: {
      name: 'git-gateway',  // Backend utilisé (Git Gateway via Netlify)
      branch: 'main',       // La branche principale du repository
    },
    publish_mode: 'editorial_workflow',  // Activer le workflow éditorial
    collections: [
      {
        name: 'pages',          // Nom de la collection (par exemple "pages")
        label: 'Pages',         // Label de la collection qui apparaît dans l'interface CMS
        folder: 'pages',        // Dossier où les fichiers de cette collection seront stockés
        create: true,           // Permet de créer de nouveaux articles de cette collection
        slug: '{{slug}}',       // Modèle d'URL pour les fichiers de cette collection
        fields: [
          {
            label: 'Titre',       // Label pour le champ titre
            name: 'title',        // Nom du champ
            widget: 'string',     // Type de widget (ici un champ texte)
            required: true,       // Champ obligatoire
          },
          {
            label: 'Contenu',     // Label pour le champ contenu
            name: 'body',         // Nom du champ
            widget: 'markdown',   // Widget Markdown pour un champ texte enrichi
          },
          {
            label: 'Image de couverture',   // Champ pour une image
            name: 'cover_image',
            widget: 'image',       // Widget Image pour sélectionner une image
          },
          {
            label: 'Date de publication',
            name: 'date',
            widget: 'datetime',    // Widget Date/Heure pour une date de publication
          },
          {
            label: 'Custom Field',  // Champ personnalisé utilisant un widget custom
            name: 'custom_field',
            widget: 'my_custom_widget',  // Utilisation de notre widget personnalisé
          },
        ],
      },
      {
        name: 'posts',
        label: 'Articles',
        folder: 'posts',
        create: true,
        slug: '{{year}}/{{month}}/{{day}}-{{slug}}',
        fields: [
          {
            label: 'Titre',
            name: 'title',
            widget: 'string',
            required: true,
          },
          {
            label: 'Contenu',
            name: 'body',
            widget: 'markdown',
          },
          {
            label: 'Auteur',
            name: 'author',
            widget: 'string',
          },
          {
            label: 'Image',
            name: 'image',
            widget: 'image',
          },
          {
            label: 'Tags',
            name: 'tags',
            widget: 'list',  // Liste de tags
            field: { widget: 'string' },
          },
        ],
      },
    ],
  },
});

// Fonction d'initialisation de Netlify CMS
CMS.init();
