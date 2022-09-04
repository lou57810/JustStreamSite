#titre JustStreamIt

##titre Pré-requis

### Mise en place
1. Créer un repertoire de travail: ``` $ mkdir JustStreamIt ```
2. Créer et activer un environnement virtuel: 
	* Windows (nécessite l'installation de git bash):  ``` $ python -m venv env ```
		   					  > ``` $ source env/scripts/activate ```
	* Linux, Mac: ``` $ python3 -m venv env ```
		      ``` $ source env/bin/activate ```
3. Installer les dépendances:
	* ``` $ pip install -r requirements.txt ```
4. Cloner le dépôt avec Git:
	* ``` $ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git ```
5. Se placer depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande: ``` $ cd OCMovies-API-EN-FR ```

6. Créer et alimenter la base de données:
	* ``` $ python manage.py create_db ```
7. Démarrer le serveur avec la commande:
	* ``` $ python manage.py runserver ```
8. A l'aide de votre navigateur, depuis le répertoire parent(JustStreamIt), ouvrir le fichier:
	* ``` index.html ```  