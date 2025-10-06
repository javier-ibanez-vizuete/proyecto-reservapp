import { createContext, useState } from "react";

const TEXTS = {
    en: {
        // BARRA DE NAVIGATION
        userReplaceName: "User",
        toastLogoutError: "Logout failed.",

        bookingPageNavLabel: "BOOKINGS",
        ordersPageNavLabel: "ORDERS",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "TROLLY",

        lodingTextLogoutUser: "Closing Profile...",
        logoutButton: "Logout",
        loadingTextLogoutButton: "Logging out...",
        loginButton: "Log In",
        registerButton: "Register",

        toastErrorLogout: "Logout failed",

        profilePageButton: "Profile",

        // LOGIN PAGE
        h1LoginPage: "Log In",

        toastLoginError: "Login failed",
        loadingLoginButtonText: "Logging in...",

        // REGISTER PAGE
        h1RegisterPage: "Join Us",

        registerButtonText: "Sign Up",
        loadingRegisterButtonText: "Signing up...",

        namePlaceholderFieldText: "Enter your name",
        emailPlaceholderFieldText: "Enter your email",
        addressPlaceholderFieldText: "Delivery address",
        passwordPlaceholderFieldText: "Enter your password",
        confirmPasswordPlaceholderFieldText: "Re-enter your password",

        toastRegisterError: "Registration failed",

        // HOME PAGE
        toastWelcomeRegister: "Welcome",
        toastLoginSuccess: "Logged In successfully ✔",
        toastLogoutSuccess: "Logged out Successfully ✔",

        h1HomePage: "Home Page",

        // MENUPAGE
        fetchMessageError: "Error loading Products. Try Again.",
        allCategoriesFilter: "All Categories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Refreshing Products...",
        textRefreshProductsButton: "Refresh",
        clearFilterButton: "Clear Filter",

        // BOOKING PAGE
        h1BookingPage: "BOOKING",

        confirmBookingTitle: "Review and Confirm",
        userNameConfirmText: "Reservation Name",
        dateConfirmText: "Date",
        timeConfirmText: "Time",
        customersConfirmText: "Customers",
        highChairConfirmText: "High Chair?",
        aditionalMessageConfirmText: "Additional Message",
        confirmButtonModal: "Confirm",
        loadingTextConfirmButtonModal: "Booking...",

        bookingTimeText: "Time",
        bookingTimePlaceholder: "Select Time",
        bookingCustomersText: "Customers",
        bookingCustomersPlaceholder: "Select Customers",

        bookingHighChairTitle: "Add High Chair",
        bookingHighChairDescription: "Free of charge",

        bookingAditionalMessagePlaceholder: "Any special requests?",

        bookingMaxCapacityTableTitle: "Max. Capacity:",
        bookingTableTypeTitle: "Table Type:",

        squareTableForm: "Square Table",
        roundTableForm: "Round Table",
        rectangularTableForm: "Rectangular Table",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Select Table",

        toastBookingSuccess: "Booking Completed",
        toastBookingUnavailable: "Booking Failed: This table is already reserved.",
        toastBookingError: "Booking Failed. Try Again",

        // ORDERS PAGE
        h1OrdersPage: "DELIVERY",
        smallOrdersPageSubtitle: "Enjoy our menu from the comfort of home.",

        addProductToCartButton: "Add to Cart",
        removeProductToCartButton: "Remove from Cart",
        loadingTextAddingProductsToCartButton: "Adding...",
        loadingTextRemovingProductsFromCartButton: "Removing...",
        addOneMoreProductToCartButton: "Add one",
        removeOneMoreProductFromCartButton: "Remove one",

        toastAddedProductToCart: "Added ✔",
        toastQuantityProductUpdatedToCart: "Cart updated successfully ✔",
        toastRemovedProductFromCart: "Item removed from cart ✔",
        toastErrorAddingProductToCart: "Error: Could not add to cart",
        toastErrorQuantityProductUpdatedToCart: "Error: Quantity update failed",
        toastErrorRemovingProductFromCart: "Error: Could not remove item from cart",

        // CART PAGE
        h1CartPage: "YOUR CART",
        confirmModalCartTitle: "Order Confirmation",
        confirmModalCartMessage: "You're almost done! Confirm your order to continue",

        confirmButtonCartModal: "Confirm",
        loadingConfirmButtonCartModal: "Processing...",
        cancelButtonCartModal: "Back",

        accordionQtyText: "Qty:",
        accordionDescriptionText: "Description:",
        accordionPriceText: "Price:",

        noProductsTitle: "Your Cart is empty",
        goToOrdersCartButton: "Order Now",

        toastCartRemovedSuccess: "Cart cleared ✔",
        toastCartRemovedError: "Failed to remove all items",

        // PROFILE PAGE
        h1ProfilePage: "Welcome, ",
        userDataSectionTitle: "Personal Information",
        bookingsDataSectionTitle: "Your Reservations",
        ordersDataSectionTitle: "Your Orders",

        buttonChangeAvatar: "Change Avatar",

        //  ----- USER DATA
        nameFieldText: "Name",
        fullNameFieldText: "Full Name",
        emailFieldText: "Email",
        addressFieldText: "Address",
        passwordFieldText: "Password",
        confirmPasswordFieldText: "Confirm Password",
        userDataModalTitle: "Confirm Data Change",
        userDataModalMessage: "Confirm change: ",
        userDataModalMessageNexo: "to",
        userDataModalConfirmText: "Change",
        loadingUserDataModalConfirmText: "Changing...",
        userDataModalCancelText: "Cancel",

        userDataEditButtonText: "Edit",
        userDataChangeButtonText: "Change",

        toastUserDataChangeSuccess: "Profile updated successfully ✔",
        toastUserDataChangeError: "Error updating profile",

        //  ------ BOOKING DATA
        bookingDataTitle1: "Your next bookings",
        bookingDataTitle2: "Your past visits",
        bookingDataNoPendingBookingsFound: "You have no pending bookings.",
        bookingDataNoPastVisitsFound: "You have no past visits",

        buttonBookingDataMakeABook: "Book now",
        buttonBookingDataCloseModalInfo: "Close",
        buttonBookingDataCancelReservation: "Cancel reservation",

        bookingDataModalDeletingTitle: "Delete Reservation",
        bookingDataModalDeletingbutton: "Delete",
        loadingBookingDataModalDeletingbutton: "Deleting...",

        bookingDataModalInfotitle: "Reservation details",
        bookingDataModalInfoMessageText1: "Delete your Reservation for ",
        bookingDataModalInfoMessageCustomer1: "Customer",
        bookingDataModalInfoMessageCustomer2: "Customers",

        bookingDataModalInfoDateText: "Reservation date:",
        bookingDataModalInfoTimeText: "Reservation time:",
        bookingDataModalInfoPartySizeText: "Party size:",
        bookingDataModalInfoHighChairText: "High chair needed?",

        toastBookingDataDeltingBookingError: "Error deleting reservation",

        // Footer
        copyrightText: "ReservApp. All Rights reserved",

        // Mensajes Generales
        affirmationText: "Yes",
        NegationText: "No",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "Email Field is Required",
        emailNotValidField1: "Email not Valid ('@' missing)",
        emailNotValidField2: "Email not Valid ('.' missing)",
        emailTooShortField: "Email too Short (min. 5 Characters)",
        emailTooLongField: "Email too Long (max. 50 Characters)",

        passwordIsRequiredField: "Password Field is Required",
        passwordTooShortField: "Password is too Short (min. 9 Characters)",
        passwordTooLongField: "Password too Long (max. 30 Characters)",

        confirmPasswordIsRequiredField: "Confirm Password Field is Required",
        doNotMatchPasswordsFields: "Passwords do not match",

        nameIsRequiredField: "Name Field is Required",
        nameIsTooShortField: "Name too Short (min. 4 Characters)",
        nameIsTooLongField: "Name too Long (max. 30 Characters)",

        addressIsRequiredField: "Address Field is Required",
        addressTooShortField: "Address too Short (min. 6 Characters)",
        addressTooLongField: "Address too Long (max. 60 Characters)",

        bookingDateIsRequiredField: "You must to chose a Booking Date",
        bookingTimeIsRequiredField: "Time Field is Required",
        bookingCustomersIsRequiredField: "Customer Field is Required",
        bookingTableIsRequiredField: "You must chose a Table",

        profileNameNotEmptyField: "Name field shouldn't be empty",
        profileEmailNotEmptyField: "Email Shouldn't be empty",
        profileAddressNotEmptyField: "Address Shouldn't be empty",
    },

    es: {
        // BARRA DE NAVIGATION
        userReplaceName: "Usuario",
        toastLogoutError: "¡Ups! Algo salió mal.",

        bookingPageNavLabel: "RESERVAS",
        ordersPageNavLabel: "PEDIDOS",
        menusPageNavLabel: "CARTA",
        cartPageNavLabel: "CARRITO",

        lodingTextLogoutUser: "Cerrando perfil...",
        logoutButton: "Cerrar sesión",
        loadingTextLogoutButton: "Cerrando sesión...",
        loginButton: "Iniciar sesión",
        registerButton: "Registrarse",

        toastErrorLogout: "Error al cerrar sesión",

        profilePageButton: "Perfil",

        // HOME PAGE
        toastWelcomeRegister: "Bienvenido",
        toastLoginSuccess: "Inicio de sesión exitoso ✔",
        toastLogoutSuccess: "Cierre de sesión completado ✔",

        h1HomePage: "Página principal",

        // MENUPAGE
        fetchMessageError: "Error al cargar los productos. Inténtalo de nuevo.",
        allCategoriesFilter: "Todas las categorías",
        h1MenuPage: "CARTA",

        loadingTextRefreshProductsButton: "Actualizando productos...",
        textRefreshProductsButton: "Actualizar",
        clearFilterButton: "Borrar filtro",

        // BOOKING PAGE
        h1BookingPage: "RESERVA",

        confirmBookingTitle: "Revisar y confirmar",
        userNameConfirmText: "Nombre de la reserva",
        dateConfirmText: "Fecha",
        timeConfirmText: "Hora",
        customersConfirmText: "Comensales",
        highChairConfirmText: "¿Trona?",
        aditionalMessageConfirmText: "Mensaje adicional",
        confirmButtonModal: "Confirmar",
        loadingTextConfirmButtonModal: "Reservando...",

        bookingTimeText: "Hora",
        bookingTimePlaceholder: "Selecciona hora",
        bookingCustomersText: "Comensales",
        bookingCustomersPlaceholder: "Selecciona número de comensales",

        bookingHighChairTitle: "Añadir trona",
        bookingHighChairDescription: "Sin coste adicional",

        bookingAditionalMessagePlaceholder: "¿Alguna petición especial?",

        bookingMaxCapacityTableTitle: "Capacidad máx.:",
        bookingTableTypeTitle: "Tipo de mesa:",

        squareTableForm: "Mesa cuadrada",
        roundTableForm: "Mesa redonda",
        rectangularTableForm: "Mesa rectangular",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Seleccionar mesa",

        toastBookingSuccess: "Reserva completada",
        toastBookingUnavailable: "Error al reservar: esta mesa ya está reservada.",
        toastBookingError: "Error en la reserva. Inténtalo de nuevo",

        // ORDERS PAGE
        h1OrdersPage: "PEDIDOS",
        smallOrdersPageSubtitle: "Disfruta de nuestro menú desde la comodidad de tu hogar.",

        addProductToCartButton: "Añadir al carrito",
        removeProductToCartButton: "Quitar del carrito",
        loadingTextAddingProductsToCartButton: "Añadiendo...",
        loadingTextRemovingProductsFromCartButton: "Quitando...",
        addOneMoreProductToCartButton: "Añadir uno",
        removeOneMoreProductFromCartButton: "Quitar uno",

        toastAddedProductToCart: "Añadido ✔",
        toastQuantityProductUpdatedToCart: "Carrito actualizado ✔",
        toastRemovedProductFromCart: "Elemento eliminado del carrito ✔",
        toastErrorAddingProductToCart: "Error: no se pudo añadir al carrito",
        toastErrorQuantityProductUpdatedToCart: "Error: actualización de cantidad fallida",
        toastErrorRemovingProductFromCart: "Error: no se pudo eliminar el elemento",

        // CART PAGE
        h1CartPage: "TU CARRITO",
        confirmModalCartTitle: "Confirmación de pedido",
        confirmModalCartMessage: "¡Casi terminado! Confirma tu pedido para continuar",

        confirmButtonCartModal: "Confirmar",
        loadingConfirmButtonCartModal: "Procesando...",
        cancelButtonCartModal: "Volver",

        accordionQtyText: "Cant:",
        accordionDescriptionText: "Descripción:",
        accordionPriceText: "Precio:",

        noProductsTitle: "Tu carrito está vacío",
        goToOrdersCartButton: "Pedir ahora",

        toastCartRemovedSuccess: "Carrito vaciado ✔",
        toastCartRemovedError: "Error al eliminar todos los elementos",

        // PROFILE PAGE
        h1ProfilePage: "Bienvenido, ",
        userDataSectionTitle: "Información personal",
        bookingsDataSectionTitle: "Tus reservas",
        ordersDataSectionTitle: "Tus pedidos",

        buttonChangeAvatar: "Cambiar avatar",

        //  ----- USER DATA
        nameFieldText: "Nombre",
        emailFieldText: "Correo electrónico",
        addressFieldText: "Dirección",
        userDataModalTitle: "Confirmar cambio de datos",
        userDataModalMessage: "Confirmar cambio: ",
        userDataModalMessageNexo: "a",
        userDataModalConfirmText: "Cambiar",
        loadingUserDataModalConfirmText: "Cambiando...",
        userDataModalCancelText: "Cancelar",

        toastUserDataChangeSuccess: "Perfil actualizado con éxito ✔",
        toastUserDataChangeError: "Error al actualizar el perfil",

        // Footer
        copyrightText: "ReservApp. Todos los derechos reservados",

        // Mensajes Generales
        affirmationText: "Sí",
        NegationText: "No",
    },

    fr: {
        // BARRA DE NAVIGATION
        userReplaceName: "Utilisateur",
        toastLogoutError: "Oups ! Une erreur est survenue.",

        bookingPageNavLabel: "RÉSERVATIONS",
        ordersPageNavLabel: "COMMANDES",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "PANIER",

        lodingTextLogoutUser: "Fermeture du profil...",
        logoutButton: "Se déconnecter",
        loadingTextLogoutButton: "Déconnexion...",
        loginButton: "Se connecter",
        registerButton: "S'inscrire",

        toastErrorLogout: "Échec de la déconnexion",

        profilePageButton: "Profil",

        // HOME PAGE
        toastWelcomeRegister: "Bienvenue",
        toastLoginSuccess: "Connexion réussie ✔",
        toastLogoutSuccess: "Déconnexion terminée ✔",

        h1HomePage: "Page d'accueil",

        // MENUPAGE
        fetchMessageError: "Erreur lors du chargement des produits. Réessayez.",
        allCategoriesFilter: "Toutes les catégories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Actualisation des produits...",
        textRefreshProductsButton: "Rafraîchir",
        clearFilterButton: "Effacer le filtre",

        // BOOKING PAGE
        h1BookingPage: "RÉSERVATION",

        confirmBookingTitle: "Vérifier et confirmer",
        userNameConfirmText: "Nom de la réservation",
        dateConfirmText: "Date",
        timeConfirmText: "Heure",
        customersConfirmText: "Personnes",
        highChairConfirmText: "Chaise bébé ?",
        aditionalMessageConfirmText: "Message additionnel",
        confirmButtonModal: "Confirmer",
        loadingTextConfirmButtonModal: "Réservation...",

        bookingTimeText: "Heure",
        bookingTimePlaceholder: "Sélectionner l'heure",
        bookingCustomersText: "Personnes",
        bookingCustomersPlaceholder: "Sélectionner le nombre",

        bookingHighChairTitle: "Ajouter chaise bébé",
        bookingHighChairDescription: "Sans frais supplémentaires",

        bookingAditionalMessagePlaceholder: "Des demandes particulières ?",

        bookingMaxCapacityTableTitle: "Capacité max :",
        bookingTableTypeTitle: "Type de table :",

        squareTableForm: "Table carrée",
        roundTableForm: "Table ronde",
        rectangularTableForm: "Table rectangulaire",

        bookingTableWifiText: "Wifi :",

        bookingSelectTableButton: "Sélectionner la table",

        toastBookingSuccess: "Réservation effectuée",
        toastBookingUnavailable: "Échec de la réservation : cette table est déjà réservée.",
        toastBookingError: "Échec de la réservation. Réessayez",

        // ORDERS PAGE
        h1OrdersPage: "LIVRAISON",
        smallOrdersPageSubtitle: "Profitez de notre menu depuis le confort de votre maison.",

        addProductToCartButton: "Ajouter au panier",
        removeProductToCartButton: "Retirer du panier",
        loadingTextAddingProductsToCartButton: "Ajout...",
        loadingTextRemovingProductsFromCartButton: "Suppression...",
        addOneMoreProductToCartButton: "Ajouter un",
        removeOneMoreProductFromCartButton: "Retirer un",

        toastAddedProductToCart: "Ajouté ✔",
        toastQuantityProductUpdatedToCart: "Panier mis à jour ✔",
        toastRemovedProductFromCart: "Élément supprimé ✔",
        toastErrorAddingProductToCart: "Erreur : impossible d'ajouter au panier",
        toastErrorQuantityProductUpdatedToCart: "Erreur : mise à jour de la quantité échouée",
        toastErrorRemovingProductFromCart: "Erreur : impossible de supprimer l'élément",

        // CART PAGE
        h1CartPage: "VOTRE PANIER",
        confirmModalCartTitle: "Confirmation de commande",
        confirmModalCartMessage: "Vous y êtes presque ! Confirmez votre commande pour continuer",

        confirmButtonCartModal: "Confirmer",
        loadingConfirmButtonCartModal: "Traitement...",
        cancelButtonCartModal: "Retour",

        accordionQtyText: "Qté :",
        accordionDescriptionText: "Description :",
        accordionPriceText: "Prix :",

        noProductsTitle: "Votre panier est vide",
        goToOrdersCartButton: "Commander maintenant",

        toastCartRemovedSuccess: "Panier vidé ✔",
        toastCartRemovedError: "Échec de la suppression de tous les éléments",

        // PROFILE PAGE
        h1ProfilePage: "Bienvenue, ",
        userDataSectionTitle: "Informations personnelles",
        bookingsDataSectionTitle: "Vos réservations",
        ordersDataSectionTitle: "Vos commandes",

        buttonChangeAvatar: "Changer l'avatar",

        //  ----- USER DATA
        nameFieldText: "Nom",
        emailFieldText: "Email",
        addressFieldText: "Adresse",
        userDataModalTitle: "Confirmer le changement de données",
        userDataModalMessage: "Confirmer le changement : ",
        userDataModalMessageNexo: "en",
        userDataModalConfirmText: "Changer",
        loadingUserDataModalConfirmText: "Changement...",
        userDataModalCancelText: "Annuler",

        toastUserDataChangeSuccess: "Profil mis à jour avec succès ✔",
        toastUserDataChangeError: "Erreur lors de la mise à jour du profil",

        // Footer
        copyrightText: "ReservApp. Tous droits réservés",

        // Mensajes Generales
        affirmationText: "Oui",
        NegationText: "Non",
    },

    it: {
        // BARRA DE NAVIGATION
        userReplaceName: "Utente",
        toastLogoutError: "Ops! Qualcosa è andato storto.",

        bookingPageNavLabel: "PRENOTAZIONI",
        ordersPageNavLabel: "ORDINI",
        menusPageNavLabel: "MENÙ",
        cartPageNavLabel: "CARRELLO",

        lodingTextLogoutUser: "Chiusura profilo...",
        logoutButton: "Disconnettersi",
        loadingTextLogoutButton: "Disconnessione...",
        loginButton: "Accedi",
        registerButton: "Registrati",

        toastErrorLogout: "Disconnessione fallita",

        profilePageButton: "Profilo",

        // HOME PAGE
        toastWelcomeRegister: "Benvenuto",
        toastLoginSuccess: "Accesso riuscito ✔",
        toastLogoutSuccess: "Disconnessione completata ✔",

        h1HomePage: "Pagina iniziale",

        // MENUPAGE
        fetchMessageError: "Errore nel caricamento dei prodotti. Riprova.",
        allCategoriesFilter: "Tutte le categorie",
        h1MenuPage: "MENÙ",

        loadingTextRefreshProductsButton: "Aggiornamento prodotti...",
        textRefreshProductsButton: "Aggiorna",
        clearFilterButton: "Cancella filtro",

        // BOOKING PAGE
        h1BookingPage: "PRENOTAZIONE",

        confirmBookingTitle: "Rivedi e conferma",
        userNameConfirmText: "Nome della prenotazione",
        dateConfirmText: "Data",
        timeConfirmText: "Ora",
        customersConfirmText: "Coperti",
        highChairConfirmText: "Seggiolone?",
        aditionalMessageConfirmText: "Messaggio aggiuntivo",
        confirmButtonModal: "Conferma",
        loadingTextConfirmButtonModal: "Prenotazione...",

        bookingTimeText: "Ora",
        bookingTimePlaceholder: "Seleziona l'ora",
        bookingCustomersText: "Coperti",
        bookingCustomersPlaceholder: "Seleziona il numero",

        bookingHighChairTitle: "Aggiungi seggiolone",
        bookingHighChairDescription: "Senza costi aggiuntivi",

        bookingAditionalMessagePlaceholder: "Richieste particolari?",

        bookingMaxCapacityTableTitle: "Capacità max:",
        bookingTableTypeTitle: "Tipo di tavolo:",

        squareTableForm: "Tavolo quadrato",
        roundTableForm: "Tavolo rotondo",
        rectangularTableForm: "Tavolo rettangolare",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Seleziona tavolo",

        toastBookingSuccess: "Prenotazione completata",
        toastBookingUnavailable: "Prenotazione fallita: questo tavolo è già prenotato.",
        toastBookingError: "Prenotazione fallita. Riprova",

        // ORDERS PAGE
        h1OrdersPage: "CONSEGNA",
        smallOrdersPageSubtitle: "Goditi il nostro menu comodamente a casa.",

        addProductToCartButton: "Aggiungi al carrello",
        removeProductToCartButton: "Rimuovi dal carrello",
        loadingTextAddingProductsToCartButton: "Aggiungendo...",
        loadingTextRemovingProductsFromCartButton: "Rimuovendo...",
        addOneMoreProductToCartButton: "Aggiungi uno",
        removeOneMoreProductFromCartButton: "Rimuovi uno",

        toastAddedProductToCart: "Aggiunto ✔",
        toastQuantityProductUpdatedToCart: "Carrello aggiornato ✔",
        toastRemovedProductFromCart: "Elemento rimosso dal carrello ✔",
        toastErrorAddingProductToCart: "Errore: impossibile aggiungere al carrello",
        toastErrorQuantityProductUpdatedToCart: "Errore: aggiornamento quantità fallito",
        toastErrorRemovingProductFromCart: "Errore: impossibile rimuovere l'elemento",

        // CART PAGE
        h1CartPage: "IL TUO CARRELLO",
        confirmModalCartTitle: "Conferma ordine",
        confirmModalCartMessage: "Ci siamo quasi! Conferma il tuo ordine per continuare",

        confirmButtonCartModal: "Conferma",
        loadingConfirmButtonCartModal: "Elaborazione...",
        cancelButtonCartModal: "Indietro",

        accordionQtyText: "Qta:",
        accordionDescriptionText: "Descrizione:",
        accordionPriceText: "Prezzo:",

        noProductsTitle: "Il tuo carrello è vuoto",
        goToOrdersCartButton: "Ordina ora",

        toastCartRemovedSuccess: "Carrello svuotato ✔",
        toastCartRemovedError: "Impossibile rimuovere tutti gli elementi",

        // PROFILE PAGE
        h1ProfilePage: "Benvenuto, ",
        userDataSectionTitle: "Informazioni personali",
        bookingsDataSectionTitle: "Le tue prenotazioni",
        ordersDataSectionTitle: "I tuoi ordini",

        buttonChangeAvatar: "Cambia avatar",

        //  ----- USER DATA
        nameFieldText: "Nome",
        emailFieldText: "Email",
        addressFieldText: "Indirizzo",
        userDataModalTitle: "Conferma modifica dati",
        userDataModalMessage: "Conferma modifica: ",
        userDataModalMessageNexo: "in",
        userDataModalConfirmText: "Cambia",
        loadingUserDataModalConfirmText: "Modifica...",
        userDataModalCancelText: "Annulla",

        toastUserDataChangeSuccess: "Profilo aggiornato con successo ✔",
        toastUserDataChangeError: "Errore nell'aggiornamento del profilo",

        // Footer
        copyrightText: "ReservApp. Tutti i diritti riservati",

        // Mensajes Generales
        affirmationText: "Sì",
        NegationText: "No",
    },

    de: {
        // BARRA DE NAVIGATION
        userReplaceName: "Benutzer",
        toastLogoutError: "Ups! Etwas ist schiefgelaufen.",

        bookingPageNavLabel: "RESERVIERUNGEN",
        ordersPageNavLabel: "BESTELLUNGEN",
        menusPageNavLabel: "SPEISEKARTE",
        cartPageNavLabel: "WARENKORB",

        lodingTextLogoutUser: "Profil wird geschlossen...",
        logoutButton: "Abmelden",
        loadingTextLogoutButton: "Abmeldung...",
        loginButton: "Anmelden",
        registerButton: "Registrieren",

        toastErrorLogout: "Abmeldung fehlgeschlagen",

        profilePageButton: "Profil",

        // HOME PAGE
        toastWelcomeRegister: "Willkommen",
        toastLoginSuccess: "Login erfolgreich ✔",
        toastLogoutSuccess: "Abmeldung abgeschlossen ✔",

        h1HomePage: "Startseite",

        // MENUPAGE
        fetchMessageError: "Fehler beim Laden der Produkte. Versuchen Sie es erneut.",
        allCategoriesFilter: "Alle Kategorien",
        h1MenuPage: "SPEISEKARTE",

        loadingTextRefreshProductsButton: "Produkte werden aktualisiert...",
        textRefreshProductsButton: "Aktualisieren",
        clearFilterButton: "Filter löschen",

        // BOOKING PAGE
        h1BookingPage: "RESERVIERUNG",

        confirmBookingTitle: "Überprüfen und bestätigen",
        userNameConfirmText: "Reservierungsname",
        dateConfirmText: "Datum",
        timeConfirmText: "Uhrzeit",
        customersConfirmText: "Gäste",
        highChairConfirmText: "Hochstuhl?",
        aditionalMessageConfirmText: "Zusätzliche Nachricht",
        confirmButtonModal: "Bestätigen",
        loadingTextConfirmButtonModal: "Reservierung...",

        bookingTimeText: "Uhrzeit",
        bookingTimePlaceholder: "Uhrzeit auswählen",
        bookingCustomersText: "Gäste",
        bookingCustomersPlaceholder: "Anzahl auswählen",

        bookingHighChairTitle: "Hochstuhl hinzufügen",
        bookingHighChairDescription: "Kostenlos",

        bookingAditionalMessagePlaceholder: "Besondere Wünsche?",

        bookingMaxCapacityTableTitle: "Max. Kapazität:",
        bookingTableTypeTitle: "Tischtyp:",

        squareTableForm: "Quadratischer Tisch",
        roundTableForm: "Runder Tisch",
        rectangularTableForm: "Rechteckiger Tisch",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Tisch auswählen",

        toastBookingSuccess: "Reservierung abgeschlossen",
        toastBookingUnavailable: "Reservierung fehlgeschlagen: Dieser Tisch ist bereits reserviert.",
        toastBookingError: "Reservierung fehlgeschlagen. Versuchen Sie es erneut",

        // ORDERS PAGE
        h1OrdersPage: "LIEFERUNG",
        smallOrdersPageSubtitle: "Genießen Sie unser Menü bequem von zu Hause.",

        addProductToCartButton: "Zum Warenkorb hinzufügen",
        removeProductToCartButton: "Aus Warenkorb entfernen",
        loadingTextAddingProductsToCartButton: "Hinzufügen...",
        loadingTextRemovingProductsFromCartButton: "Entfernen...",
        addOneMoreProductToCartButton: "Eins hinzufügen",
        removeOneMoreProductFromCartButton: "Eins entfernen",

        toastAddedProductToCart: "Hinzugefügt ✔",
        toastQuantityProductUpdatedToCart: "Warenkorb erfolgreich aktualisiert ✔",
        toastRemovedProductFromCart: "Artikel aus Warenkorb entfernt ✔",
        toastErrorAddingProductToCart: "Fehler: konnte nicht zum Warenkorb hinzufügen",
        toastErrorQuantityProductUpdatedToCart: "Fehler: Mengenaktualisierung fehlgeschlagen",
        toastErrorRemovingProductFromCart: "Fehler: Artikel konnte nicht entfernt werden",

        // CART PAGE
        h1CartPage: "IHR WARENKORB",
        confirmModalCartTitle: "Bestellbestätigung",
        confirmModalCartMessage: "Fast geschafft! Bestätigen Sie Ihre Bestellung, um fortzufahren",

        confirmButtonCartModal: "Bestätigen",
        loadingConfirmButtonCartModal: "Verarbeitung...",
        cancelButtonCartModal: "Zurück",

        accordionQtyText: "Menge:",
        accordionDescriptionText: "Beschreibung:",
        accordionPriceText: "Preis:",

        noProductsTitle: "Ihr Warenkorb ist leer",
        goToOrdersCartButton: "Jetzt bestellen",

        toastCartRemovedSuccess: "Warenkorb geleert ✔",
        toastCartRemovedError: "Fehler beim Entfernen aller Artikel",

        // PROFILE PAGE
        h1ProfilePage: "Willkommen, ",
        userDataSectionTitle: "Persönliche Informationen",
        bookingsDataSectionTitle: "Ihre Reservierungen",
        ordersDataSectionTitle: "Ihre Bestellungen",

        buttonChangeAvatar: "Avatar ändern",

        //  ----- USER DATA
        nameFieldText: "Name",
        emailFieldText: "E-Mail",
        addressFieldText: "Adresse",
        userDataModalTitle: "Datenänderung bestätigen",
        userDataModalMessage: "Änderung bestätigen: ",
        userDataModalMessageNexo: "zu",
        userDataModalConfirmText: "Ändern",
        loadingUserDataModalConfirmText: "Änderung...",
        userDataModalCancelText: "Abbrechen",

        toastUserDataChangeSuccess: "Profil erfolgreich aktualisiert ✔",
        toastUserDataChangeError: "Fehler beim Aktualisieren des Profils",

        // Footer
        copyrightText: "ReservApp. Alle Rechte vorbehalten",

        // Mensajes Generales
        affirmationText: "Ja",
        NegationText: "Nein",
    },

    zh: {
        // BARRA DE NAVIGATION
        userReplaceName: "用户",
        toastLogoutError: "哎呀！出现了错误。",

        bookingPageNavLabel: "预订",
        ordersPageNavLabel: "订单",
        menusPageNavLabel: "菜单",
        cartPageNavLabel: "购物车",

        lodingTextLogoutUser: "正在关闭资料...",
        logoutButton: "退出",
        loadingTextLogoutButton: "退出中...",
        loginButton: "登录",
        registerButton: "注册",

        toastErrorLogout: "退出失败",

        profilePageButton: "个人资料",

        // HOME PAGE
        toastWelcomeRegister: "欢迎",
        toastLoginSuccess: "登录成功 ✔",
        toastLogoutSuccess: "退出成功 ✔",

        h1HomePage: "主页",

        // MENUPAGE
        fetchMessageError: "加载产品时出错。请重试。",
        allCategoriesFilter: "所有分类",
        h1MenuPage: "菜单",

        loadingTextRefreshProductsButton: "正在刷新产品...",
        textRefreshProductsButton: "刷新",
        clearFilterButton: "清除筛选",

        // BOOKING PAGE
        h1BookingPage: "预订",

        confirmBookingTitle: "查看并确认",
        userNameConfirmText: "预订姓名",
        dateConfirmText: "日期",
        timeConfirmText: "时间",
        customersConfirmText: "人数",
        highChairConfirmText: "婴儿座椅？",
        aditionalMessageConfirmText: "附加信息",
        confirmButtonModal: "确认",
        loadingTextConfirmButtonModal: "预订中...",

        bookingTimeText: "时间",
        bookingTimePlaceholder: "选择时间",
        bookingCustomersText: "人数",
        bookingCustomersPlaceholder: "选择人数",

        bookingHighChairTitle: "添加婴儿座椅",
        bookingHighChairDescription: "免费",

        bookingAditionalMessagePlaceholder: "有特殊要求吗？",

        bookingMaxCapacityTableTitle: "最大容量：",
        bookingTableTypeTitle: "桌型：",

        squareTableForm: "方桌",
        roundTableForm: "圆桌",
        rectangularTableForm: "长方桌",

        bookingTableWifiText: "Wifi：",

        bookingSelectTableButton: "选择桌子",

        toastBookingSuccess: "预订成功",
        toastBookingUnavailable: "预订失败：该桌已被预订。",
        toastBookingError: "预订失败。请重试",

        // ORDERS PAGE
        h1OrdersPage: "送餐",
        smallOrdersPageSubtitle: "在家享用我们的菜单。",

        addProductToCartButton: "加入购物车",
        removeProductToCartButton: "从购物车移除",
        loadingTextAddingProductsToCartButton: "添加中...",
        loadingTextRemovingProductsFromCartButton: "移除中...",
        addOneMoreProductToCartButton: "再加一个",
        removeOneMoreProductFromCartButton: "减一个",

        toastAddedProductToCart: "已添加 ✔",
        toastQuantityProductUpdatedToCart: "购物车已更新 ✔",
        toastRemovedProductFromCart: "已从购物车移除 ✔",
        toastErrorAddingProductToCart: "错误：无法加入购物车",
        toastErrorQuantityProductUpdatedToCart: "错误：数量更新失败",
        toastErrorRemovingProductFromCart: "错误：无法移除购物车中的项目",

        // CART PAGE
        h1CartPage: "您的购物车",
        confirmModalCartTitle: "订单确认",
        confirmModalCartMessage: "快完成了！确认您的订单以继续",

        confirmButtonCartModal: "确认",
        loadingConfirmButtonCartModal: "处理中...",
        cancelButtonCartModal: "返回",

        accordionQtyText: "数量：",
        accordionDescriptionText: "描述：",
        accordionPriceText: "价格：",

        noProductsTitle: "您的购物车是空的",
        goToOrdersCartButton: "立即订购",

        toastCartRemovedSuccess: "购物车已清空 ✔",
        toastCartRemovedError: "无法移除所有项目",

        // PROFILE PAGE
        h1ProfilePage: "欢迎，",
        userDataSectionTitle: "个人信息",
        bookingsDataSectionTitle: "您的预订",
        ordersDataSectionTitle: "您的订单",

        buttonChangeAvatar: "更改头像",

        //  ----- USER DATA
        nameFieldText: "姓名",
        emailFieldText: "电子邮箱",
        addressFieldText: "地址",
        userDataModalTitle: "确认数据更改",
        userDataModalMessage: "确认更改：",
        userDataModalMessageNexo: "为",
        userDataModalConfirmText: "更改",
        loadingUserDataModalConfirmText: "更改中...",
        userDataModalCancelText: "取消",

        toastUserDataChangeSuccess: "资料已成功更新 ✔",
        toastUserDataChangeError: "更新资料时出错",

        // Footer
        copyrightText: "ReservApp. 版权所有",

        // Mensajes Generales
        affirmationText: "是",
        NegationText: "否",
    },
};

const languages = {
    en: "English",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    de: "Deutsch",
    zh: "中文（简体）",
};

export const LanguageContext = createContext({
    lang: "en",
    TEXTS,
    languages,
    getText: () => {},
    handleLang: () => {},
});

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState("en");

    const getText = (key) => {
        const selectedText = TEXTS[lang][key];
        if (!selectedText)
            return TEXTS[lang] && TEXTS[lang].noTextFound ? TEXTS[lang].noTextFound : "No text Found";
        return selectedText;
    };
    const handleLang = (lang = "en") => {
        setLang(lang);
    };

    return (
        <LanguageContext value={{ lang, TEXTS, languages, getText, handleLang }}>{children}</LanguageContext>
    );
};
