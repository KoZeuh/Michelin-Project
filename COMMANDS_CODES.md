# Mode interactif — menu pour choisir le pack
node ace pack:generate-code user@example.com

# Avec pack précisé directement
node ace pack:generate-code user@example.com --pack=pack-gravel-premium

# Avec durée personnalisée (défaut : 2 jours)
node ace pack:generate-code user@example.com --pack=pack-route-premium --days=7
Ce que fait la commande :

Cherche l'utilisateur par email, erreur propre si introuvable
Affiche un menu de sélection du pack si --pack n'est pas fourni
Génère un code MICH-XXXXXX unique garanti
Insère en base et affiche un récapitulatif dans un encadré