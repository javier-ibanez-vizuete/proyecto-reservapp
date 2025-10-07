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

        h1HomePage: "ReservApp",

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

        //  -----ORDERS DATA
        ordersDataTitle1: "Pending Orders",
        ordersDataTitle2: "Completed Orders",

        ordersDataInfoModalMessage: "Do you want to cancel the order of ",

        toastOrdersDataSuccess: "Order canceled successfully ✔",
        toastOrdersDataError: "Error Cancelling the order.",

        ordersDataNotPendingOrdersText: "There are not pending Orders.",
        ordersDataNotOrders: "There are not Orders.",

        ordersDataCancelModalTitle: "Cancel Order",
        ordersDataCancelModalBackButton: "Back",
        loadingOrdersDataCancelButton: "Cancelling...",

        ordersDataInfoModalTitle: "Order Details",
        ordersDataInfoModalcreationText: "Creation Date:",
        ordersDataInfoModalProductText: "Product:",
        ordersDataInfoModalPriceText: "Price:",
        ordersDataInfoModalTotalProductsText: "Total Products:",
        ordersDataInfoModalTotalCountText: "Total:",
        buttonOrdersDataInfomodalCloseText: "Close",

        buttonOrdersDataInfoCancelText: "Cancel",

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

        //  CTA CARDS DATA
        cardDataMenuTitle: "Check our Menu",
        cardDataMenuDescription: "Browse our full selection of dishes and drinks.",
        cardDataMenuButtonText: "View Menu",

        cardDataLoginTitle: "Welcome Back",
        cardDataLoginDescription: "Log in to manage your orders and reservations.",
        cardDataLoginButtonText: "Log In",

        cardDataBookingTitle: "Book Your Table",
        cardDataBookingDescription: "Choose your date, time, and we’ll save your spot.",
        cardDataBookingButtonText: "Reserve Now",

        cardDataOrdersTitle: "Hungry? We Got You",
        cardDataOrdersDescription: "Enjoy our best dishes from the comfort of your place.",
        cardDataOrdersButtonText: "Order Now",
    },

    es: {
        // BARRA DE NAVEGACIÓN
        userReplaceName: "Usuario",
        toastLogoutError: "Error al cerrar sesión.",

        bookingPageNavLabel: "RESERVAS",
        ordersPageNavLabel: "PEDIDOS",
        menusPageNavLabel: "MENÚ",
        cartPageNavLabel: "CARRITO",

        lodingTextLogoutUser: "Cerrando perfil...",
        logoutButton: "Cerrar sesión",
        loadingTextLogoutButton: "Cerrando sesión...",
        loginButton: "Iniciar sesión",
        registerButton: "Registrarse",

        toastErrorLogout: "Error al cerrar sesión",

        profilePageButton: "Perfil",

        // PÁGINA DE INICIO DE SESIÓN
        h1LoginPage: "Iniciar sesión",

        toastLoginError: "Error al iniciar sesión",
        loadingLoginButtonText: "Iniciando sesión...",

        // PÁGINA DE REGISTRO
        h1RegisterPage: "Únete a nosotros",

        registerButtonText: "Registrarse",
        loadingRegisterButtonText: "Registrando...",

        namePlaceholderFieldText: "Introduce tu nombre",
        emailPlaceholderFieldText: "Introduce tu correo electrónico",
        addressPlaceholderFieldText: "Dirección de entrega",
        passwordPlaceholderFieldText: "Introduce tu contraseña",
        confirmPasswordPlaceholderFieldText: "Repite tu contraseña",

        toastRegisterError: "Error al registrarse",

        // PÁGINA DE INICIO
        toastWelcomeRegister: "Bienvenido",
        toastLoginSuccess: "Inicio de sesión exitoso ✔",
        toastLogoutSuccess: "Cierre de sesión exitoso ✔",

        h1HomePage: "ReservApp",

        // PÁGINA DE MENÚ
        fetchMessageError: "Error al cargar los productos. Intenta de nuevo.",
        allCategoriesFilter: "Todas las categorías",
        h1MenuPage: "MENÚ",

        loadingTextRefreshProductsButton: "Actualizando productos...",
        textRefreshProductsButton: "Actualizar",
        clearFilterButton: "Limpiar filtro",

        // PÁGINA DE RESERVAS
        h1BookingPage: "RESERVA",

        confirmBookingTitle: "Revisar y Confirmar",
        userNameConfirmText: "Nombre de la reserva",
        dateConfirmText: "Fecha",
        timeConfirmText: "Hora",
        customersConfirmText: "Comensales",
        highChairConfirmText: "¿Silla alta?",
        aditionalMessageConfirmText: "Mensaje adicional",
        confirmButtonModal: "Confirmar",
        loadingTextConfirmButtonModal: "Reservando...",

        bookingTimeText: "Hora",
        bookingTimePlaceholder: "Seleccionar hora",
        bookingCustomersText: "Comensales",
        bookingCustomersPlaceholder: "Seleccionar cantidad",

        bookingHighChairTitle: "Añadir silla alta",
        bookingHighChairDescription: "Sin coste adicional",

        bookingAditionalMessagePlaceholder: "¿Alguna petición especial?",

        bookingMaxCapacityTableTitle: "Cap. máxima:",
        bookingTableTypeTitle: "Tipo de mesa:",

        squareTableForm: "Mesa cuadrada",
        roundTableForm: "Mesa redonda",
        rectangularTableForm: "Mesa rectangular",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Seleccionar mesa",

        toastBookingSuccess: "Reserva completada",
        toastBookingUnavailable: "Error: esta mesa ya está reservada.",
        toastBookingError: "Error al realizar la reserva. Intenta nuevamente",

        // PÁGINA DE PEDIDOS
        h1OrdersPage: "PEDIDOS",
        smallOrdersPageSubtitle: "Disfruta de nuestro menú desde casa.",

        addProductToCartButton: "Añadir al carrito",
        removeProductToCartButton: "Eliminar del carrito",
        loadingTextAddingProductsToCartButton: "Añadiendo...",
        loadingTextRemovingProductsFromCartButton: "Eliminando...",
        addOneMoreProductToCartButton: "Añadir uno más",
        removeOneMoreProductFromCartButton: "Eliminar uno",

        toastAddedProductToCart: "Añadido ✔",
        toastQuantityProductUpdatedToCart: "Carrito actualizado correctamente ✔",
        toastRemovedProductFromCart: "Producto eliminado del carrito ✔",
        toastErrorAddingProductToCart: "Error: no se pudo añadir al carrito",
        toastErrorQuantityProductUpdatedToCart: "Error: no se pudo actualizar la cantidad",
        toastErrorRemovingProductFromCart: "Error: no se pudo eliminar el producto",

        // PÁGINA DEL CARRITO
        h1CartPage: "TU CARRITO",
        confirmModalCartTitle: "Confirmación del pedido",
        confirmModalCartMessage: "¡Ya casi! Confirma tu pedido para continuar",

        confirmButtonCartModal: "Confirmar",
        loadingConfirmButtonCartModal: "Procesando...",
        cancelButtonCartModal: "Volver",

        accordionQtyText: "Cant:",
        accordionDescriptionText: "Descripción:",
        accordionPriceText: "Precio:",

        noProductsTitle: "Tu carrito está vacío",
        goToOrdersCartButton: "Hacer pedido",

        toastCartRemovedSuccess: "Carrito vaciado ✔",
        toastCartRemovedError: "Error al eliminar los artículos",

        // PÁGINA DE PERFIL
        h1ProfilePage: "Bienvenido, ",
        userDataSectionTitle: "Información personal",
        bookingsDataSectionTitle: "Tus reservas",
        ordersDataSectionTitle: "Tus pedidos",

        buttonChangeAvatar: "Cambiar avatar",

        // ----- DATOS DEL USUARIO
        nameFieldText: "Nombre",
        fullNameFieldText: "Nombre completo",
        emailFieldText: "Correo electrónico",
        addressFieldText: "Dirección",
        passwordFieldText: "Contraseña",
        confirmPasswordFieldText: "Confirmar contraseña",
        userDataModalTitle: "Confirmar cambio de datos",
        userDataModalMessage: "Confirmar cambio de:",
        userDataModalMessageNexo: "a",
        userDataModalConfirmText: "Cambiar",
        loadingUserDataModalConfirmText: "Cambiando...",
        userDataModalCancelText: "Cancelar",

        userDataEditButtonText: "Editar",
        userDataChangeButtonText: "Guardar cambios",

        toastUserDataChangeSuccess: "Perfil actualizado correctamente ✔",
        toastUserDataChangeError: "Error al actualizar el perfil",

        // ------ DATOS DE RESERVAS
        bookingDataTitle1: "Próximas reservas",
        bookingDataTitle2: "Visitas anteriores",
        bookingDataNoPendingBookingsFound: "No tienes reservas pendientes.",
        bookingDataNoPastVisitsFound: "No tienes visitas anteriores.",

        buttonBookingDataMakeABook: "Reservar ahora",
        buttonBookingDataCloseModalInfo: "Cerrar",
        buttonBookingDataCancelReservation: "Cancelar reserva",

        bookingDataModalDeletingTitle: "Eliminar reserva",
        bookingDataModalDeletingbutton: "Eliminar",
        loadingBookingDataModalDeletingbutton: "Eliminando...",

        bookingDataModalInfotitle: "Detalles de la reserva",
        bookingDataModalInfoMessageText1: "Eliminar tu reserva para ",
        bookingDataModalInfoMessageCustomer1: "Comensal",
        bookingDataModalInfoMessageCustomer2: "Comensales",

        bookingDataModalInfoDateText: "Fecha de la reserva:",
        bookingDataModalInfoTimeText: "Hora de la reserva:",
        bookingDataModalInfoPartySizeText: "Tamaño del grupo:",
        bookingDataModalInfoHighChairText: "¿Silla alta necesaria?",

        toastBookingDataDeltingBookingError: "Error al eliminar la reserva",

        // ----- DATOS DE PEDIDOS
        ordersDataTitle1: "Pedidos pendientes",
        ordersDataTitle2: "Pedidos completados",

        ordersDataInfoModalMessage: "¿Deseas cancelar el pedido de ",

        toastOrdersDataSuccess: "Pedido cancelado correctamente ✔",
        toastOrdersDataError: "Error al cancelar el pedido.",

        ordersDataNotPendingOrdersText: "No hay pedidos pendientes.",
        ordersDataNotOrders: "No hay pedidos.",

        ordersDataCancelModalTitle: "Cancelar pedido",
        ordersDataCancelModalBackButton: "Volver",
        loadingOrdersDataCancelButton: "Cancelando...",

        ordersDataInfoModalTitle: "Detalles del pedido",
        ordersDataInfoModalcreationText: "Fecha de creación:",
        ordersDataInfoModalProductText: "Producto:",
        ordersDataInfoModalPriceText: "Precio:",
        ordersDataInfoModalTotalProductsText: "Total de productos:",
        ordersDataInfoModalTotalCountText: "Total:",
        buttonOrdersDataInfomodalCloseText: "Cerrar",

        buttonOrdersDataInfoCancelText: "Cancelar",

        // PIE DE PÁGINA
        copyrightText: "ReservApp. Todos los derechos reservados.",

        // MENSAJES GENERALES
        affirmationText: "Sí",
        NegationText: "No",

        // VALIDACIÓN DE CAMPOS
        emailIsRequiredField: "El campo de correo es obligatorio",
        emailNotValidField1: "Correo no válido (falta '@')",
        emailNotValidField2: "Correo no válido (falta '.')",
        emailTooShortField: "Correo demasiado corto (mín. 5 caracteres)",
        emailTooLongField: "Correo demasiado largo (máx. 50 caracteres)",

        passwordIsRequiredField: "El campo de contraseña es obligatorio",
        passwordTooShortField: "Contraseña demasiado corta (mín. 9 caracteres)",
        passwordTooLongField: "Contraseña demasiado larga (máx. 30 caracteres)",

        confirmPasswordIsRequiredField: "El campo de confirmación es obligatorio",
        doNotMatchPasswordsFields: "Las contraseñas no coinciden",

        nameIsRequiredField: "El campo de nombre es obligatorio",
        nameIsTooShortField: "Nombre demasiado corto (mín. 4 caracteres)",
        nameIsTooLongField: "Nombre demasiado largo (máx. 30 caracteres)",

        addressIsRequiredField: "El campo de dirección es obligatorio",
        addressTooShortField: "Dirección demasiado corta (mín. 6 caracteres)",
        addressTooLongField: "Dirección demasiado larga (máx. 60 caracteres)",

        bookingDateIsRequiredField: "Debes elegir una fecha de reserva",
        bookingTimeIsRequiredField: "El campo de hora es obligatorio",
        bookingCustomersIsRequiredField: "El campo de comensales es obligatorio",
        bookingTableIsRequiredField: "Debes elegir una mesa",

        profileNameNotEmptyField: "El nombre no puede estar vacío",
        profileEmailNotEmptyField: "El correo no puede estar vacío",
        profileAddressNotEmptyField: "La dirección no puede estar vacía",

        // TARJETAS CTA
        cardDataMenuTitle: "Consulta nuestro menú",
        cardDataMenuDescription: "Explora nuestra selección completa de platos y bebidas.",
        cardDataMenuButtonText: "Ver menú",

        cardDataLoginTitle: "Bienvenido de nuevo",
        cardDataLoginDescription: "Inicia sesión para gestionar tus pedidos y reservas.",
        cardDataLoginButtonText: "Iniciar sesión",

        cardDataBookingTitle: "Reserva tu mesa",
        cardDataBookingDescription: "Elige fecha, hora y te guardaremos un lugar.",
        cardDataBookingButtonText: "Reservar ahora",

        cardDataOrdersTitle: "¿Tienes hambre?",
        cardDataOrdersDescription: "Disfruta de nuestros mejores platos sin salir de casa.",
        cardDataOrdersButtonText: "Hacer pedido",
    },

    fr: {
        // BARRE DE NAVIGATION
        userReplaceName: "Utilisateur",
        toastLogoutError: "Échec de la déconnexion.",

        bookingPageNavLabel: "RÉSERVATIONS",
        ordersPageNavLabel: "COMMANDES",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "PANIER",

        lodingTextLogoutUser: "Fermeture du profil...",
        logoutButton: "Se déconnecter",
        loadingTextLogoutButton: "Déconnexion...",
        loginButton: "Se connecter",
        registerButton: "S’inscrire",

        toastErrorLogout: "Échec de la déconnexion",

        profilePageButton: "Profil",

        // PAGE DE CONNEXION
        h1LoginPage: "Connexion",

        toastLoginError: "Échec de la connexion",
        loadingLoginButtonText: "Connexion en cours...",

        // PAGE D’INSCRIPTION
        h1RegisterPage: "Rejoignez-nous",

        registerButtonText: "S’inscrire",
        loadingRegisterButtonText: "Inscription en cours...",

        namePlaceholderFieldText: "Entrez votre nom",
        emailPlaceholderFieldText: "Entrez votre e-mail",
        addressPlaceholderFieldText: "Adresse de livraison",
        passwordPlaceholderFieldText: "Entrez votre mot de passe",
        confirmPasswordPlaceholderFieldText: "Répétez votre mot de passe",

        toastRegisterError: "Échec de l’inscription",

        // PAGE D’ACCUEIL
        toastWelcomeRegister: "Bienvenue",
        toastLoginSuccess: "Connexion réussie ✔",
        toastLogoutSuccess: "Déconnexion réussie ✔",

        h1HomePage: "ReservApp",

        // PAGE DU MENU
        fetchMessageError: "Erreur lors du chargement des produits. Réessayez.",
        allCategoriesFilter: "Toutes les catégories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Actualisation des produits...",
        textRefreshProductsButton: "Actualiser",
        clearFilterButton: "Effacer le filtre",

        // PAGE DE RÉSERVATION
        h1BookingPage: "RÉSERVATION",

        confirmBookingTitle: "Vérifier et confirmer",
        userNameConfirmText: "Nom de la réservation",
        dateConfirmText: "Date",
        timeConfirmText: "Heure",
        customersConfirmText: "Clients",
        highChairConfirmText: "Chaise haute ?",
        aditionalMessageConfirmText: "Message supplémentaire",
        confirmButtonModal: "Confirmer",
        loadingTextConfirmButtonModal: "Réservation...",

        bookingTimeText: "Heure",
        bookingTimePlaceholder: "Sélectionnez l’heure",
        bookingCustomersText: "Clients",
        bookingCustomersPlaceholder: "Sélectionnez le nombre de personnes",

        bookingHighChairTitle: "Ajouter une chaise haute",
        bookingHighChairDescription: "Gratuit",

        bookingAditionalMessagePlaceholder: "Des demandes particulières ?",

        bookingMaxCapacityTableTitle: "Capacité max. :",
        bookingTableTypeTitle: "Type de table :",

        squareTableForm: "Table carrée",
        roundTableForm: "Table ronde",
        rectangularTableForm: "Table rectangulaire",

        bookingTableWifiText: "Wifi :",

        bookingSelectTableButton: "Choisir la table",

        toastBookingSuccess: "Réservation terminée",
        toastBookingUnavailable: "Échec : cette table est déjà réservée.",
        toastBookingError: "Échec de la réservation. Réessayez.",

        // PAGE DES COMMANDES
        h1OrdersPage: "LIVRAISON",
        smallOrdersPageSubtitle: "Profitez de notre menu depuis chez vous.",

        addProductToCartButton: "Ajouter au panier",
        removeProductToCartButton: "Retirer du panier",
        loadingTextAddingProductsToCartButton: "Ajout...",
        loadingTextRemovingProductsFromCartButton: "Suppression...",
        addOneMoreProductToCartButton: "Ajouter un autre",
        removeOneMoreProductFromCartButton: "Retirer un",

        toastAddedProductToCart: "Ajouté ✔",
        toastQuantityProductUpdatedToCart: "Panier mis à jour ✔",
        toastRemovedProductFromCart: "Article retiré du panier ✔",
        toastErrorAddingProductToCart: "Erreur : impossible d’ajouter au panier",
        toastErrorQuantityProductUpdatedToCart: "Erreur : mise à jour échouée",
        toastErrorRemovingProductFromCart: "Erreur : impossible de retirer l’article",

        // PAGE DU PANIER
        h1CartPage: "VOTRE PANIER",
        confirmModalCartTitle: "Confirmation de la commande",
        confirmModalCartMessage: "Presque terminé ! Confirmez votre commande pour continuer",

        confirmButtonCartModal: "Confirmer",
        loadingConfirmButtonCartModal: "Traitement...",
        cancelButtonCartModal: "Retour",

        accordionQtyText: "Qté :",
        accordionDescriptionText: "Description :",
        accordionPriceText: "Prix :",

        noProductsTitle: "Votre panier est vide",
        goToOrdersCartButton: "Commander maintenant",

        toastCartRemovedSuccess: "Panier vidé ✔",
        toastCartRemovedError: "Erreur lors de la suppression des articles",

        // PAGE DE PROFIL
        h1ProfilePage: "Bienvenue, ",
        userDataSectionTitle: "Informations personnelles",
        bookingsDataSectionTitle: "Vos réservations",
        ordersDataSectionTitle: "Vos commandes",

        buttonChangeAvatar: "Changer d’avatar",

        // ----- DONNÉES UTILISATEUR
        nameFieldText: "Nom",
        fullNameFieldText: "Nom complet",
        emailFieldText: "E-mail",
        addressFieldText: "Adresse",
        passwordFieldText: "Mot de passe",
        confirmPasswordFieldText: "Confirmer le mot de passe",
        userDataModalTitle: "Confirmer le changement de données",
        userDataModalMessage: "Confirmer le changement de :",
        userDataModalMessageNexo: "en",
        userDataModalConfirmText: "Changer",
        loadingUserDataModalConfirmText: "Modification...",
        userDataModalCancelText: "Annuler",

        userDataEditButtonText: "Modifier",
        userDataChangeButtonText: "Enregistrer",

        toastUserDataChangeSuccess: "Profil mis à jour ✔",
        toastUserDataChangeError: "Erreur lors de la mise à jour du profil",

        // ------ DONNÉES DES RÉSERVATIONS
        bookingDataTitle1: "Vos prochaines réservations",
        bookingDataTitle2: "Vos visites passées",
        bookingDataNoPendingBookingsFound: "Aucune réservation en attente.",
        bookingDataNoPastVisitsFound: "Aucune visite passée.",

        buttonBookingDataMakeABook: "Réserver maintenant",
        buttonBookingDataCloseModalInfo: "Fermer",
        buttonBookingDataCancelReservation: "Annuler la réservation",

        bookingDataModalDeletingTitle: "Supprimer la réservation",
        bookingDataModalDeletingbutton: "Supprimer",
        loadingBookingDataModalDeletingbutton: "Suppression...",

        bookingDataModalInfotitle: "Détails de la réservation",
        bookingDataModalInfoMessageText1: "Supprimer votre réservation pour ",
        bookingDataModalInfoMessageCustomer1: "Client",
        bookingDataModalInfoMessageCustomer2: "Clients",

        bookingDataModalInfoDateText: "Date de la réservation :",
        bookingDataModalInfoTimeText: "Heure de la réservation :",
        bookingDataModalInfoPartySizeText: "Taille du groupe :",
        bookingDataModalInfoHighChairText: "Chaise haute nécessaire ?",

        toastBookingDataDeltingBookingError: "Erreur lors de la suppression de la réservation",

        // ----- DONNÉES DES COMMANDES
        ordersDataTitle1: "Commandes en attente",
        ordersDataTitle2: "Commandes terminées",

        ordersDataInfoModalMessage: "Souhaitez-vous annuler la commande de ",

        toastOrdersDataSuccess: "Commande annulée ✔",
        toastOrdersDataError: "Erreur lors de l’annulation de la commande.",

        ordersDataNotPendingOrdersText: "Aucune commande en attente.",
        ordersDataNotOrders: "Aucune commande.",

        ordersDataCancelModalTitle: "Annuler la commande",
        ordersDataCancelModalBackButton: "Retour",
        loadingOrdersDataCancelButton: "Annulation...",

        ordersDataInfoModalTitle: "Détails de la commande",
        ordersDataInfoModalcreationText: "Date de création :",
        ordersDataInfoModalProductText: "Produit :",
        ordersDataInfoModalPriceText: "Prix :",
        ordersDataInfoModalTotalProductsText: "Total produits :",
        ordersDataInfoModalTotalCountText: "Total :",
        buttonOrdersDataInfomodalCloseText: "Fermer",

        buttonOrdersDataInfoCancelText: "Annuler",

        // PIED DE PAGE
        copyrightText: "ReservApp. Tous droits réservés.",

        // MESSAGES GÉNÉRAUX
        affirmationText: "Oui",
        NegationText: "Non",

        // VALIDATION DES CHAMPS
        emailIsRequiredField: "Le champ e-mail est requis",
        emailNotValidField1: "E-mail invalide (manque '@')",
        emailNotValidField2: "E-mail invalide (manque '.')",
        emailTooShortField: "E-mail trop court (min. 5 caractères)",
        emailTooLongField: "E-mail trop long (max. 50 caractères)",

        passwordIsRequiredField: "Le champ mot de passe est requis",
        passwordTooShortField: "Mot de passe trop court (min. 9 caractères)",
        passwordTooLongField: "Mot de passe trop long (max. 30 caractères)",

        confirmPasswordIsRequiredField: "Le champ de confirmation est requis",
        doNotMatchPasswordsFields: "Les mots de passe ne correspondent pas",

        nameIsRequiredField: "Le champ nom est requis",
        nameIsTooShortField: "Nom trop court (min. 4 caractères)",
        nameIsTooLongField: "Nom trop long (max. 30 caractères)",

        addressIsRequiredField: "Le champ adresse est requis",
        addressTooShortField: "Adresse trop courte (min. 6 caractères)",
        addressTooLongField: "Adresse trop longue (max. 60 caractères)",

        bookingDateIsRequiredField: "Vous devez choisir une date de réservation",
        bookingTimeIsRequiredField: "Le champ heure est requis",
        bookingCustomersIsRequiredField: "Le champ clients est requis",
        bookingTableIsRequiredField: "Vous devez choisir une table",

        profileNameNotEmptyField: "Le nom ne peut pas être vide",
        profileEmailNotEmptyField: "L’e-mail ne peut pas être vide",
        profileAddressNotEmptyField: "L’adresse ne peut pas être vide",

        // CARTES CTA
        cardDataMenuTitle: "Découvrez notre menu",
        cardDataMenuDescription: "Parcourez notre sélection complète de plats et boissons.",
        cardDataMenuButtonText: "Voir le menu",

        cardDataLoginTitle: "Bon retour",
        cardDataLoginDescription: "Connectez-vous pour gérer vos commandes et réservations.",
        cardDataLoginButtonText: "Se connecter",

        cardDataBookingTitle: "Réservez votre table",
        cardDataBookingDescription: "Choisissez la date, l’heure, et nous vous garderons une place.",
        cardDataBookingButtonText: "Réserver maintenant",

        cardDataOrdersTitle: "Vous avez faim ?",
        cardDataOrdersDescription: "Savourez nos meilleurs plats depuis chez vous.",
        cardDataOrdersButtonText: "Commander maintenant",
    },

    it: {
        // BARRA DI NAVIGAZIONE
        userReplaceName: "Utente",
        toastLogoutError: "Disconnessione non riuscita.",

        bookingPageNavLabel: "PRENOTAZIONI",
        ordersPageNavLabel: "ORDINI",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "CARRELLO",

        lodingTextLogoutUser: "Chiusura profilo...",
        logoutButton: "Disconnetti",
        loadingTextLogoutButton: "Disconnessione...",
        loginButton: "Accedi",
        registerButton: "Registrati",

        toastErrorLogout: "Errore durante la disconnessione",

        profilePageButton: "Profilo",

        // PAGINA DI ACCESSO
        h1LoginPage: "Accedi",

        toastLoginError: "Accesso non riuscito",
        loadingLoginButtonText: "Accesso in corso...",

        // PAGINA DI REGISTRAZIONE
        h1RegisterPage: "Unisciti a noi",

        registerButtonText: "Registrati",
        loadingRegisterButtonText: "Registrazione in corso...",

        namePlaceholderFieldText: "Inserisci il tuo nome",
        emailPlaceholderFieldText: "Inserisci la tua email",
        addressPlaceholderFieldText: "Indirizzo di consegna",
        passwordPlaceholderFieldText: "Inserisci la tua password",
        confirmPasswordPlaceholderFieldText: "Ripeti la tua password",

        toastRegisterError: "Registrazione non riuscita",

        // PAGINA HOME
        toastWelcomeRegister: "Benvenuto",
        toastLoginSuccess: "Accesso effettuato con successo ✔",
        toastLogoutSuccess: "Disconnessione riuscita ✔",

        h1HomePage: "ReservApp",

        // PAGINA MENU
        fetchMessageError: "Errore durante il caricamento dei prodotti. Riprova.",
        allCategoriesFilter: "Tutte le categorie",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Aggiornamento prodotti...",
        textRefreshProductsButton: "Aggiorna",
        clearFilterButton: "Pulisci filtro",

        // PAGINA PRENOTAZIONI
        h1BookingPage: "PRENOTAZIONE",

        confirmBookingTitle: "Rivedi e Conferma",
        userNameConfirmText: "Nome della prenotazione",
        dateConfirmText: "Data",
        timeConfirmText: "Ora",
        customersConfirmText: "Clienti",
        highChairConfirmText: "Seggiolone?",
        aditionalMessageConfirmText: "Messaggio aggiuntivo",
        confirmButtonModal: "Conferma",
        loadingTextConfirmButtonModal: "Prenotazione...",

        bookingTimeText: "Ora",
        bookingTimePlaceholder: "Seleziona ora",
        bookingCustomersText: "Clienti",
        bookingCustomersPlaceholder: "Seleziona numero di persone",

        bookingHighChairTitle: "Aggiungi seggiolone",
        bookingHighChairDescription: "Gratuito",

        bookingAditionalMessagePlaceholder: "Richieste particolari?",

        bookingMaxCapacityTableTitle: "Capacità max:",
        bookingTableTypeTitle: "Tipo di tavolo:",

        squareTableForm: "Tavolo quadrato",
        roundTableForm: "Tavolo rotondo",
        rectangularTableForm: "Tavolo rettangolare",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Seleziona tavolo",

        toastBookingSuccess: "Prenotazione completata",
        toastBookingUnavailable: "Errore: questo tavolo è già prenotato.",
        toastBookingError: "Prenotazione non riuscita. Riprova.",

        // PAGINA ORDINI
        h1OrdersPage: "CONSEGNA",
        smallOrdersPageSubtitle: "Goditi il nostro menu comodamente da casa.",

        addProductToCartButton: "Aggiungi al carrello",
        removeProductToCartButton: "Rimuovi dal carrello",
        loadingTextAddingProductsToCartButton: "Aggiunta...",
        loadingTextRemovingProductsFromCartButton: "Rimozione...",
        addOneMoreProductToCartButton: "Aggiungi uno",
        removeOneMoreProductFromCartButton: "Rimuovi uno",

        toastAddedProductToCart: "Aggiunto ✔",
        toastQuantityProductUpdatedToCart: "Carrello aggiornato ✔",
        toastRemovedProductFromCart: "Articolo rimosso dal carrello ✔",
        toastErrorAddingProductToCart: "Errore: impossibile aggiungere al carrello",
        toastErrorQuantityProductUpdatedToCart: "Errore: aggiornamento quantità non riuscito",
        toastErrorRemovingProductFromCart: "Errore: impossibile rimuovere l’articolo",

        // PAGINA CARRELLO
        h1CartPage: "IL TUO CARRELLO",
        confirmModalCartTitle: "Conferma dell’ordine",
        confirmModalCartMessage: "Quasi fatto! Conferma il tuo ordine per continuare",

        confirmButtonCartModal: "Conferma",
        loadingConfirmButtonCartModal: "Elaborazione...",
        cancelButtonCartModal: "Indietro",

        accordionQtyText: "Qtà:",
        accordionDescriptionText: "Descrizione:",
        accordionPriceText: "Prezzo:",

        noProductsTitle: "Il tuo carrello è vuoto",
        goToOrdersCartButton: "Ordina ora",

        toastCartRemovedSuccess: "Carrello svuotato ✔",
        toastCartRemovedError: "Errore durante la rimozione degli articoli",

        // PAGINA PROFILO
        h1ProfilePage: "Benvenuto, ",
        userDataSectionTitle: "Informazioni personali",
        bookingsDataSectionTitle: "Le tue prenotazioni",
        ordersDataSectionTitle: "I tuoi ordini",

        buttonChangeAvatar: "Cambia avatar",

        // ----- DATI UTENTE
        nameFieldText: "Nome",
        fullNameFieldText: "Nome completo",
        emailFieldText: "Email",
        addressFieldText: "Indirizzo",
        passwordFieldText: "Password",
        confirmPasswordFieldText: "Conferma password",
        userDataModalTitle: "Conferma modifica dati",
        userDataModalMessage: "Confermare la modifica di:",
        userDataModalMessageNexo: "in",
        userDataModalConfirmText: "Modifica",
        loadingUserDataModalConfirmText: "Modifica in corso...",
        userDataModalCancelText: "Annulla",

        userDataEditButtonText: "Modifica",
        userDataChangeButtonText: "Salva modifiche",

        toastUserDataChangeSuccess: "Profilo aggiornato ✔",
        toastUserDataChangeError: "Errore durante l’aggiornamento del profilo",

        // ------ DATI PRENOTAZIONI
        bookingDataTitle1: "Le tue prossime prenotazioni",
        bookingDataTitle2: "Le tue visite passate",
        bookingDataNoPendingBookingsFound: "Nessuna prenotazione in sospeso.",
        bookingDataNoPastVisitsFound: "Nessuna visita precedente.",

        buttonBookingDataMakeABook: "Prenota ora",
        buttonBookingDataCloseModalInfo: "Chiudi",
        buttonBookingDataCancelReservation: "Annulla prenotazione",

        bookingDataModalDeletingTitle: "Elimina prenotazione",
        bookingDataModalDeletingbutton: "Elimina",
        loadingBookingDataModalDeletingbutton: "Eliminazione...",

        bookingDataModalInfotitle: "Dettagli della prenotazione",
        bookingDataModalInfoMessageText1: "Elimina la tua prenotazione per ",
        bookingDataModalInfoMessageCustomer1: "Cliente",
        bookingDataModalInfoMessageCustomer2: "Clienti",

        bookingDataModalInfoDateText: "Data della prenotazione:",
        bookingDataModalInfoTimeText: "Ora della prenotazione:",
        bookingDataModalInfoPartySizeText: "Numero di persone:",
        bookingDataModalInfoHighChairText: "Serve un seggiolone?",

        toastBookingDataDeltingBookingError: "Errore durante l’eliminazione della prenotazione",

        // ----- DATI ORDINI
        ordersDataTitle1: "Ordini in sospeso",
        ordersDataTitle2: "Ordini completati",

        ordersDataInfoModalMessage: "Vuoi annullare l’ordine di ",

        toastOrdersDataSuccess: "Ordine annullato ✔",
        toastOrdersDataError: "Errore durante l’annullamento dell’ordine.",

        ordersDataNotPendingOrdersText: "Nessun ordine in sospeso.",
        ordersDataNotOrders: "Nessun ordine.",

        ordersDataCancelModalTitle: "Annulla ordine",
        ordersDataCancelModalBackButton: "Indietro",
        loadingOrdersDataCancelButton: "Annullamento...",

        ordersDataInfoModalTitle: "Dettagli dell’ordine",
        ordersDataInfoModalcreationText: "Data di creazione:",
        ordersDataInfoModalProductText: "Prodotto:",
        ordersDataInfoModalPriceText: "Prezzo:",
        ordersDataInfoModalTotalProductsText: "Totale prodotti:",
        ordersDataInfoModalTotalCountText: "Totale:",
        buttonOrdersDataInfomodalCloseText: "Chiudi",

        buttonOrdersDataInfoCancelText: "Annulla",

        // FOOTER
        copyrightText: "ReservApp. Tutti i diritti riservati.",

        // MESSAGGI GENERALI
        affirmationText: "Sì",
        NegationText: "No",

        // VALIDAZIONE CAMPI
        emailIsRequiredField: "Il campo email è obbligatorio",
        emailNotValidField1: "Email non valida (manca '@')",
        emailNotValidField2: "Email non valida (manca '.')",
        emailTooShortField: "Email troppo corta (min. 5 caratteri)",
        emailTooLongField: "Email troppo lunga (max. 50 caratteri)",

        passwordIsRequiredField: "Il campo password è obbligatorio",
        passwordTooShortField: "Password troppo corta (min. 9 caratteri)",
        passwordTooLongField: "Password troppo lunga (max. 30 caratteri)",

        confirmPasswordIsRequiredField: "Il campo conferma password è obbligatorio",
        doNotMatchPasswordsFields: "Le password non coincidono",

        nameIsRequiredField: "Il campo nome è obbligatorio",
        nameIsTooShortField: "Nome troppo corto (min. 4 caratteri)",
        nameIsTooLongField: "Nome troppo lungo (max. 30 caratteri)",

        addressIsRequiredField: "Il campo indirizzo è obbligatorio",
        addressTooShortField: "Indirizzo troppo corto (min. 6 caratteri)",
        addressTooLongField: "Indirizzo troppo lungo (max. 60 caratteri)",

        bookingDateIsRequiredField: "Devi scegliere una data di prenotazione",
        bookingTimeIsRequiredField: "Il campo ora è obbligatorio",
        bookingCustomersIsRequiredField: "Il campo clienti è obbligatorio",
        bookingTableIsRequiredField: "Devi scegliere un tavolo",

        profileNameNotEmptyField: "Il nome non può essere vuoto",
        profileEmailNotEmptyField: "L’email non può essere vuota",
        profileAddressNotEmptyField: "L’indirizzo non può essere vuoto",

        // CARD CTA
        cardDataMenuTitle: "Scopri il nostro menu",
        cardDataMenuDescription: "Esplora la nostra selezione di piatti e bevande.",
        cardDataMenuButtonText: "Vedi menu",

        cardDataLoginTitle: "Bentornato",
        cardDataLoginDescription: "Accedi per gestire i tuoi ordini e prenotazioni.",
        cardDataLoginButtonText: "Accedi",

        cardDataBookingTitle: "Prenota il tuo tavolo",
        cardDataBookingDescription: "Scegli data e ora, e ti riserviamo un posto.",
        cardDataBookingButtonText: "Prenota ora",

        cardDataOrdersTitle: "Hai fame?",
        cardDataOrdersDescription: "Goditi i nostri piatti migliori direttamente a casa tua.",
        cardDataOrdersButtonText: "Ordina ora",
    },

    de: {
        // NAVIGATIONSLEISTE
        userReplaceName: "Benutzer",
        toastLogoutError: "Abmeldung fehlgeschlagen.",

        bookingPageNavLabel: "RESERVIERUNGEN",
        ordersPageNavLabel: "BESTELLUNGEN",
        menusPageNavLabel: "MENÜ",
        cartPageNavLabel: "WARENKORB",

        lodingTextLogoutUser: "Profil wird geschlossen...",
        logoutButton: "Abmelden",
        loadingTextLogoutButton: "Abmelden...",
        loginButton: "Anmelden",
        registerButton: "Registrieren",

        toastErrorLogout: "Fehler beim Abmelden",

        profilePageButton: "Profil",

        // LOGIN-SEITE
        h1LoginPage: "Anmelden",

        toastLoginError: "Anmeldung fehlgeschlagen",
        loadingLoginButtonText: "Anmeldung...",

        // REGISTRIERUNGSSEITE
        h1RegisterPage: "Tritt uns bei",

        registerButtonText: "Registrieren",
        loadingRegisterButtonText: "Registrierung...",

        namePlaceholderFieldText: "Gib deinen Namen ein",
        emailPlaceholderFieldText: "Gib deine E-Mail ein",
        addressPlaceholderFieldText: "Lieferadresse",
        passwordPlaceholderFieldText: "Gib dein Passwort ein",
        confirmPasswordPlaceholderFieldText: "Wiederhole dein Passwort",

        toastRegisterError: "Registrierung fehlgeschlagen",

        // STARTSEITE
        toastWelcomeRegister: "Willkommen",
        toastLoginSuccess: "Erfolgreich angemeldet ✔",
        toastLogoutSuccess: "Erfolgreich abgemeldet ✔",

        h1HomePage: "ReservApp",

        // MENÜSEITE
        fetchMessageError: "Fehler beim Laden der Produkte. Bitte versuche es erneut.",
        allCategoriesFilter: "Alle Kategorien",
        h1MenuPage: "MENÜ",

        loadingTextRefreshProductsButton: "Produkte werden aktualisiert...",
        textRefreshProductsButton: "Aktualisieren",
        clearFilterButton: "Filter löschen",

        // RESERVIERUNGSSEITE
        h1BookingPage: "RESERVIERUNG",

        confirmBookingTitle: "Überprüfen und bestätigen",
        userNameConfirmText: "Reservierungsname",
        dateConfirmText: "Datum",
        timeConfirmText: "Uhrzeit",
        customersConfirmText: "Kunden",
        highChairConfirmText: "Kinderstuhl?",
        aditionalMessageConfirmText: "Zusätzliche Nachricht",
        confirmButtonModal: "Bestätigen",
        loadingTextConfirmButtonModal: "Reservierung...",

        bookingTimeText: "Uhrzeit",
        bookingTimePlaceholder: "Wähle Uhrzeit",
        bookingCustomersText: "Kunden",
        bookingCustomersPlaceholder: "Wähle Anzahl der Personen",

        bookingHighChairTitle: "Kinderstuhl hinzufügen",
        bookingHighChairDescription: "Kostenlos",

        bookingAditionalMessagePlaceholder: "Besondere Wünsche?",

        bookingMaxCapacityTableTitle: "Maximale Kapazität:",
        bookingTableTypeTitle: "Tischtyp:",

        squareTableForm: "Quadratischer Tisch",
        roundTableForm: "Runder Tisch",
        rectangularTableForm: "Rechteckiger Tisch",

        bookingTableWifiText: "WLAN:",

        bookingSelectTableButton: "Tisch auswählen",

        toastBookingSuccess: "Reservierung erfolgreich ✔",
        toastBookingUnavailable: "Fehler: Dieser Tisch ist bereits reserviert.",
        toastBookingError: "Reservierung fehlgeschlagen. Bitte versuche es erneut.",

        // BESTELLSEITE
        h1OrdersPage: "LIEFERUNG",
        smallOrdersPageSubtitle: "Genieße unser Menü bequem von zu Hause aus.",

        addProductToCartButton: "In den Warenkorb",
        removeProductToCartButton: "Aus dem Warenkorb entfernen",
        loadingTextAddingProductsToCartButton: "Wird hinzugefügt...",
        loadingTextRemovingProductsFromCartButton: "Wird entfernt...",
        addOneMoreProductToCartButton: "Eins mehr",
        removeOneMoreProductFromCartButton: "Eins weniger",

        toastAddedProductToCart: "Hinzugefügt ✔",
        toastQuantityProductUpdatedToCart: "Warenkorb aktualisiert ✔",
        toastRemovedProductFromCart: "Artikel entfernt ✔",
        toastErrorAddingProductToCart: "Fehler: Artikel konnte nicht hinzugefügt werden",
        toastErrorQuantityProductUpdatedToCart: "Fehler: Menge konnte nicht aktualisiert werden",
        toastErrorRemovingProductFromCart: "Fehler: Artikel konnte nicht entfernt werden",

        // WARENKORBSEITE
        h1CartPage: "DEIN WARENKORB",
        confirmModalCartTitle: "Bestellung bestätigen",
        confirmModalCartMessage: "Fast fertig! Bestätige deine Bestellung, um fortzufahren.",

        confirmButtonCartModal: "Bestätigen",
        loadingConfirmButtonCartModal: "Wird verarbeitet...",
        cancelButtonCartModal: "Zurück",

        accordionQtyText: "Menge:",
        accordionDescriptionText: "Beschreibung:",
        accordionPriceText: "Preis:",

        noProductsTitle: "Dein Warenkorb ist leer",
        goToOrdersCartButton: "Jetzt bestellen",

        toastCartRemovedSuccess: "Warenkorb geleert ✔",
        toastCartRemovedError: "Fehler beim Leeren des Warenkorbs",

        // PROFILSEITE
        h1ProfilePage: "Willkommen, ",
        userDataSectionTitle: "Persönliche Daten",
        bookingsDataSectionTitle: "Deine Reservierungen",
        ordersDataSectionTitle: "Deine Bestellungen",

        buttonChangeAvatar: "Avatar ändern",

        // ----- BENUTZERDATEN
        nameFieldText: "Name",
        fullNameFieldText: "Vollständiger Name",
        emailFieldText: "E-Mail",
        addressFieldText: "Adresse",
        passwordFieldText: "Passwort",
        confirmPasswordFieldText: "Passwort bestätigen",
        userDataModalTitle: "Datenänderung bestätigen",
        userDataModalMessage: "Änderung bestätigen von:",
        userDataModalMessageNexo: "zu",
        userDataModalConfirmText: "Ändern",
        loadingUserDataModalConfirmText: "Wird geändert...",
        userDataModalCancelText: "Abbrechen",

        userDataEditButtonText: "Bearbeiten",
        userDataChangeButtonText: "Änderungen speichern",

        toastUserDataChangeSuccess: "Profil aktualisiert ✔",
        toastUserDataChangeError: "Fehler beim Aktualisieren des Profils",

        // ------ RESERVIERUNGSDATEN
        bookingDataTitle1: "Deine bevorstehenden Reservierungen",
        bookingDataTitle2: "Deine bisherigen Besuche",
        bookingDataNoPendingBookingsFound: "Keine anstehenden Reservierungen.",
        bookingDataNoPastVisitsFound: "Keine vergangenen Besuche.",

        buttonBookingDataMakeABook: "Jetzt reservieren",
        buttonBookingDataCloseModalInfo: "Schließen",
        buttonBookingDataCancelReservation: "Reservierung stornieren",

        bookingDataModalDeletingTitle: "Reservierung löschen",
        bookingDataModalDeletingbutton: "Löschen",
        loadingBookingDataModalDeletingbutton: "Wird gelöscht...",

        bookingDataModalInfotitle: "Reservierungsdetails",
        bookingDataModalInfoMessageText1: "Lösche deine Reservierung für ",
        bookingDataModalInfoMessageCustomer1: "Gast",
        bookingDataModalInfoMessageCustomer2: "Gäste",

        bookingDataModalInfoDateText: "Reservierungsdatum:",
        bookingDataModalInfoTimeText: "Reservierungszeit:",
        bookingDataModalInfoPartySizeText: "Anzahl der Personen:",
        bookingDataModalInfoHighChairText: "Kinderstuhl benötigt?",

        toastBookingDataDeltingBookingError: "Fehler beim Löschen der Reservierung",

        // ----- BESTELLDATEN
        ordersDataTitle1: "Ausstehende Bestellungen",
        ordersDataTitle2: "Abgeschlossene Bestellungen",

        ordersDataInfoModalMessage: "Möchtest du die Bestellung von ",

        toastOrdersDataSuccess: "Bestellung storniert ✔",
        toastOrdersDataError: "Fehler beim Stornieren der Bestellung.",

        ordersDataNotPendingOrdersText: "Keine ausstehenden Bestellungen.",
        ordersDataNotOrders: "Keine Bestellungen.",

        ordersDataCancelModalTitle: "Bestellung stornieren",
        ordersDataCancelModalBackButton: "Zurück",
        loadingOrdersDataCancelButton: "Wird storniert...",

        ordersDataInfoModalTitle: "Bestelldetails",
        ordersDataInfoModalcreationText: "Erstellungsdatum:",
        ordersDataInfoModalProductText: "Produkt:",
        ordersDataInfoModalPriceText: "Preis:",
        ordersDataInfoModalTotalProductsText: "Gesamtprodukte:",
        ordersDataInfoModalTotalCountText: "Gesamtsumme:",
        buttonOrdersDataInfomodalCloseText: "Schließen",

        buttonOrdersDataInfoCancelText: "Stornieren",

        // FOOTER
        copyrightText: "ReservApp. Alle Rechte vorbehalten.",

        // ALLGEMEINE NACHRICHTEN
        affirmationText: "Ja",
        NegationText: "Nein",

        // FELDVALIDIERUNG
        emailIsRequiredField: "E-Mail-Feld ist erforderlich",
        emailNotValidField1: "Ungültige E-Mail (fehlendes '@')",
        emailNotValidField2: "Ungültige E-Mail (fehlender Punkt)",
        emailTooShortField: "E-Mail zu kurz (min. 5 Zeichen)",
        emailTooLongField: "E-Mail zu lang (max. 50 Zeichen)",

        passwordIsRequiredField: "Passwort ist erforderlich",
        passwordTooShortField: "Passwort zu kurz (min. 9 Zeichen)",
        passwordTooLongField: "Passwort zu lang (max. 30 Zeichen)",

        confirmPasswordIsRequiredField: "Bestätigung des Passworts ist erforderlich",
        doNotMatchPasswordsFields: "Passwörter stimmen nicht überein",

        nameIsRequiredField: "Namensfeld ist erforderlich",
        nameIsTooShortField: "Name zu kurz (min. 4 Zeichen)",
        nameIsTooLongField: "Name zu lang (max. 30 Zeichen)",

        addressIsRequiredField: "Adressfeld ist erforderlich",
        addressTooShortField: "Adresse zu kurz (min. 6 Zeichen)",
        addressTooLongField: "Adresse zu lang (max. 60 Zeichen)",

        bookingDateIsRequiredField: "Du musst ein Reservierungsdatum wählen",
        bookingTimeIsRequiredField: "Uhrzeitfeld ist erforderlich",
        bookingCustomersIsRequiredField: "Kundenfeld ist erforderlich",
        bookingTableIsRequiredField: "Du musst einen Tisch auswählen",

        profileNameNotEmptyField: "Name darf nicht leer sein",
        profileEmailNotEmptyField: "E-Mail darf nicht leer sein",
        profileAddressNotEmptyField: "Adresse darf nicht leer sein",

        // KARTE CTA
        cardDataMenuTitle: "Entdecke unser Menü",
        cardDataMenuDescription: "Erkunde unsere Auswahl an Gerichten und Getränken.",
        cardDataMenuButtonText: "Menü ansehen",

        cardDataLoginTitle: "Willkommen zurück",
        cardDataLoginDescription: "Melde dich an, um deine Bestellungen und Reservierungen zu verwalten.",
        cardDataLoginButtonText: "Anmelden",

        cardDataBookingTitle: "Reserviere deinen Tisch",
        cardDataBookingDescription: "Wähle Datum und Uhrzeit, und wir halten dir einen Platz frei.",
        cardDataBookingButtonText: "Jetzt reservieren",

        cardDataOrdersTitle: "Hungrig?",
        cardDataOrdersDescription: "Genieße unsere besten Gerichte direkt zu Hause.",
        cardDataOrdersButtonText: "Jetzt bestellen",
    },

    zh: {
        // 导航栏
        userReplaceName: "用户",
        toastLogoutError: "登出失败。",

        bookingPageNavLabel: "预订",
        ordersPageNavLabel: "订单",
        menusPageNavLabel: "菜单",
        cartPageNavLabel: "购物车",

        lodingTextLogoutUser: "正在关闭个人资料...",
        logoutButton: "登出",
        loadingTextLogoutButton: "正在登出...",
        loginButton: "登录",
        registerButton: "注册",

        toastErrorLogout: "登出失败",

        profilePageButton: "个人资料",

        // 登录页面
        h1LoginPage: "登录",

        toastLoginError: "登录失败",
        loadingLoginButtonText: "正在登录...",

        // 注册页面
        h1RegisterPage: "加入我们",

        registerButtonText: "注册",
        loadingRegisterButtonText: "正在注册...",

        namePlaceholderFieldText: "请输入姓名",
        emailPlaceholderFieldText: "请输入邮箱",
        addressPlaceholderFieldText: "送货地址",
        passwordPlaceholderFieldText: "请输入密码",
        confirmPasswordPlaceholderFieldText: "请再次输入密码",

        toastRegisterError: "注册失败",

        // 首页
        toastWelcomeRegister: "欢迎",
        toastLoginSuccess: "登录成功 ✔",
        toastLogoutSuccess: "成功登出 ✔",

        h1HomePage: "ReservApp",

        // 菜单页
        fetchMessageError: "加载产品时出错。请重试。",
        allCategoriesFilter: "所有分类",
        h1MenuPage: "菜单",

        loadingTextRefreshProductsButton: "正在刷新产品...",
        textRefreshProductsButton: "刷新",
        clearFilterButton: "清除筛选",

        // 预订页面
        h1BookingPage: "预订",

        confirmBookingTitle: "确认预订信息",
        userNameConfirmText: "预订人姓名",
        dateConfirmText: "日期",
        timeConfirmText: "时间",
        customersConfirmText: "顾客人数",
        highChairConfirmText: "需要儿童座椅？",
        aditionalMessageConfirmText: "附加信息",
        confirmButtonModal: "确认",
        loadingTextConfirmButtonModal: "正在预订...",

        bookingTimeText: "时间",
        bookingTimePlaceholder: "选择时间",
        bookingCustomersText: "顾客人数",
        bookingCustomersPlaceholder: "选择人数",

        bookingHighChairTitle: "添加儿童座椅",
        bookingHighChairDescription: "免费提供",

        bookingAditionalMessagePlaceholder: "有特殊需求吗？",

        bookingMaxCapacityTableTitle: "最大容量：",
        bookingTableTypeTitle: "桌子类型：",

        squareTableForm: "方桌",
        roundTableForm: "圆桌",
        rectangularTableForm: "长方桌",

        bookingTableWifiText: "Wi-Fi：",

        bookingSelectTableButton: "选择桌子",

        toastBookingSuccess: "预订成功 ✔",
        toastBookingUnavailable: "预订失败：该桌已被预订。",
        toastBookingError: "预订失败。请重试。",

        // 订单页面
        h1OrdersPage: "外卖",
        smallOrdersPageSubtitle: "在家也能享用我们的美味。",

        addProductToCartButton: "加入购物车",
        removeProductToCartButton: "从购物车移除",
        loadingTextAddingProductsToCartButton: "正在添加...",
        loadingTextRemovingProductsFromCartButton: "正在移除...",
        addOneMoreProductToCartButton: "再加一个",
        removeOneMoreProductFromCartButton: "减少一个",

        toastAddedProductToCart: "已添加 ✔",
        toastQuantityProductUpdatedToCart: "购物车已更新 ✔",
        toastRemovedProductFromCart: "已从购物车移除 ✔",
        toastErrorAddingProductToCart: "错误：无法添加到购物车",
        toastErrorQuantityProductUpdatedToCart: "错误：更新数量失败",
        toastErrorRemovingProductFromCart: "错误：无法移除商品",

        // 购物车页面
        h1CartPage: "您的购物车",
        confirmModalCartTitle: "确认订单",
        confirmModalCartMessage: "快完成了！确认订单以继续。",

        confirmButtonCartModal: "确认",
        loadingConfirmButtonCartModal: "正在处理...",
        cancelButtonCartModal: "返回",

        accordionQtyText: "数量：",
        accordionDescriptionText: "描述：",
        accordionPriceText: "价格：",

        noProductsTitle: "您的购物车是空的",
        goToOrdersCartButton: "立即订购",

        toastCartRemovedSuccess: "购物车已清空 ✔",
        toastCartRemovedError: "清空购物车失败",

        // 个人资料页面
        h1ProfilePage: "欢迎，",
        userDataSectionTitle: "个人信息",
        bookingsDataSectionTitle: "您的预订",
        ordersDataSectionTitle: "您的订单",

        buttonChangeAvatar: "更换头像",

        // ----- 用户数据
        nameFieldText: "姓名",
        fullNameFieldText: "全名",
        emailFieldText: "邮箱",
        addressFieldText: "地址",
        passwordFieldText: "密码",
        confirmPasswordFieldText: "确认密码",
        userDataModalTitle: "确认修改资料",
        userDataModalMessage: "确认修改：",
        userDataModalMessageNexo: "为",
        userDataModalConfirmText: "修改",
        loadingUserDataModalConfirmText: "正在修改...",
        userDataModalCancelText: "取消",

        userDataEditButtonText: "编辑",
        userDataChangeButtonText: "保存修改",

        toastUserDataChangeSuccess: "资料更新成功 ✔",
        toastUserDataChangeError: "更新资料时出错",

        // ------ 预订数据
        bookingDataTitle1: "即将到来的预订",
        bookingDataTitle2: "过去的访问记录",
        bookingDataNoPendingBookingsFound: "暂无待进行的预订。",
        bookingDataNoPastVisitsFound: "暂无历史访问。",

        buttonBookingDataMakeABook: "立即预订",
        buttonBookingDataCloseModalInfo: "关闭",
        buttonBookingDataCancelReservation: "取消预订",

        bookingDataModalDeletingTitle: "删除预订",
        bookingDataModalDeletingbutton: "删除",
        loadingBookingDataModalDeletingbutton: "正在删除...",

        bookingDataModalInfotitle: "预订详情",
        bookingDataModalInfoMessageText1: "删除您的预订：",
        bookingDataModalInfoMessageCustomer1: "顾客",
        bookingDataModalInfoMessageCustomer2: "顾客人数",

        bookingDataModalInfoDateText: "预订日期：",
        bookingDataModalInfoTimeText: "预订时间：",
        bookingDataModalInfoPartySizeText: "人数：",
        bookingDataModalInfoHighChairText: "是否需要儿童座椅？",

        toastBookingDataDeltingBookingError: "删除预订时出错",

        // ----- 订单数据
        ordersDataTitle1: "待处理订单",
        ordersDataTitle2: "已完成订单",

        ordersDataInfoModalMessage: "您确定要取消订单：",

        toastOrdersDataSuccess: "订单已取消 ✔",
        toastOrdersDataError: "取消订单时出错。",

        ordersDataNotPendingOrdersText: "暂无待处理订单。",
        ordersDataNotOrders: "暂无订单。",

        ordersDataCancelModalTitle: "取消订单",
        ordersDataCancelModalBackButton: "返回",
        loadingOrdersDataCancelButton: "正在取消...",

        ordersDataInfoModalTitle: "订单详情",
        ordersDataInfoModalcreationText: "创建日期：",
        ordersDataInfoModalProductText: "商品：",
        ordersDataInfoModalPriceText: "价格：",
        ordersDataInfoModalTotalProductsText: "商品总数：",
        ordersDataInfoModalTotalCountText: "总计：",
        buttonOrdersDataInfomodalCloseText: "关闭",

        buttonOrdersDataInfoCancelText: "取消",

        // 页脚
        copyrightText: "ReservApp. 版权所有。",

        // 通用提示
        affirmationText: "是",
        NegationText: "否",

        // 字段验证
        emailIsRequiredField: "邮箱为必填项",
        emailNotValidField1: "邮箱格式错误（缺少 '@'）",
        emailNotValidField2: "邮箱格式错误（缺少 '.'）",
        emailTooShortField: "邮箱太短（至少 5 个字符）",
        emailTooLongField: "邮箱太长（最多 50 个字符）",

        passwordIsRequiredField: "密码为必填项",
        passwordTooShortField: "密码太短（至少 9 个字符）",
        passwordTooLongField: "密码太长（最多 30 个字符）",

        confirmPasswordIsRequiredField: "确认密码为必填项",
        doNotMatchPasswordsFields: "两次输入的密码不一致",

        nameIsRequiredField: "姓名为必填项",
        nameIsTooShortField: "姓名太短（至少 4 个字符）",
        nameIsTooLongField: "姓名太长（最多 30 个字符）",

        addressIsRequiredField: "地址为必填项",
        addressTooShortField: "地址太短（至少 6 个字符）",
        addressTooLongField: "地址太长（最多 60 个字符）",

        bookingDateIsRequiredField: "必须选择预订日期",
        bookingTimeIsRequiredField: "时间为必填项",
        bookingCustomersIsRequiredField: "顾客人数为必填项",
        bookingTableIsRequiredField: "必须选择桌子",

        profileNameNotEmptyField: "姓名不能为空",
        profileEmailNotEmptyField: "邮箱不能为空",
        profileAddressNotEmptyField: "地址不能为空",

        // CTA 卡片数据
        cardDataMenuTitle: "查看菜单",
        cardDataMenuDescription: "浏览我们所有的菜品和饮品。",
        cardDataMenuButtonText: "查看菜单",

        cardDataLoginTitle: "欢迎回来",
        cardDataLoginDescription: "登录以管理您的订单和预订。",
        cardDataLoginButtonText: "登录",

        cardDataBookingTitle: "预订您的餐桌",
        cardDataBookingDescription: "选择日期和时间，我们为您保留位置。",
        cardDataBookingButtonText: "立即预订",

        cardDataOrdersTitle: "饿了吗？",
        cardDataOrdersDescription: "在家中享受我们最好的美食。",
        cardDataOrdersButtonText: "立即订购",
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
