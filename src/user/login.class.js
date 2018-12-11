class Login {
    constructor() {
       // Modifier le titre du document HTML
       $(document).attr('title', 'Identification');

       // Modifier le titre de la page
       $('#main-title').html('Identifiez-vous');

        // Définition des attributs
        this.login = $('[name="loginField"]');
        this.password = $('[name="passwordField"]');
       // Définition de listener sur le formulaire
       this.formListener();
       this.submitListener();
    }

    /**formListener Gestionnaire d'évènement sur le formulaire de login
     * @param void
     * @return void
     */

    formListener() {

        let login = this.login;
        let password = this.password;
        
        $('#loginForm').on(
            'keyup',
            // Callback : fonction appelée si l'évènement défini survient
            function(event) {
                // Vérifier le contenu des deux champs
                const login = $('[name="loginField"]');
                const password = $('[name="passwordField"]');

                // Est-ce que les 2 champs sont remplis
                if (
                    login.val() !== '' &&
                    password.val() !== '' &&
                    login.val().length >= 5 ) {
                    // On peut activer le bouton
                    $('#btnLogin').removeAttr('disabled');
                } else {
                    $('#btnLogin').attr('disabled', 'disabled');
                   

                }
            }
        );
    }

    submitListener() {

        let login = this.login;
        let password = this.password;
        
        $('#loginForm').on(
            'submit',
            function(event) {
                event.preventDefault(); // Empêche l'action par défaut...

                // const login = $('[name=loginField]').val();
                // const password = $('[name="passwordField"]').val();

                // Instancie un nouvel utilisateur
                const user = new User();

                // Définit le login et le password de l'utilisateur
                user.setUserName(login.val());
                user.setPassword(password.val());

                
                //  AUTRE METHODE : on peut utiliser directement les $() dans le user.set
                // user.setUserName($('[name=loginField]').val());
                // user.setPassword($('[name="passwordField"]').val());
                // DANS CE CAS, on n'est pas obligé de définir préalablement les constantes : $('[...])
                
                // Gère l'authentification...
                if (user.authenticate()) {
                    console.log('Oki, tu peux y aller');
                } else {
                    console.log('ko, t\'as pas le droit');
                    login.val('');
                    password.val('');

                    $('#btnLogin').attr('disabled', 'disabled');

                    // On peut instancier un toast. On lui assigne des paramètres un peu particulier.
                    const toast = new Toast(
                        {
                            'message' : 'Ce login ou ce mot de passe ne correspon à aucun utilisateur',
                            'duration' : 2,
                            'background' : 'background-color'
                        }
                    );
                    toast.toastIt();
                }
            }
        );
    }


}