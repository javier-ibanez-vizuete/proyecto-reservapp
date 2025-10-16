import { createContext, useState } from "react";
import { getDataFromSessionStorage, saveDataInSessionStorage } from "../helpers/storage";

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

        bookingButtonConfirmText: "Booking",
        bookingButtonResetForm: "Reset From",

        toastBookingSuccess: "Booking Completed",
        toastBookingUnavailable: "Booking Failed: This table is already reserved.",
        toastBookingError: "Booking Failed. Try Again",

        // ORDERS PAGE
        h1OrdersPage: "DELIVERY",
        smallOrdersPageSubtitle: "Enjoy our menu from the comfort of home.",

        ordersPageInputPlaceholder: "Search Products...",

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

        buttonCartPageOpenPaymentModal: "Order",
        buttonCartPageDeleteCart: "Delete Cart",

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
        buttonBookingDataCancelReservation: "Cancel Booking",

        bookingDataModalDeletingTitle: "Delete Booking",
        bookingDataModalDeletingbutton: "Delete",
        loadingBookingDataModalDeletingbutton: "Deleting...",

        bookingDataModalInfotitle: "Booking details",
        bookingDataModalInfoMessageText1: "Delete your Booking for ",
        bookingDataModalInfoMessageCustomer1: "Customer",
        bookingDataModalInfoMessageCustomer2: "Customers",

        bookingDataModalInfoDateText: "Booking date:",
        bookingDataModalInfoTimeText: "Booking time:",
        bookingDataModalInfoPartySizeText: "Party size:",
        bookingDataModalInfoHighChairText: "High chair needed?",

        toastBookingDataDeltingBookingError: "Error deleting Booking",

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

        // PRODUCTS DATA
        productCokeName: "Coke",
        productCokeDescription: "Bottle of Coke served with Ice cubes and a slice of lime.",

        productOrangeFantaName: "Orange Fanta",
        productOrangeFantaDescription: "Bottle of Orange Fanta served with Ice cubes and a slice of orange.",

        productMineralWaterName: "Mineral Water",
        productMineralWaterDescription: "Bottle of Mineral Water served with Ice cubes.",

        productSparklingWaterName: "Sparkling Water",
        productSparklingWaterDescription:
            "Bottle of Sparkling Water served with Ice cubes and a slice of lime.",

        productBeerName: "Fuller's Beer",
        productBeerDescription: "Half Pint of our Premium Ale (Fuller's).",

        productOrangeJuiceName: "Fresh Squeezed Orange Juice",
        productOrangeJuiceDescription: "A Glass of Freshly squeezed orange Juice",

        productLemonFantaName: "Lemon Fanta",
        productLemonFantaDescription: "Bottle of Lemon Fanta served with Ice cubes and a slice of Lemon.",

        productRedWineName: "Red Wine Glass",
        productRedWineDescription: "Our House Red Wine.",

        productWhiteWineName: "White Wine Glass",
        productWhiteWineDescription: "Our House White",

        productCoffeeName: "Espreso",
        productCoffeDescription: "Our Espresso Coffe Made with the best Arabics Coffee Beans.",

        productToastName: "Tomato Toast",
        productDescription: "A Toasted bread with tomato, garlic and our best Spanish Olive Oil.",

        productCheeseName: "Cheese Board",
        productCheeseDescription: "Our best Selection of national cheeses with accompaniments.",

        productCroquettesName: "Ham Croquettes",
        productCroquettesDescription: "The best Homemade Ham Croquettes we ever made.",

        productIberianHamName: "Iberian Ham",
        productIberianHamDescription: "100g of Our finest 5J Iberian Ham, hand-sliced.",

        productBravasName: "Bravas Potato Fries",
        productBravasDescription: "Our hand picked potatoes and the best Brava sauce in the world.",

        productMixedSaladName: "Traditional Salad",
        productMixedSaladDescription:
            "A bowl of Lettuce, tomato, onion and olives. Can be served with dressing.",

        productClassicBurgerName: "Beef Burger",
        productClassicBurgerDescription:
            "The Number one Beef Burger with our best Cheddar Cheese, tomato and lettuce.",

        productPorkSteakSirloinName: "Iberian Sirloin Steak",
        productPorkSteakSirloinDescription: "A Grilled pork sirloin Steak served with our best Mint sauce.",

        productRisottoName: "Boletus Risotto",
        productRisottoDescription: "The most creamy risotto we ever made served with boletus slices.",

        productVeggieBurgerName: "Veggie Burger",
        productVeggieBurgerDescription:
            "A juicy plant-based patty made with beetroot, pea protein, carrot, and apple, served in a soft brioche bun with red onion and crisp lettuce.",

        productSteakTartareName: "Steak Tartare",
        productSteakTartareDescription: "Steak Tartare served with egg yolk and smoked with chocolate wood.",

        productTakosName: "Chicken Tacos",
        productTakosDescription: "Marinated chicken Tacos served with spicy sauce and fresh pico de gallo.",

        productRoastChickenName: "Roast Chicken",
        productRoastChickenDescription:
            "Our Best Roasted Chicken served with our artisan lemon/pepper sauce.",

        productCarbonaraName: "Spaguetti Carbonara",
        productCarbonaraDescription: "spaguetti fresh pasta made with our tradicional Carbonara Sauce.",

        productPaellaName: "Seafood Paella",
        productPaellaDescription: "A Spanish Traditional Paella served with a variety of seafood",

        productCalamariName: "Fried Calamari",
        productCalamariDescription: "Battered calamari Rings, served with an edge of lemon.",

        productSoupName: "Iberian Ham Soup",
        productSoupDescription: "Our Homemade Soup served with a Boiled Egg and Iberian Ham.",

        productMusselsMariniereName: "Mussels Marinière",
        productMusselsMarinièreDescription: "Mussels cooked in our fresh homemade marinara-style sauce.",

        productPizzaName: "Margherita Pizza",
        productPizzaDescription: "Our Homemade Pizza base with tomate, fresh mozzarella and basil.",

        productLasagnaName: "Bolognese Lasagna",
        productLasagnaDescription: "Our Homemade Lasagna made with bolognese sauce and bechamel.",

        productSalmonName: "Grilled Salmon",
        productSalmonDescription:
            "A fresh Salmon fillet grilled to perfection and served with our creamy punpkin soup.",

        productEntrecoteBeefName: "Entrecote Beef",
        productentrecoteBeefDescription: "Grilled and Salty Entrecote Beef",

        productFrenchFriesName: "French Fries Side",
        productFrenchFriesDescription: "A Salty Side of Our best French Fries",

        productGarlicBreadName: "Garlic Bread",
        productGarlicBreadDescription: "Slices of our buttered and crunchy garlic bread.",

        productEggFlanName: "Egg Flan",
        productEggFlanDescription:
            "Homemade Flan served with our artisan liquid caramel and the classic Napolitana biscuit.",

        productCremaCatalanaName: "Crema Catalana",
        productCremaCatalanaDescription: "our traditional Spanish Dessert served with caramelized sugar.",

        productPannaCottaName: "Panna Cotta",
        productPannaCottaDescription: "Homemade Panna cotta served with red fruit coulis.",

        productCheesecakeName: "Cheesecake",
        productCheesecakeDescription: "Our Creamy homemade cheesecake served with blueberry Jam",

        productBrownieName: "Chocolate Brownie",
        productBrownieDescription: "Our Artisan and perfectly Baked Brownie with vanilla artisan Ice cream.",

        // ADMIN LAYOUT
        // - - - ASIDE DATA - - -
        asideUsersTitleLink: "Users",
        asideSeeUsersLabelLink: "View Users",

        asideProductsTitleLink: "Products",
        asideSeeProductsLabelLink: "View Users",
        asideAddProductsLabelLink: "Add Product",

        asideBookingsTitleLink: "Bookings",
        asideSeeBookings: "View Bookings",

        asideOrdersTitleLink: "Orders",
        asideSeeOrdersLabelLink: "View Orders",
    },

    es: {
        // BARRA DE NAVIGATION
        userReplaceName: "Usuario",
        toastLogoutError: "Error al cerrar sesión.",

        bookingPageNavLabel: "RESERVAS",
        ordersPageNavLabel: "PEDIDOS",
        menusPageNavLabel: "MENÚ",
        cartPageNavLabel: "CARRITO",

        lodingTextLogoutUser: "Cerrando Perfil...",
        logoutButton: "Cerrar Sesión",
        loadingTextLogoutButton: "Cerrando sesión...",
        loginButton: "Iniciar Sesión",
        registerButton: "Registrarse",

        toastErrorLogout: "Error al cerrar sesión",

        profilePageButton: "Perfil",

        // LOGIN PAGE
        h1LoginPage: "Iniciar Sesión",

        toastLoginError: "Error al iniciar sesión",
        loadingLoginButtonText: "Iniciando sesión...",

        // REGISTER PAGE
        h1RegisterPage: "Únete a Nosotros",

        registerButtonText: "Registrarse",
        loadingRegisterButtonText: "Registrando...",

        namePlaceholderFieldText: "Introduce tu nombre",
        emailPlaceholderFieldText: "Introduce tu email",
        addressPlaceholderFieldText: "Dirección de entrega",
        passwordPlaceholderFieldText: "Introduce tu contraseña",
        confirmPasswordPlaceholderFieldText: "Repite tu contraseña",

        toastRegisterError: "Error en el registro",

        // HOME PAGE
        toastWelcomeRegister: "Bienvenido",
        toastLoginSuccess: "Sesión iniciada correctamente ✔",
        toastLogoutSuccess: "Sesión cerrada correctamente ✔",

        h1HomePage: "ReservApp",

        // MENUPAGE
        fetchMessageError: "Error al cargar productos. Inténtalo de nuevo.",
        allCategoriesFilter: "Todas las Categorías",
        h1MenuPage: "MENÚ",

        loadingTextRefreshProductsButton: "Actualizando Productos...",
        textRefreshProductsButton: "Actualizar",
        clearFilterButton: "Limpiar Filtro",

        // BOOKING PAGE
        h1BookingPage: "RESERVAS",

        confirmBookingTitle: "Revisar y Confirmar",
        userNameConfirmText: "Nombre de la Reserva",
        dateConfirmText: "Fecha",
        timeConfirmText: "Hora",
        customersConfirmText: "Comensales",
        highChairConfirmText: "¿Trona?",
        aditionalMessageConfirmText: "Mensaje Adicional",
        confirmButtonModal: "Confirmar",
        loadingTextConfirmButtonModal: "Reservando...",

        bookingTimeText: "Hora",
        bookingTimePlaceholder: "Selecciona Hora",
        bookingCustomersText: "Comensales",
        bookingCustomersPlaceholder: "Selecciona Comensales",

        bookingHighChairTitle: "Añadir Trona",
        bookingHighChairDescription: "Sin cargo adicional",

        bookingAditionalMessagePlaceholder: "¿Alguna petición especial?",

        bookingMaxCapacityTableTitle: "Capacidad Máx.:",
        bookingTableTypeTitle: "Tipo de Mesa:",

        squareTableForm: "Mesa Cuadrada",
        roundTableForm: "Mesa Redonda",
        rectangularTableForm: "Mesa Rectangular",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Seleccionar Mesa",

        bookingButtonConfirmText: "Reservar",
        bookingButtonResetForm: "Resetear Formulario",

        toastBookingSuccess: "Reserva Completada",
        toastBookingUnavailable: "Reserva Fallida: Esta mesa ya está reservada.",
        toastBookingError: "Reserva Fallida. Inténtalo de nuevo",

        // ORDERS PAGE
        h1OrdersPage: "DELIVERY",
        smallOrdersPageSubtitle: "Disfruta de nuestro menú desde la comodidad de tu casa.",

        ordersPageInputPlaceholder: "Buscar Productos...",

        addProductToCartButton: "Añadir al Carrito",
        removeProductToCartButton: "Quitar del Carrito",
        loadingTextAddingProductsToCartButton: "Añadiendo...",
        loadingTextRemovingProductsFromCartButton: "Quitando...",
        addOneMoreProductToCartButton: "Añadir uno",
        removeOneMoreProductFromCartButton: "Quitar uno",

        toastAddedProductToCart: "Añadido ✔",
        toastQuantityProductUpdatedToCart: "Carrito actualizado correctamente ✔",
        toastRemovedProductFromCart: "Artículo eliminado del carrito ✔",
        toastErrorAddingProductToCart: "Error: No se pudo añadir al carrito",
        toastErrorQuantityProductUpdatedToCart: "Error: Falló la actualización de cantidad",
        toastErrorRemovingProductFromCart: "Error: No se pudo eliminar el artículo del carrito",

        // CART PAGE
        h1CartPage: "TU CARRITO",
        confirmModalCartTitle: "Confirmación de Pedido",
        confirmModalCartMessage: "¡Ya casi está! Confirma tu pedido para continuar",

        confirmButtonCartModal: "Confirmar",
        loadingConfirmButtonCartModal: "Procesando...",
        cancelButtonCartModal: "Volver",

        accordionQtyText: "Cant:",
        accordionDescriptionText: "Descripción:",
        accordionPriceText: "Precio:",

        noProductsTitle: "Tu Carrito está vacío",
        goToOrdersCartButton: "Pedir Ahora",

        toastCartRemovedSuccess: "Carrito vaciado ✔",
        toastCartRemovedError: "Error al eliminar todos los artículos",

        buttonCartPageOpenPaymentModal: "Pedir",
        buttonCartPageDeleteCart: "Vaciar Carrito",

        // PROFILE PAGE
        h1ProfilePage: "Bienvenido, ",
        userDataSectionTitle: "Información Personal",
        bookingsDataSectionTitle: "Tus Reservas",
        ordersDataSectionTitle: "Tus Pedidos",

        buttonChangeAvatar: "Cambiar Avatar",

        //  ----- USER DATA
        nameFieldText: "Nombre",
        fullNameFieldText: "Nombre Completo",
        emailFieldText: "Email",
        addressFieldText: "Dirección",
        passwordFieldText: "Contraseña",
        confirmPasswordFieldText: "Confirmar Contraseña",
        userDataModalTitle: "Confirmar Cambio de Datos",
        userDataModalMessage: "Confirmar cambio: ",
        userDataModalMessageNexo: "a",
        userDataModalConfirmText: "Cambiar",
        loadingUserDataModalConfirmText: "Cambiando...",
        userDataModalCancelText: "Cancelar",

        userDataEditButtonText: "Editar",
        userDataChangeButtonText: "Cambiar",

        toastUserDataChangeSuccess: "Perfil actualizado correctamente ✔",
        toastUserDataChangeError: "Error al actualizar el perfil",

        //  ------ BOOKING DATA
        bookingDataTitle1: "Tus próximas reservas",
        bookingDataTitle2: "Tus visitas pasadas",
        bookingDataNoPendingBookingsFound: "No tienes reservas pendientes.",
        bookingDataNoPastVisitsFound: "No tienes visitas pasadas",

        buttonBookingDataMakeABook: "Reservar ahora",
        buttonBookingDataCloseModalInfo: "Cerrar",
        buttonBookingDataCancelReservation: "Cancelar Reserva",

        bookingDataModalDeletingTitle: "Eliminar Reserva",
        bookingDataModalDeletingbutton: "Eliminar",
        loadingBookingDataModalDeletingbutton: "Eliminando...",

        bookingDataModalInfotitle: "Detalles de la Reserva",
        bookingDataModalInfoMessageText1: "Eliminar tu Reserva para ",
        bookingDataModalInfoMessageCustomer1: "Comensal",
        bookingDataModalInfoMessageCustomer2: "Comensales",

        bookingDataModalInfoDateText: "Fecha de reserva:",
        bookingDataModalInfoTimeText: "Hora de reserva:",
        bookingDataModalInfoPartySizeText: "Número de personas:",
        bookingDataModalInfoHighChairText: "¿Se necesita trona?",

        toastBookingDataDeltingBookingError: "Error al eliminar la Reserva",

        //  -----ORDERS DATA
        ordersDataTitle1: "Pedidos Pendientes",
        ordersDataTitle2: "Pedidos Completados",

        ordersDataInfoModalMessage: "¿Quieres cancelar el pedido de ",

        toastOrdersDataSuccess: "Pedido cancelado correctamente ✔",
        toastOrdersDataError: "Error al cancelar el pedido.",

        ordersDataNotPendingOrdersText: "No hay pedidos pendientes.",
        ordersDataNotOrders: "No hay pedidos.",

        ordersDataCancelModalTitle: "Cancelar Pedido",
        ordersDataCancelModalBackButton: "Volver",
        loadingOrdersDataCancelButton: "Cancelando...",

        ordersDataInfoModalTitle: "Detalles del Pedido",
        ordersDataInfoModalcreationText: "Fecha de Creación:",
        ordersDataInfoModalProductText: "Producto:",
        ordersDataInfoModalPriceText: "Precio:",
        ordersDataInfoModalTotalProductsText: "Total Productos:",
        ordersDataInfoModalTotalCountText: "Total:",
        buttonOrdersDataInfomodalCloseText: "Cerrar",

        buttonOrdersDataInfoCancelText: "Cancelar",

        // Footer
        copyrightText: "ReservApp. Todos los derechos reservados",

        // Mensajes Generales
        affirmationText: "Sí",
        NegationText: "No",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "El campo Email es Obligatorio",
        emailNotValidField1: "Email no válido (falta '@')",
        emailNotValidField2: "Email no válido (falta '.')",
        emailTooShortField: "Email demasiado corto (mín. 5 caracteres)",
        emailTooLongField: "Email demasiado largo (máx. 50 caracteres)",

        passwordIsRequiredField: "El campo Contraseña es Obligatorio",
        passwordTooShortField: "Contraseña demasiado corta (mín. 9 caracteres)",
        passwordTooLongField: "Contraseña demasiado larga (máx. 30 caracteres)",

        confirmPasswordIsRequiredField: "El campo Confirmar Contraseña es Obligatorio",
        doNotMatchPasswordsFields: "Las contraseñas no coinciden",

        nameIsRequiredField: "El campo Nombre es Obligatorio",
        nameIsTooShortField: "Nombre demasiado corto (mín. 4 caracteres)",
        nameIsTooLongField: "Nombre demasiado largo (máx. 30 caracteres)",

        addressIsRequiredField: "El campo Dirección es Obligatorio",
        addressTooShortField: "Dirección demasiado corta (mín. 6 caracteres)",
        addressTooLongField: "Dirección demasiado larga (máx. 60 caracteres)",

        bookingDateIsRequiredField: "Debes elegir una Fecha de Reserva",
        bookingTimeIsRequiredField: "El campo Hora es Obligatorio",
        bookingCustomersIsRequiredField: "El campo Comensales es Obligatorio",
        bookingTableIsRequiredField: "Debes elegir una Mesa",

        profileNameNotEmptyField: "El campo Nombre no debe estar vacío",
        profileEmailNotEmptyField: "El Email no debe estar vacío",
        profileAddressNotEmptyField: "La Dirección no debe estar vacía",

        //  CTA CARDS DATA
        cardDataMenuTitle: "Consulta nuestro Menú",
        cardDataMenuDescription: "Explora nuestra selección completa de platos y bebidas.",
        cardDataMenuButtonText: "Ver Menú",

        cardDataLoginTitle: "Bienvenido de Nuevo",
        cardDataLoginDescription: "Inicia sesión para gestionar tus pedidos y reservas.",
        cardDataLoginButtonText: "Iniciar Sesión",

        cardDataBookingTitle: "Reserva tu Mesa",
        cardDataBookingDescription: "Elige tu fecha, hora y te guardaremos el sitio.",
        cardDataBookingButtonText: "Reservar Ahora",

        cardDataOrdersTitle: "¿Hambre? Te Tenemos Cubierto",
        cardDataOrdersDescription: "Disfruta de nuestros mejores platos desde la comodidad de tu hogar.",
        cardDataOrdersButtonText: "Pedir Ahora",

        // PRODUCTS DATA
        productCokeName: "Coca-Cola",
        productCokeDescription: "Botella de Coca-Cola servida con cubitos de hielo y una rodaja de lima.",

        productOrangeFantaName: "Fanta de Naranja",
        productOrangeFantaDescription:
            "Botella de Fanta de Naranja servida con cubitos de hielo y una rodaja de naranja.",

        productMineralWaterName: "Agua Mineral",
        productMineralWaterDescription: "Botella de Agua Mineral servida con cubitos de hielo.",

        productSparklingWaterName: "Agua con Gas",
        productSparklingWaterDescription:
            "Botella de Agua con Gas servida con cubitos de hielo y una rodaja de lima.",

        productBeerName: "Cerveza Fuller's",
        productBeerDescription: "Media Pinta de nuestra Ale Premium (Fuller's).",

        productOrangeJuiceName: "Zumo de Naranja Natural",
        productOrangeJuiceDescription: "Un vaso de zumo de naranja recién exprimido",

        productLemonFantaName: "Fanta de Limón",
        productLemonFantaDescription:
            "Botella de Fanta de Limón servida con cubitos de hielo y una rodaja de limón.",

        productRedWineName: "Copa de Vino Tinto",
        productRedWineDescription: "Nuestro Vino Tinto de la Casa.",

        productWhiteWineName: "Copa de Vino Blanco",
        productWhiteWineDescription: "Nuestro Vino Blanco de la Casa",

        productCoffeeName: "Café Expreso",
        productCoffeDescription: "Nuestro Café Expreso elaborado con los mejores granos de café arábica.",

        productToastName: "Tostada con Tomate",
        productDescription: "Pan tostado con tomate, ajo y nuestro mejor aceite de oliva español.",

        productCheeseName: "Tabla de Quesos",
        productCheeseDescription: "Nuestra mejor selección de quesos nacionales con acompañamientos.",

        productCroquettesName: "Croquetas de Jamón",
        productCroquettesDescription: "Las mejores croquetas de jamón caseras que hemos hecho nunca.",

        productIberianHamName: "Jamón Ibérico",
        productIberianHamDescription: "100g de nuestro mejor jamón ibérico 5J, cortado a mano.",

        productBravasName: "Patatas Bravas",
        productBravasDescription: "Nuestras patatas seleccionadas y la mejor salsa brava del mundo.",

        productMixedSaladName: "Ensalada Tradicional",
        productMixedSaladDescription:
            "Un bol de lechuga, tomate, cebolla y aceitunas. Se puede servir con aliño.",

        productClassicBurgerName: "Hamburguesa de Ternera",
        productClassicBurgerDescription:
            "La hamburguesa de ternera número uno con nuestro mejor queso cheddar, tomate y lechuga.",

        productPorkSteakSirloinName: "Solomillo Ibérico",
        productPorkSteakSirloinDescription:
            "Solomillo de cerdo a la parrilla servido con nuestra mejor salsa de menta.",

        productRisottoName: "Risotto de Boletus",
        productRisottoDescription: "El risotto más cremoso que hemos hecho servido con láminas de boletus.",

        productVeggieBurgerName: "Hamburguesa Vegetal",
        productVeggieBurgerDescription:
            "Una jugosa hamburguesa vegetal hecha con remolacha, proteína de guisante, zanahoria y manzana, servida en un suave pan brioche con cebolla roja y lechuga crujiente.",

        productSteakTartareName: "Steak Tartar",
        productSteakTartareDescription:
            "Steak Tartar servido con yema de huevo y ahumado con madera de chocolate.",

        productTakosName: "Tacos de Pollo",
        productTakosDescription: "Tacos de pollo marinado servidos con salsa picante y pico de gallo fresco.",

        productRoastChickenName: "Pollo Asado",
        productRoastChickenDescription:
            "Nuestro mejor pollo asado servido con nuestra salsa artesanal de limón y pimienta.",

        productCarbonaraName: "Espaguetis a la Carbonara",
        productCarbonaraDescription:
            "Pasta fresca de espaguetis elaborada con nuestra tradicional salsa carbonara.",

        productPaellaName: "Paella de Marisco",
        productPaellaDescription: "Una paella tradicional española servida con variedad de mariscos",

        productCalamariName: "Calamares Fritos",
        productCalamariDescription: "Anillas de calamar rebozadas, servidas con un borde de limón.",

        productSoupName: "Sopa de Jamón Ibérico",
        productSoupDescription: "Nuestra sopa casera servida con un huevo cocido y jamón ibérico.",

        productMusselsMariniereName: "Mejillones a la Marinera",
        productMusselsMarinièreDescription: "Mejillones cocinados en nuestra salsa marinera casera fresca.",

        productPizzaName: "Pizza Margarita",
        productPizzaDescription: "Nuestra base de pizza casera con tomate, mozzarella fresca y albahaca.",

        productLasagnaName: "Lasaña Boloñesa",
        productLasagnaDescription: "Nuestra lasaña casera hecha con salsa boloñesa y bechamel.",

        productSalmonName: "Salmón a la Parrilla",
        productSalmonDescription:
            "Un filete de salmón fresco a la parrilla a la perfección y servido con nuestra cremosa sopa de calabaza.",

        productEntrecoteBeefName: "Entrecot de Ternera",
        productentrecoteBeefDescription: "Entrecot de ternera a la parrilla y salado",

        productFrenchFriesName: "Guarnición de Patatas Fritas",
        productFrenchFriesDescription: "Una guarnición salada de nuestras mejores patatas fritas",

        productGarlicBreadName: "Pan de Ajo",
        productGarlicBreadDescription: "Rebanadas de nuestro crujiente pan de ajo con mantequilla.",

        productEggFlanName: "Flan de Huevo",
        productEggFlanDescription:
            "Flan casero servido con nuestro caramelo líquido artesanal y la clásica galleta napolitana.",

        productCremaCatalanaName: "Crema Catalana",
        productCremaCatalanaDescription:
            "Nuestro postre tradicional español servido con azúcar caramelizado.",

        productPannaCottaName: "Panna Cotta",
        productPannaCottaDescription: "Panna cotta casera servida con coulis de frutos rojos.",

        productCheesecakeName: "Tarta de Queso",
        productCheesecakeDescription:
            "Nuestra cremosa tarta de queso casera servida con mermelada de arándanos",

        productBrownieName: "Brownie de Chocolate",
        productBrownieDescription:
            "Nuestro brownie artesanal perfectamente horneado con helado artesanal de vainilla.",
    },

    fr: {
        // BARRE DE NAVIGATION
        userReplaceName: "Utilisateur",
        toastLogoutError: "Échec de la déconnexion.",

        bookingPageNavLabel: "RÉSERVATIONS",
        ordersPageNavLabel: "COMMANDES",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "PANIER",

        lodingTextLogoutUser: "Fermeture du Profil...",
        logoutButton: "Se Déconnecter",
        loadingTextLogoutButton: "Déconnexion...",
        loginButton: "Se Connecter",
        registerButton: "S'inscrire",

        toastErrorLogout: "Échec de la déconnexion",

        profilePageButton: "Profil",

        // LOGIN PAGE
        h1LoginPage: "Se Connecter",

        toastLoginError: "Échec de la connexion",
        loadingLoginButtonText: "Connexion...",

        // REGISTER PAGE
        h1RegisterPage: "Rejoignez-Nous",

        registerButtonText: "S'inscrire",
        loadingRegisterButtonText: "Inscription...",

        namePlaceholderFieldText: "Entrez votre nom",
        emailPlaceholderFieldText: "Entrez votre email",
        addressPlaceholderFieldText: "Adresse de livraison",
        passwordPlaceholderFieldText: "Entrez votre mot de passe",
        confirmPasswordPlaceholderFieldText: "Répétez votre mot de passe",

        toastRegisterError: "Échec de l'inscription",

        // HOME PAGE
        toastWelcomeRegister: "Bienvenue",
        toastLoginSuccess: "Connexion réussie ✔",
        toastLogoutSuccess: "Déconnexion réussie ✔",

        h1HomePage: "ReservApp",

        // MENUPAGE
        fetchMessageError: "Erreur de chargement des produits. Réessayez.",
        allCategoriesFilter: "Toutes les Catégories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Actualisation des Produits...",
        textRefreshProductsButton: "Actualiser",
        clearFilterButton: "Effacer le Filtre",

        // BOOKING PAGE
        h1BookingPage: "RÉSERVATIONS",

        confirmBookingTitle: "Réviser et Confirmer",
        userNameConfirmText: "Nom de la Réservation",
        dateConfirmText: "Date",
        timeConfirmText: "Heure",
        customersConfirmText: "Convives",
        highChairConfirmText: "Chaise Haute?",
        aditionalMessageConfirmText: "Message Supplémentaire",
        confirmButtonModal: "Confirmer",
        loadingTextConfirmButtonModal: "Réservation...",

        bookingTimeText: "Heure",
        bookingTimePlaceholder: "Sélectionnez l'Heure",
        bookingCustomersText: "Convives",
        bookingCustomersPlaceholder: "Sélectionnez les Convives",

        bookingHighChairTitle: "Ajouter une Chaise Haute",
        bookingHighChairDescription: "Gratuit",

        bookingAditionalMessagePlaceholder: "Des demandes spéciales?",

        bookingMaxCapacityTableTitle: "Capacité Max.:",
        bookingTableTypeTitle: "Type de Table:",

        squareTableForm: "Table Carrée",
        roundTableForm: "Table Ronde",
        rectangularTableForm: "Table Rectangulaire",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Sélectionner la Table",

        bookingButtonConfirmText: "Réserver",
        bookingButtonResetForm: "Réinitialiser le Formulaire",

        toastBookingSuccess: "Réservation Confirmée",
        toastBookingUnavailable: "Réservation Échouée: Cette table est déjà réservée.",
        toastBookingError: "Réservation Échouée. Réessayez",

        // ORDERS PAGE
        h1OrdersPage: "LIVRAISON",
        smallOrdersPageSubtitle: "Profitez de notre menu dans le confort de votre maison.",

        ordersPageInputPlaceholder: "Rechercher des Produits...",

        addProductToCartButton: "Ajouter au Panier",
        removeProductToCartButton: "Retirer du Panier",
        loadingTextAddingProductsToCartButton: "Ajout...",
        loadingTextRemovingProductsFromCartButton: "Retrait...",
        addOneMoreProductToCartButton: "Ajouter un",
        removeOneMoreProductFromCartButton: "Retirer un",

        toastAddedProductToCart: "Ajouté ✔",
        toastQuantityProductUpdatedToCart: "Panier mis à jour avec succès ✔",
        toastRemovedProductFromCart: "Article retiré du panier ✔",
        toastErrorAddingProductToCart: "Erreur: Impossible d'ajouter au panier",
        toastErrorQuantityProductUpdatedToCart: "Erreur: Échec de la mise à jour de la quantité",
        toastErrorRemovingProductFromCart: "Erreur: Impossible de retirer l'article du panier",

        // CART PAGE
        h1CartPage: "VOTRE PANIER",
        confirmModalCartTitle: "Confirmation de Commande",
        confirmModalCartMessage: "Vous y êtes presque! Confirmez votre commande pour continuer",

        confirmButtonCartModal: "Confirmer",
        loadingConfirmButtonCartModal: "Traitement...",
        cancelButtonCartModal: "Retour",

        accordionQtyText: "Qté:",
        accordionDescriptionText: "Description:",
        accordionPriceText: "Prix:",

        noProductsTitle: "Votre Panier est vide",
        goToOrdersCartButton: "Commander Maintenant",

        toastCartRemovedSuccess: "Panier vidé ✔",
        toastCartRemovedError: "Échec de la suppression de tous les articles",

        buttonCartPageOpenPaymentModal: "Commander",
        buttonCartPageDeleteCart: "Vider le Panier",

        // PROFILE PAGE
        h1ProfilePage: "Bienvenue, ",
        userDataSectionTitle: "Informations Personnelles",
        bookingsDataSectionTitle: "Vos Réservations",
        ordersDataSectionTitle: "Vos Commandes",

        buttonChangeAvatar: "Changer l'Avatar",

        //  ----- USER DATA
        nameFieldText: "Nom",
        fullNameFieldText: "Nom Complet",
        emailFieldText: "Email",
        addressFieldText: "Adresse",
        passwordFieldText: "Mot de Passe",
        confirmPasswordFieldText: "Confirmer le Mot de Passe",
        userDataModalTitle: "Confirmer le Changement de Données",
        userDataModalMessage: "Confirmer le changement: ",
        userDataModalMessageNexo: "en",
        userDataModalConfirmText: "Modifier",
        loadingUserDataModalConfirmText: "Modification...",
        userDataModalCancelText: "Annuler",

        userDataEditButtonText: "Éditer",
        userDataChangeButtonText: "Modifier",

        toastUserDataChangeSuccess: "Profil mis à jour avec succès ✔",
        toastUserDataChangeError: "Erreur lors de la mise à jour du profil",

        //  ------ BOOKING DATA
        bookingDataTitle1: "Vos prochaines réservations",
        bookingDataTitle2: "Vos visites passées",
        bookingDataNoPendingBookingsFound: "Vous n'avez pas de réservations en attente.",
        bookingDataNoPastVisitsFound: "Vous n'avez pas de visites passées",

        buttonBookingDataMakeABook: "Réserver maintenant",
        buttonBookingDataCloseModalInfo: "Fermer",
        buttonBookingDataCancelReservation: "Annuler la Réservation",

        bookingDataModalDeletingTitle: "Supprimer la Réservation",
        bookingDataModalDeletingbutton: "Supprimer",
        loadingBookingDataModalDeletingbutton: "Suppression...",

        bookingDataModalInfotitle: "Détails de la Réservation",
        bookingDataModalInfoMessageText1: "Supprimer votre Réservation pour ",
        bookingDataModalInfoMessageCustomer1: "Convive",
        bookingDataModalInfoMessageCustomer2: "Convives",

        bookingDataModalInfoDateText: "Date de réservation:",
        bookingDataModalInfoTimeText: "Heure de réservation:",
        bookingDataModalInfoPartySizeText: "Nombre de personnes:",
        bookingDataModalInfoHighChairText: "Chaise haute nécessaire?",

        toastBookingDataDeltingBookingError: "Erreur lors de la suppression de la Réservation",

        //  -----ORDERS DATA
        ordersDataTitle1: "Commandes en Attente",
        ordersDataTitle2: "Commandes Complétées",

        ordersDataInfoModalMessage: "Voulez-vous annuler la commande de ",

        toastOrdersDataSuccess: "Commande annulée avec succès ✔",
        toastOrdersDataError: "Erreur lors de l'annulation de la commande.",

        ordersDataNotPendingOrdersText: "Il n'y a pas de commandes en attente.",
        ordersDataNotOrders: "Il n'y a pas de commandes.",

        ordersDataCancelModalTitle: "Annuler la Commande",
        ordersDataCancelModalBackButton: "Retour",
        loadingOrdersDataCancelButton: "Annulation...",

        ordersDataInfoModalTitle: "Détails de la Commande",
        ordersDataInfoModalcreationText: "Date de Création:",
        ordersDataInfoModalProductText: "Produit:",
        ordersDataInfoModalPriceText: "Prix:",
        ordersDataInfoModalTotalProductsText: "Total Produits:",
        ordersDataInfoModalTotalCountText: "Total:",
        buttonOrdersDataInfomodalCloseText: "Fermer",

        buttonOrdersDataInfoCancelText: "Annuler",

        // Footer
        copyrightText: "ReservApp. Tous droits réservés",

        // Messages Généraux
        affirmationText: "Oui",
        NegationText: "Non",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "Le champ Email est Obligatoire",
        emailNotValidField1: "Email non valide ('@' manquant)",
        emailNotValidField2: "Email non valide ('.' manquant)",
        emailTooShortField: "Email trop court (min. 5 caractères)",
        emailTooLongField: "Email trop long (max. 50 caractères)",

        passwordIsRequiredField: "Le champ Mot de Passe est Obligatoire",
        passwordTooShortField: "Mot de passe trop court (min. 9 caractères)",
        passwordTooLongField: "Mot de passe trop long (max. 30 caractères)",

        confirmPasswordIsRequiredField: "Le champ Confirmer le Mot de Passe est Obligatoire",
        doNotMatchPasswordsFields: "Les mots de passe ne correspondent pas",

        nameIsRequiredField: "Le champ Nom est Obligatoire",
        nameIsTooShortField: "Nom trop court (min. 4 caractères)",
        nameIsTooLongField: "Nom trop long (max. 30 caractères)",

        addressIsRequiredField: "Le champ Adresse est Obligatoire",
        addressTooShortField: "Adresse trop courte (min. 6 caractères)",
        addressTooLongField: "Adresse trop longue (max. 60 caractères)",

        bookingDateIsRequiredField: "Vous devez choisir une Date de Réservation",
        bookingTimeIsRequiredField: "Le champ Heure est Obligatoire",
        bookingCustomersIsRequiredField: "Le champ Convives est Obligatoire",
        bookingTableIsRequiredField: "Vous devez choisir une Table",

        profileNameNotEmptyField: "Le champ Nom ne doit pas être vide",
        profileEmailNotEmptyField: "L'Email ne doit pas être vide",
        profileAddressNotEmptyField: "L'Adresse ne doit pas être vide",

        //  CTA CARDS DATA
        cardDataMenuTitle: "Consultez notre Menu",
        cardDataMenuDescription: "Parcourez notre sélection complète de plats et boissons.",
        cardDataMenuButtonText: "Voir le Menu",

        cardDataLoginTitle: "Bon Retour",
        cardDataLoginDescription: "Connectez-vous pour gérer vos commandes et réservations.",
        cardDataLoginButtonText: "Se Connecter",

        cardDataBookingTitle: "Réservez votre Table",
        cardDataBookingDescription: "Choisissez votre date, heure et nous vous garderons une place.",
        cardDataBookingButtonText: "Réserver Maintenant",

        cardDataOrdersTitle: "Faim? On s'occupe de Vous",
        cardDataOrdersDescription: "Profitez de nos meilleurs plats dans le confort de votre maison.",
        cardDataOrdersButtonText: "Commander Maintenant",

        // PRODUCTS DATA
        productCokeName: "Coca-Cola",
        productCokeDescription:
            "Bouteille de Coca-Cola servie avec des glaçons et une tranche de citron vert.",

        productOrangeFantaName: "Fanta Orange",
        productOrangeFantaDescription:
            "Bouteille de Fanta Orange servie avec des glaçons et une tranche d'orange.",

        productMineralWaterName: "Eau Minérale",
        productMineralWaterDescription: "Bouteille d'Eau Minérale servie avec des glaçons.",

        productSparklingWaterName: "Eau Gazeuse",
        productSparklingWaterDescription:
            "Bouteille d'Eau Gazeuse servie avec des glaçons et une tranche de citron vert.",

        productBeerName: "Bière Fuller's",
        productBeerDescription: "Demi-pinte de notre Ale Premium (Fuller's).",

        productOrangeJuiceName: "Jus d'Orange Pressé",
        productOrangeJuiceDescription: "Un verre de jus d'orange fraîchement pressé",

        productLemonFantaName: "Fanta Citron",
        productLemonFantaDescription:
            "Bouteille de Fanta Citron servie avec des glaçons et une tranche de citron.",

        productRedWineName: "Verre de Vin Rouge",
        productRedWineDescription: "Notre Vin Rouge de la Maison.",

        productWhiteWineName: "Verre de Vin Blanc",
        productWhiteWineDescription: "Notre Vin Blanc de la Maison",

        productCoffeeName: "Expresso",
        productCoffeDescription: "Notre Café Expresso préparé avec les meilleurs grains de café arabica.",

        productToastName: "Tartine à la Tomate",
        productDescription: "Pain grillé avec tomate, ail et notre meilleure huile d'olive espagnole.",

        productCheeseName: "Plateau de Fromages",
        productCheeseDescription: "Notre meilleure sélection de fromages nationaux avec accompagnements.",

        productCroquettesName: "Croquettes au Jambon",
        productCroquettesDescription:
            "Les meilleures croquettes au jambon maison que nous ayons jamais faites.",

        productIberianHamName: "Jambon Ibérique",
        productIberianHamDescription: "100g de notre meilleur jambon ibérique 5J, tranché à la main.",

        productBravasName: "Patatas Bravas",
        productBravasDescription: "Nos pommes de terre sélectionnées et la meilleure sauce brava du monde.",

        productMixedSaladName: "Salade Traditionnelle",
        productMixedSaladDescription:
            "Un bol de laitue, tomate, oignon et olives. Peut être servi avec vinaigrette.",

        productClassicBurgerName: "Burger au Bœuf",
        productClassicBurgerDescription:
            "Le burger au bœuf numéro un avec notre meilleur fromage cheddar, tomate et laitue.",

        productPorkSteakSirloinName: "Filet Mignon Ibérique",
        productPorkSteakSirloinDescription:
            "Filet mignon de porc grillé servi avec notre meilleure sauce à la menthe.",

        productRisottoName: "Risotto aux Cèpes",
        productRisottoDescription:
            "Le risotto le plus crémeux que nous ayons fait servi avec des tranches de cèpes.",

        productVeggieBurgerName: "Burger Végétarien",
        productVeggieBurgerDescription:
            "Un burger végétal juteux à base de betterave, protéine de pois, carotte et pomme, servi dans un pain brioché moelleux avec oignon rouge et laitue croquante.",

        productSteakTartareName: "Steak Tartare",
        productSteakTartareDescription: "Steak Tartare servi avec jaune d'œuf et fumé au bois de chocolat.",

        productTakosName: "Tacos au Poulet",
        productTakosDescription: "Tacos au poulet mariné servis avec sauce piquante et pico de gallo frais.",

        productRoastChickenName: "Poulet Rôti",
        productRoastChickenDescription:
            "Notre meilleur poulet rôti servi avec notre sauce artisanale citron/poivre.",

        productCarbonaraName: "Spaghetti Carbonara",
        productCarbonaraDescription:
            "Pâtes fraîches spaghetti préparées avec notre sauce carbonara traditionnelle.",

        productPaellaName: "Paella aux Fruits de Mer",
        productPaellaDescription:
            "Une paella traditionnelle espagnole servie avec une variété de fruits de mer",

        productCalamariName: "Calamars Frits",
        productCalamariDescription: "Anneaux de calamars panés, servis avec un quartier de citron.",

        productSoupName: "Soupe au Jambon Ibérique",
        productSoupDescription: "Notre soupe maison servie avec un œuf dur et du jambon ibérique.",

        productMusselsMariniereName: "Moules Marinières",
        productMusselsMarinièreDescription: "Moules cuisinées dans notre sauce marinière maison fraîche.",

        productPizzaName: "Pizza Margherita",
        productPizzaDescription: "Notre base de pizza maison avec tomate, mozzarella fraîche et basilic.",

        productLasagnaName: "Lasagne Bolognaise",
        productLasagnaDescription: "Notre lasagne maison préparée avec sauce bolognaise et béchamel.",

        productSalmonName: "Saumon Grillé",
        productSalmonDescription:
            "Un filet de saumon frais grillé à la perfection et servi avec notre velouté de potiron crémeux.",

        productEntrecoteBeefName: "Entrecôte de Bœuf",
        productentrecoteBeefDescription: "Entrecôte de bœuf grillée et salée",

        productFrenchFriesName: "Accompagnement de Frites",
        productFrenchFriesDescription: "Un accompagnement salé de nos meilleures frites",

        productGarlicBreadName: "Pain à l'Ail",
        productGarlicBreadDescription: "Tranches de notre pain à l'ail croustillant et beurré.",

        productEggFlanName: "Flan aux Œufs",
        productEggFlanDescription:
            "Flan maison servi avec notre caramel liquide artisanal et le classique biscuit napolitain.",

        productCremaCatalanaName: "Crème Catalane",
        productCremaCatalanaDescription: "Notre dessert traditionnel espagnol servi avec sucre caramélisé.",

        productPannaCottaName: "Panna Cotta",
        productPannaCottaDescription: "Panna cotta maison servie avec coulis de fruits rouges.",

        productCheesecakeName: "Cheesecake",
        productCheesecakeDescription: "Notre cheesecake maison crémeux servi avec confiture de myrtilles",

        productBrownieName: "Brownie au Chocolat",
        productBrownieDescription:
            "Notre brownie artisanal parfaitement cuit avec glace artisanale à la vanille.",
    },

    it: {
        // BARRA DI NAVIGAZIONE
        userReplaceName: "Utente",
        toastLogoutError: "Disconnessione fallita.",

        bookingPageNavLabel: "PRENOTAZIONI",
        ordersPageNavLabel: "ORDINI",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "CARRELLO",

        lodingTextLogoutUser: "Chiusura Profilo...",
        logoutButton: "Disconnetti",
        loadingTextLogoutButton: "Disconnessione...",
        loginButton: "Accedi",
        registerButton: "Registrati",

        toastErrorLogout: "Disconnessione fallita",

        profilePageButton: "Profilo",

        // LOGIN PAGE
        h1LoginPage: "Accedi",

        toastLoginError: "Accesso fallito",
        loadingLoginButtonText: "Accesso...",

        // REGISTER PAGE
        h1RegisterPage: "Unisciti a Noi",

        registerButtonText: "Iscriviti",
        loadingRegisterButtonText: "Iscrizione...",

        namePlaceholderFieldText: "Inserisci il tuo nome",
        emailPlaceholderFieldText: "Inserisci la tua email",
        addressPlaceholderFieldText: "Indirizzo di consegna",
        passwordPlaceholderFieldText: "Inserisci la tua password",
        confirmPasswordPlaceholderFieldText: "Ripeti la tua password",

        toastRegisterError: "Registrazione fallita",

        // HOME PAGE
        toastWelcomeRegister: "Benvenuto",
        toastLoginSuccess: "Accesso effettuato con successo ✔",
        toastLogoutSuccess: "Disconnessione effettuata con successo ✔",

        h1HomePage: "ReservApp",

        // MENUPAGE
        fetchMessageError: "Errore nel caricamento dei prodotti. Riprova.",
        allCategoriesFilter: "Tutte le Categorie",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Aggiornamento Prodotti...",
        textRefreshProductsButton: "Aggiorna",
        clearFilterButton: "Cancella Filtro",

        // BOOKING PAGE
        h1BookingPage: "PRENOTAZIONI",

        confirmBookingTitle: "Rivedi e Conferma",
        userNameConfirmText: "Nome della Prenotazione",
        dateConfirmText: "Data",
        timeConfirmText: "Ora",
        customersConfirmText: "Commensali",
        highChairConfirmText: "Seggiolone?",
        aditionalMessageConfirmText: "Messaggio Aggiuntivo",
        confirmButtonModal: "Conferma",
        loadingTextConfirmButtonModal: "Prenotazione...",

        bookingTimeText: "Ora",
        bookingTimePlaceholder: "Seleziona Ora",
        bookingCustomersText: "Commensali",
        bookingCustomersPlaceholder: "Seleziona Commensali",

        bookingHighChairTitle: "Aggiungi Seggiolone",
        bookingHighChairDescription: "Gratuito",

        bookingAditionalMessagePlaceholder: "Richieste speciali?",

        bookingMaxCapacityTableTitle: "Capacità Max:",
        bookingTableTypeTitle: "Tipo di Tavolo:",

        squareTableForm: "Tavolo Quadrato",
        roundTableForm: "Tavolo Rotondo",
        rectangularTableForm: "Tavolo Rettangolare",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Seleziona Tavolo",

        bookingButtonConfirmText: "Prenota",
        bookingButtonResetForm: "Reimposta Modulo",

        toastBookingSuccess: "Prenotazione Completata",
        toastBookingUnavailable: "Prenotazione Fallita: Questo tavolo è già prenotato.",
        toastBookingError: "Prenotazione Fallita. Riprova",

        // ORDERS PAGE
        h1OrdersPage: "CONSEGNA",
        smallOrdersPageSubtitle: "Goditi il nostro menu comodamente da casa.",

        ordersPageInputPlaceholder: "Cerca Prodotti...",

        addProductToCartButton: "Aggiungi al Carrello",
        removeProductToCartButton: "Rimuovi dal Carrello",
        loadingTextAddingProductsToCartButton: "Aggiunta...",
        loadingTextRemovingProductsFromCartButton: "Rimozione...",
        addOneMoreProductToCartButton: "Aggiungi uno",
        removeOneMoreProductFromCartButton: "Rimuovi uno",

        toastAddedProductToCart: "Aggiunto ✔",
        toastQuantityProductUpdatedToCart: "Carrello aggiornato con successo ✔",
        toastRemovedProductFromCart: "Articolo rimosso dal carrello ✔",
        toastErrorAddingProductToCart: "Errore: Impossibile aggiungere al carrello",
        toastErrorQuantityProductUpdatedToCart: "Errore: Aggiornamento quantità fallito",
        toastErrorRemovingProductFromCart: "Errore: Impossibile rimuovere l'articolo dal carrello",

        // CART PAGE
        h1CartPage: "IL TUO CARRELLO",
        confirmModalCartTitle: "Conferma Ordine",
        confirmModalCartMessage: "Ci sei quasi! Conferma il tuo ordine per continuare",

        confirmButtonCartModal: "Conferma",
        loadingConfirmButtonCartModal: "Elaborazione...",
        cancelButtonCartModal: "Indietro",

        accordionQtyText: "Qtà:",
        accordionDescriptionText: "Descrizione:",
        accordionPriceText: "Prezzo:",

        noProductsTitle: "Il tuo Carrello è vuoto",
        goToOrdersCartButton: "Ordina Ora",

        toastCartRemovedSuccess: "Carrello svuotato ✔",
        toastCartRemovedError: "Impossibile rimuovere tutti gli articoli",

        buttonCartPageOpenPaymentModal: "Ordina",
        buttonCartPageDeleteCart: "Svuota Carrello",

        // PROFILE PAGE
        h1ProfilePage: "Benvenuto, ",
        userDataSectionTitle: "Informazioni Personali",
        bookingsDataSectionTitle: "Le Tue Prenotazioni",
        ordersDataSectionTitle: "I Tuoi Ordini",

        buttonChangeAvatar: "Cambia Avatar",

        //  ----- USER DATA
        nameFieldText: "Nome",
        fullNameFieldText: "Nome Completo",
        emailFieldText: "Email",
        addressFieldText: "Indirizzo",
        passwordFieldText: "Password",
        confirmPasswordFieldText: "Conferma Password",
        userDataModalTitle: "Conferma Modifica Dati",
        userDataModalMessage: "Conferma modifica: ",
        userDataModalMessageNexo: "in",
        userDataModalConfirmText: "Modifica",
        loadingUserDataModalConfirmText: "Modifica...",
        userDataModalCancelText: "Annulla",

        userDataEditButtonText: "Modifica",
        userDataChangeButtonText: "Cambia",

        toastUserDataChangeSuccess: "Profilo aggiornato con successo ✔",
        toastUserDataChangeError: "Errore nell'aggiornamento del profilo",

        //  ------ BOOKING DATA
        bookingDataTitle1: "Le tue prossime prenotazioni",
        bookingDataTitle2: "Le tue visite passate",
        bookingDataNoPendingBookingsFound: "Non hai prenotazioni in sospeso.",
        bookingDataNoPastVisitsFound: "Non hai visite passate",

        buttonBookingDataMakeABook: "Prenota ora",
        buttonBookingDataCloseModalInfo: "Chiudi",
        buttonBookingDataCancelReservation: "Annulla Prenotazione",

        bookingDataModalDeletingTitle: "Elimina Prenotazione",
        bookingDataModalDeletingbutton: "Elimina",
        loadingBookingDataModalDeletingbutton: "Eliminazione...",

        bookingDataModalInfotitle: "Dettagli della Prenotazione",
        bookingDataModalInfoMessageText1: "Eliminare la tua Prenotazione per ",
        bookingDataModalInfoMessageCustomer1: "Commensale",
        bookingDataModalInfoMessageCustomer2: "Commensali",

        bookingDataModalInfoDateText: "Data prenotazione:",
        bookingDataModalInfoTimeText: "Ora prenotazione:",
        bookingDataModalInfoPartySizeText: "Numero di persone:",
        bookingDataModalInfoHighChairText: "Seggiolone necessario?",

        toastBookingDataDeltingBookingError: "Errore nell'eliminazione della Prenotazione",

        //  -----ORDERS DATA
        ordersDataTitle1: "Ordini in Attesa",
        ordersDataTitle2: "Ordini Completati",

        ordersDataInfoModalMessage: "Vuoi annullare l'ordine di ",

        toastOrdersDataSuccess: "Ordine annullato con successo ✔",
        toastOrdersDataError: "Errore nell'annullamento dell'ordine.",

        ordersDataNotPendingOrdersText: "Non ci sono ordini in attesa.",
        ordersDataNotOrders: "Non ci sono ordini.",

        ordersDataCancelModalTitle: "Annulla Ordine",
        ordersDataCancelModalBackButton: "Indietro",
        loadingOrdersDataCancelButton: "Annullamento...",

        ordersDataInfoModalTitle: "Dettagli dell'Ordine",
        ordersDataInfoModalcreationText: "Data di Creazione:",
        ordersDataInfoModalProductText: "Prodotto:",
        ordersDataInfoModalPriceText: "Prezzo:",
        ordersDataInfoModalTotalProductsText: "Totale Prodotti:",
        ordersDataInfoModalTotalCountText: "Totale:",
        buttonOrdersDataInfomodalCloseText: "Chiudi",

        buttonOrdersDataInfoCancelText: "Annulla",

        // Footer
        copyrightText: "ReservApp. Tutti i diritti riservati",

        // Messaggi Generali
        affirmationText: "Sì",
        NegationText: "No",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "Il campo Email è Obbligatorio",
        emailNotValidField1: "Email non valida ('@' mancante)",
        emailNotValidField2: "Email non valida ('.' mancante)",
        emailTooShortField: "Email troppo corta (min. 5 caratteri)",
        emailTooLongField: "Email troppo lunga (max. 50 caratteri)",

        passwordIsRequiredField: "Il campo Password è Obbligatorio",
        passwordTooShortField: "Password troppo corta (min. 9 caratteri)",
        passwordTooLongField: "Password troppo lunga (max. 30 caratteri)",

        confirmPasswordIsRequiredField: "Il campo Conferma Password è Obbligatorio",
        doNotMatchPasswordsFields: "Le password non corrispondono",

        nameIsRequiredField: "Il campo Nome è Obbligatorio",
        nameIsTooShortField: "Nome troppo corto (min. 4 caratteri)",
        nameIsTooLongField: "Nome troppo lungo (max. 30 caratteri)",

        addressIsRequiredField: "Il campo Indirizzo è Obbligatorio",
        addressTooShortField: "Indirizzo troppo corto (min. 6 caratteri)",
        addressTooLongField: "Indirizzo troppo lungo (max. 60 caratteri)",

        bookingDateIsRequiredField: "Devi scegliere una Data di Prenotazione",
        bookingTimeIsRequiredField: "Il campo Ora è Obbligatorio",
        bookingCustomersIsRequiredField: "Il campo Commensali è Obbligatorio",
        bookingTableIsRequiredField: "Devi scegliere un Tavolo",

        profileNameNotEmptyField: "Il campo Nome non deve essere vuoto",
        profileEmailNotEmptyField: "L'Email non deve essere vuota",
        profileAddressNotEmptyField: "L'Indirizzo non deve essere vuoto",

        //  CTA CARDS DATA
        cardDataMenuTitle: "Consulta il nostro Menu",
        cardDataMenuDescription: "Sfoglia la nostra selezione completa di piatti e bevande.",
        cardDataMenuButtonText: "Vedi Menu",

        cardDataLoginTitle: "Bentornato",
        cardDataLoginDescription: "Accedi per gestire i tuoi ordini e prenotazioni.",
        cardDataLoginButtonText: "Accedi",

        cardDataBookingTitle: "Prenota il tuo Tavolo",
        cardDataBookingDescription: "Scegli data, ora e ti riserveremo il posto.",
        cardDataBookingButtonText: "Prenota Ora",

        cardDataOrdersTitle: "Fame? Ci Pensiamo Noi",
        cardDataOrdersDescription: "Goditi i nostri migliori piatti comodamente da casa tua.",
        cardDataOrdersButtonText: "Ordina Ora",

        // PRODUCTS DATA
        productCokeName: "Coca-Cola",
        productCokeDescription: "Bottiglia di Coca-Cola servita con cubetti di ghiaccio e una fetta di lime.",

        productOrangeFantaName: "Fanta all'Arancia",
        productOrangeFantaDescription:
            "Bottiglia di Fanta all'Arancia servita con cubetti di ghiaccio e una fetta d'arancia.",

        productMineralWaterName: "Acqua Minerale",
        productMineralWaterDescription: "Bottiglia di Acqua Minerale servita con cubetti di ghiaccio.",

        productSparklingWaterName: "Acqua Frizzante",
        productSparklingWaterDescription:
            "Bottiglia di Acqua Frizzante servita con cubetti di ghiaccio e una fetta di lime.",

        productBeerName: "Birra Fuller's",
        productBeerDescription: "Mezza pinta della nostra Ale Premium (Fuller's).",

        productOrangeJuiceName: "Succo d'Arancia Fresco",
        productOrangeJuiceDescription: "Un bicchiere di succo d'arancia appena spremuto",

        productLemonFantaName: "Fanta al Limone",
        productLemonFantaDescription:
            "Bottiglia di Fanta al Limone servita con cubetti di ghiaccio e una fetta di limone.",

        productRedWineName: "Bicchiere di Vino Rosso",
        productRedWineDescription: "Il nostro Vino Rosso della Casa.",

        productWhiteWineName: "Bicchiere di Vino Bianco",
        productWhiteWineDescription: "Il nostro Vino Bianco della Casa",

        productCoffeeName: "Espresso",
        productCoffeDescription:
            "Il nostro Caffè Espresso preparato con i migliori chicchi di caffè arabica.",

        productToastName: "Bruschetta al Pomodoro",
        productDescription: "Pane tostato con pomodoro, aglio e il nostro miglior olio d'oliva spagnolo.",

        productCheeseName: "Tagliere di Formaggi",
        productCheeseDescription: "La nostra migliore selezione di formaggi nazionali con accompagnamenti.",

        productCroquettesName: "Crocchette di Prosciutto",
        productCroquettesDescription:
            "Le migliori crocchette di prosciutto fatte in casa che abbiamo mai preparato.",

        productIberianHamName: "Prosciutto Iberico",
        productIberianHamDescription: "100g del nostro miglior prosciutto iberico 5J, tagliato a mano.",

        productBravasName: "Patatas Bravas",
        productBravasDescription: "Le nostre patate selezionate e la migliore salsa brava del mondo.",

        productMixedSaladName: "Insalata Tradizionale",
        productMixedSaladDescription:
            "Una ciotola di lattuga, pomodoro, cipolla e olive. Può essere servita con condimento.",

        productClassicBurgerName: "Hamburger di Manzo",
        productClassicBurgerDescription:
            "L'hamburger di manzo numero uno con il nostro miglior formaggio cheddar, pomodoro e lattuga.",

        productPorkSteakSirloinName: "Filetto di Maiale Iberico",
        productPorkSteakSirloinDescription:
            "Filetto di maiale alla griglia servito con la nostra migliore salsa alla menta.",

        productRisottoName: "Risotto ai Porcini",
        productRisottoDescription:
            "Il risotto più cremoso che abbiamo mai fatto servito con fette di porcini.",

        productVeggieBurgerName: "Hamburger Vegetariano",
        productVeggieBurgerDescription:
            "Un succoso hamburger vegetale a base di barbabietola, proteine di piselli, carota e mela, servito in un soffice panino brioche con cipolla rossa e lattuga croccante.",

        productSteakTartareName: "Tartare di Manzo",
        productSteakTartareDescription:
            "Tartare di manzo servita con tuorlo d'uovo e affumicata con legno di cioccolato.",

        productTakosName: "Tacos di Pollo",
        productTakosDescription: "Tacos di pollo marinato serviti con salsa piccante e pico de gallo fresco.",

        productRoastChickenName: "Pollo Arrosto",
        productRoastChickenDescription:
            "Il nostro miglior pollo arrosto servito con la nostra salsa artigianale limone/pepe.",

        productCarbonaraName: "Spaghetti alla Carbonara",
        productCarbonaraDescription:
            "Pasta fresca di spaghetti preparata con la nostra tradizionale salsa carbonara.",

        productPaellaName: "Paella ai Frutti di Mare",
        productPaellaDescription: "Una paella tradizionale spagnola servita con varietà di frutti di mare",

        productCalamariName: "Calamari Fritti",
        productCalamariDescription: "Anelli di calamari impanati, serviti con uno spicchio di limone.",

        productSoupName: "Zuppa al Prosciutto Iberico",
        productSoupDescription:
            "La nostra zuppa fatta in casa servita con un uovo sodo e prosciutto iberico.",

        productMusselsMariniereName: "Cozze alla Marinara",
        productMusselsMarinièreDescription:
            "Cozze cucinate nella nostra salsa marinara fresca fatta in casa.",

        productPizzaName: "Pizza Margherita",
        productPizzaDescription:
            "La nostra base di pizza fatta in casa con pomodoro, mozzarella fresca e basilico.",

        productLasagnaName: "Lasagne alla Bolognese",
        productLasagnaDescription:
            "Le nostre lasagne fatte in casa preparate con salsa bolognese e besciamella.",

        productSalmonName: "Salmone alla Griglia",
        productSalmonDescription:
            "Un filetto di salmone fresco grigliato alla perfezione e servito con la nostra cremosa vellutata di zucca.",

        productEntrecoteBeefName: "Entrecôte di Manzo",
        productentrecoteBeefDescription: "Entrecôte di manzo grigliata e salata",

        productFrenchFriesName: "Contorno di Patatine Fritte",
        productFrenchFriesDescription: "Un contorno salato delle nostre migliori patatine fritte",

        productGarlicBreadName: "Pane all'Aglio",
        productGarlicBreadDescription: "Fette del nostro croccante pane all'aglio imburrato.",

        productEggFlanName: "Flan alle Uova",
        productEggFlanDescription:
            "Flan fatto in casa servito con il nostro caramello liquido artigianale e il classico biscotto napoletano.",

        productCremaCatalanaName: "Crema Catalana",
        productCremaCatalanaDescription:
            "Il nostro dessert tradizionale spagnolo servito con zucchero caramellato.",

        productPannaCottaName: "Panna Cotta",
        productPannaCottaDescription: "Panna cotta fatta in casa servita con coulis di frutti rossi.",

        productCheesecakeName: "Cheesecake",
        productCheesecakeDescription:
            "La nostra cremosa cheesecake fatta in casa servita con marmellata di mirtilli",

        productBrownieName: "Brownie al Cioccolato",
        productBrownieDescription:
            "Il nostro brownie artigianale perfettamente cotto con gelato artigianale alla vaniglia.",
    },

    de: {
        // NAVIGATIONSLEISTE
        userReplaceName: "Benutzer",
        toastLogoutError: "Abmeldung fehlgeschlagen.",

        bookingPageNavLabel: "RESERVIERUNGEN",
        ordersPageNavLabel: "BESTELLUNGEN",
        menusPageNavLabel: "SPEISEKARTE",
        cartPageNavLabel: "WARENKORB",

        lodingTextLogoutUser: "Profil wird geschlossen...",
        logoutButton: "Abmelden",
        loadingTextLogoutButton: "Abmeldung läuft...",
        loginButton: "Anmelden",
        registerButton: "Registrieren",

        toastErrorLogout: "Abmeldung fehlgeschlagen",

        profilePageButton: "Profil",

        // LOGIN PAGE
        h1LoginPage: "Anmelden",

        toastLoginError: "Anmeldung fehlgeschlagen",
        loadingLoginButtonText: "Anmeldung läuft...",

        // REGISTER PAGE
        h1RegisterPage: "Werden Sie Mitglied",

        registerButtonText: "Registrieren",
        loadingRegisterButtonText: "Registrierung läuft...",

        namePlaceholderFieldText: "Geben Sie Ihren Namen ein",
        emailPlaceholderFieldText: "Geben Sie Ihre E-Mail ein",
        addressPlaceholderFieldText: "Lieferadresse",
        passwordPlaceholderFieldText: "Geben Sie Ihr Passwort ein",
        confirmPasswordPlaceholderFieldText: "Wiederholen Sie Ihr Passwort",

        toastRegisterError: "Registrierung fehlgeschlagen",

        // HOME PAGE
        toastWelcomeRegister: "Willkommen",
        toastLoginSuccess: "Erfolgreich angemeldet ✔",
        toastLogoutSuccess: "Erfolgreich abgemeldet ✔",

        h1HomePage: "ReservApp",

        // MENUPAGE
        fetchMessageError: "Fehler beim Laden der Produkte. Bitte erneut versuchen.",
        allCategoriesFilter: "Alle Kategorien",
        h1MenuPage: "SPEISEKARTE",

        loadingTextRefreshProductsButton: "Produkte werden aktualisiert...",
        textRefreshProductsButton: "Aktualisieren",
        clearFilterButton: "Filter löschen",

        // BOOKING PAGE
        h1BookingPage: "RESERVIERUNGEN",

        confirmBookingTitle: "Überprüfen und Bestätigen",
        userNameConfirmText: "Name der Reservierung",
        dateConfirmText: "Datum",
        timeConfirmText: "Uhrzeit",
        customersConfirmText: "Gäste",
        highChairConfirmText: "Hochstuhl?",
        aditionalMessageConfirmText: "Zusätzliche Nachricht",
        confirmButtonModal: "Bestätigen",
        loadingTextConfirmButtonModal: "Reservierung läuft...",

        bookingTimeText: "Uhrzeit",
        bookingTimePlaceholder: "Uhrzeit auswählen",
        bookingCustomersText: "Gäste",
        bookingCustomersPlaceholder: "Gäste auswählen",

        bookingHighChairTitle: "Hochstuhl hinzufügen",
        bookingHighChairDescription: "Kostenlos",

        bookingAditionalMessagePlaceholder: "Besondere Wünsche?",

        bookingMaxCapacityTableTitle: "Max. Kapazität:",
        bookingTableTypeTitle: "Tischart:",

        squareTableForm: "Quadratischer Tisch",
        roundTableForm: "Runder Tisch",
        rectangularTableForm: "Rechteckiger Tisch",

        bookingTableWifiText: "WLAN:",

        bookingSelectTableButton: "Tisch auswählen",

        bookingButtonConfirmText: "Reservieren",
        bookingButtonResetForm: "Formular zurücksetzen",

        toastBookingSuccess: "Reservierung abgeschlossen",
        toastBookingUnavailable: "Reservierung fehlgeschlagen: Dieser Tisch ist bereits reserviert.",
        toastBookingError: "Reservierung fehlgeschlagen. Bitte erneut versuchen",

        // ORDERS PAGE
        h1OrdersPage: "LIEFERUNG",
        smallOrdersPageSubtitle: "Genießen Sie unsere Speisekarte bequem von zu Hause aus.",

        ordersPageInputPlaceholder: "Produkte suchen...",

        addProductToCartButton: "In den Warenkorb",
        removeProductToCartButton: "Aus dem Warenkorb entfernen",
        loadingTextAddingProductsToCartButton: "Wird hinzugefügt...",
        loadingTextRemovingProductsFromCartButton: "Wird entfernt...",
        addOneMoreProductToCartButton: "Eins hinzufügen",
        removeOneMoreProductFromCartButton: "Eins entfernen",

        toastAddedProductToCart: "Hinzugefügt ✔",
        toastQuantityProductUpdatedToCart: "Warenkorb erfolgreich aktualisiert ✔",
        toastRemovedProductFromCart: "Artikel aus dem Warenkorb entfernt ✔",
        toastErrorAddingProductToCart: "Fehler: Konnte nicht zum Warenkorb hinzugefügt werden",
        toastErrorQuantityProductUpdatedToCart: "Fehler: Mengenaktualisierung fehlgeschlagen",
        toastErrorRemovingProductFromCart: "Fehler: Artikel konnte nicht aus dem Warenkorb entfernt werden",

        // CART PAGE
        h1CartPage: "IHR WARENKORB",
        confirmModalCartTitle: "Bestellbestätigung",
        confirmModalCartMessage: "Fast geschafft! Bestätigen Sie Ihre Bestellung, um fortzufahren",

        confirmButtonCartModal: "Bestätigen",
        loadingConfirmButtonCartModal: "Wird verarbeitet...",
        cancelButtonCartModal: "Zurück",

        accordionQtyText: "Menge:",
        accordionDescriptionText: "Beschreibung:",
        accordionPriceText: "Preis:",

        noProductsTitle: "Ihr Warenkorb ist leer",
        goToOrdersCartButton: "Jetzt bestellen",

        toastCartRemovedSuccess: "Warenkorb geleert ✔",
        toastCartRemovedError: "Fehler beim Entfernen aller Artikel",

        buttonCartPageOpenPaymentModal: "Bestellen",
        buttonCartPageDeleteCart: "Warenkorb leeren",

        // PROFILE PAGE
        h1ProfilePage: "Willkommen, ",
        userDataSectionTitle: "Persönliche Informationen",
        bookingsDataSectionTitle: "Ihre Reservierungen",
        ordersDataSectionTitle: "Ihre Bestellungen",

        buttonChangeAvatar: "Avatar ändern",

        //  ----- USER DATA
        nameFieldText: "Name",
        fullNameFieldText: "Vollständiger Name",
        emailFieldText: "E-Mail",
        addressFieldText: "Adresse",
        passwordFieldText: "Passwort",
        confirmPasswordFieldText: "Passwort bestätigen",
        userDataModalTitle: "Datenänderung bestätigen",
        userDataModalMessage: "Änderung bestätigen: ",
        userDataModalMessageNexo: "zu",
        userDataModalConfirmText: "Ändern",
        loadingUserDataModalConfirmText: "Wird geändert...",
        userDataModalCancelText: "Abbrechen",

        userDataEditButtonText: "Bearbeiten",
        userDataChangeButtonText: "Ändern",

        toastUserDataChangeSuccess: "Profil erfolgreich aktualisiert ✔",
        toastUserDataChangeError: "Fehler beim Aktualisieren des Profils",

        //  ------ BOOKING DATA
        bookingDataTitle1: "Ihre nächsten Reservierungen",
        bookingDataTitle2: "Ihre vergangenen Besuche",
        bookingDataNoPendingBookingsFound: "Sie haben keine ausstehenden Reservierungen.",
        bookingDataNoPastVisitsFound: "Sie haben keine vergangenen Besuche",

        buttonBookingDataMakeABook: "Jetzt reservieren",
        buttonBookingDataCloseModalInfo: "Schließen",
        buttonBookingDataCancelReservation: "Reservierung stornieren",

        bookingDataModalDeletingTitle: "Reservierung löschen",
        bookingDataModalDeletingbutton: "Löschen",
        loadingBookingDataModalDeletingbutton: "Wird gelöscht...",

        bookingDataModalInfotitle: "Reservierungsdetails",
        bookingDataModalInfoMessageText1: "Ihre Reservierung löschen für ",
        bookingDataModalInfoMessageCustomer1: "Gast",
        bookingDataModalInfoMessageCustomer2: "Gäste",

        bookingDataModalInfoDateText: "Reservierungsdatum:",
        bookingDataModalInfoTimeText: "Reservierungszeit:",
        bookingDataModalInfoPartySizeText: "Personenanzahl:",
        bookingDataModalInfoHighChairText: "Hochstuhl erforderlich?",

        toastBookingDataDeltingBookingError: "Fehler beim Löschen der Reservierung",

        //  -----ORDERS DATA
        ordersDataTitle1: "Ausstehende Bestellungen",
        ordersDataTitle2: "Abgeschlossene Bestellungen",

        ordersDataInfoModalMessage: "Möchten Sie die Bestellung stornieren von ",

        toastOrdersDataSuccess: "Bestellung erfolgreich storniert ✔",
        toastOrdersDataError: "Fehler beim Stornieren der Bestellung.",

        ordersDataNotPendingOrdersText: "Es gibt keine ausstehenden Bestellungen.",
        ordersDataNotOrders: "Es gibt keine Bestellungen.",

        ordersDataCancelModalTitle: "Bestellung stornieren",
        ordersDataCancelModalBackButton: "Zurück",
        loadingOrdersDataCancelButton: "Wird storniert...",

        ordersDataInfoModalTitle: "Bestelldetails",
        ordersDataInfoModalcreationText: "Erstellungsdatum:",
        ordersDataInfoModalProductText: "Produkt:",
        ordersDataInfoModalPriceText: "Preis:",
        ordersDataInfoModalTotalProductsText: "Gesamtprodukte:",
        ordersDataInfoModalTotalCountText: "Gesamt:",
        buttonOrdersDataInfomodalCloseText: "Schließen",

        buttonOrdersDataInfoCancelText: "Stornieren",

        // Footer
        copyrightText: "ReservApp. Alle Rechte vorbehalten",

        // Allgemeine Nachrichten
        affirmationText: "Ja",
        NegationText: "Nein",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "E-Mail-Feld ist erforderlich",
        emailNotValidField1: "E-Mail ungültig ('@' fehlt)",
        emailNotValidField2: "E-Mail ungültig ('.' fehlt)",
        emailTooShortField: "E-Mail zu kurz (min. 5 Zeichen)",
        emailTooLongField: "E-Mail zu lang (max. 50 Zeichen)",

        passwordIsRequiredField: "Passwort-Feld ist erforderlich",
        passwordTooShortField: "Passwort zu kurz (min. 9 Zeichen)",
        passwordTooLongField: "Passwort zu lang (max. 30 Zeichen)",

        confirmPasswordIsRequiredField: "Passwort bestätigen-Feld ist erforderlich",
        doNotMatchPasswordsFields: "Passwörter stimmen nicht überein",

        nameIsRequiredField: "Name-Feld ist erforderlich",
        nameIsTooShortField: "Name zu kurz (min. 4 Zeichen)",
        nameIsTooLongField: "Name zu lang (max. 30 Zeichen)",

        addressIsRequiredField: "Adress-Feld ist erforderlich",
        addressTooShortField: "Adresse zu kurz (min. 6 Zeichen)",
        addressTooLongField: "Adresse zu lang (max. 60 Zeichen)",

        bookingDateIsRequiredField: "Sie müssen ein Reservierungsdatum auswählen",
        bookingTimeIsRequiredField: "Uhrzeit-Feld ist erforderlich",
        bookingCustomersIsRequiredField: "Gäste-Feld ist erforderlich",
        bookingTableIsRequiredField: "Sie müssen einen Tisch auswählen",

        profileNameNotEmptyField: "Name-Feld darf nicht leer sein",
        profileEmailNotEmptyField: "E-Mail darf nicht leer sein",
        profileAddressNotEmptyField: "Adresse darf nicht leer sein",

        //  CTA CARDS DATA
        cardDataMenuTitle: "Sehen Sie unsere Speisekarte",
        cardDataMenuDescription: "Durchsuchen Sie unsere vollständige Auswahl an Gerichten und Getränken.",
        cardDataMenuButtonText: "Speisekarte ansehen",

        cardDataLoginTitle: "Willkommen zurück",
        cardDataLoginDescription: "Melden Sie sich an, um Ihre Bestellungen und Reservierungen zu verwalten.",
        cardDataLoginButtonText: "Anmelden",

        cardDataBookingTitle: "Reservieren Sie Ihren Tisch",
        cardDataBookingDescription: "Wählen Sie Datum, Uhrzeit und wir reservieren Ihren Platz.",
        cardDataBookingButtonText: "Jetzt reservieren",

        cardDataOrdersTitle: "Hunger? Wir haben Sie abgedeckt",
        cardDataOrdersDescription: "Genießen Sie unsere besten Gerichte bequem von zu Hause aus.",
        cardDataOrdersButtonText: "Jetzt bestellen",

        // PRODUCTS DATA
        productCokeName: "Coca-Cola",
        productCokeDescription: "Flasche Coca-Cola serviert mit Eiswürfeln und einer Limettenscheibe.",

        productOrangeFantaName: "Fanta Orange",
        productOrangeFantaDescription:
            "Flasche Fanta Orange serviert mit Eiswürfeln und einer Orangenscheibe.",

        productMineralWaterName: "Mineralwasser",
        productMineralWaterDescription: "Flasche Mineralwasser serviert mit Eiswürfeln.",

        productSparklingWaterName: "Sprudelwasser",
        productSparklingWaterDescription:
            "Flasche Sprudelwasser serviert mit Eiswürfeln und einer Limettenscheibe.",

        productBeerName: "Fuller's Bier",
        productBeerDescription: "Halbes Pint unseres Premium Ales (Fuller's).",

        productOrangeJuiceName: "Frisch gepresster Orangensaft",
        productOrangeJuiceDescription: "Ein Glas frisch gepresster Orangensaft",

        productLemonFantaName: "Fanta Zitrone",
        productLemonFantaDescription:
            "Flasche Fanta Zitrone serviert mit Eiswürfeln und einer Zitronenscheibe.",

        productRedWineName: "Glas Rotwein",
        productRedWineDescription: "Unser Hauswein Rot.",

        productWhiteWineName: "Glas Weißwein",
        productWhiteWineDescription: "Unser Hauswein Weiß",

        productCoffeeName: "Espresso",
        productCoffeDescription: "Unser Espresso-Kaffee aus den besten Arabica-Kaffeebohnen.",

        productToastName: "Tomaten-Toast",
        productDescription: "Geröstetes Brot mit Tomate, Knoblauch und unserem besten spanischen Olivenöl.",

        productCheeseName: "Käseplatte",
        productCheeseDescription: "Unsere beste Auswahl an einheimischen Käsesorten mit Beilagen.",

        productCroquettesName: "Schinken-Kroketten",
        productCroquettesDescription:
            "Die besten hausgemachten Schinken-Kroketten, die wir je gemacht haben.",

        productIberianHamName: "Iberischer Schinken",
        productIberianHamDescription: "100g unseres feinsten 5J Iberischen Schinkens, handgeschnitten.",

        productBravasName: "Patatas Bravas",
        productBravasDescription: "Unsere handverlesenen Kartoffeln und die beste Brava-Sauce der Welt.",

        productMixedSaladName: "Traditioneller Salat",
        productMixedSaladDescription:
            "Eine Schüssel mit Salat, Tomate, Zwiebel und Oliven. Kann mit Dressing serviert werden.",

        productClassicBurgerName: "Rindfleisch-Burger",
        productClassicBurgerDescription:
            "Der Rindfleisch-Burger Nummer eins mit unserem besten Cheddar-Käse, Tomate und Salat.",

        productPorkSteakSirloinName: "Iberisches Schweine-Filet",
        productPorkSteakSirloinDescription: "Gegrilltes Schweinefilet serviert mit unserer besten Minzsauce.",

        productRisottoName: "Steinpilz-Risotto",
        productRisottoDescription:
            "Das cremigste Risotto, das wir je gemacht haben, serviert mit Steinpilzscheiben.",

        productVeggieBurgerName: "Veggie-Burger",
        productVeggieBurgerDescription:
            "Ein saftiges pflanzliches Patty aus Rote Beete, Erbsenprotein, Karotte und Apfel, serviert in einem weichen Brioche-Brötchen mit roter Zwiebel und knackigem Salat.",

        productSteakTartareName: "Steak Tartar",
        productSteakTartareDescription:
            "Steak Tartar serviert mit Eigelb und geräuchert mit Schokoladenholz.",

        productTakosName: "Hähnchen-Tacos",
        productTakosDescription:
            "Marinierte Hähnchen-Tacos serviert mit scharfer Sauce und frischem Pico de Gallo.",

        productRoastChickenName: "Brathähnchen",
        productRoastChickenDescription:
            "Unser bestes Brathähnchen serviert mit unserer handwerklichen Zitronen-Pfeffer-Sauce.",

        productCarbonaraName: "Spaghetti Carbonara",
        productCarbonaraDescription:
            "Frische Spaghetti-Pasta zubereitet mit unserer traditionellen Carbonara-Sauce.",

        productPaellaName: "Meeresfrüchte-Paella",
        productPaellaDescription:
            "Eine traditionelle spanische Paella serviert mit einer Vielzahl von Meeresfrüchten",

        productCalamariName: "Frittierte Calamari",
        productCalamariDescription: "Panierte Calamari-Ringe, serviert mit einem Stück Zitrone.",

        productSoupName: "Iberische Schinkensuppe",
        productSoupDescription:
            "Unsere hausgemachte Suppe serviert mit einem gekochten Ei und Iberischem Schinken.",

        productMusselsMariniereName: "Muscheln nach Matrosenart",
        productMusselsMarinièreDescription:
            "Muscheln gekocht in unserer frischen hausgemachten Marinara-Sauce.",

        productPizzaName: "Pizza Margherita",
        productPizzaDescription:
            "Unsere hausgemachte Pizzabasis mit Tomate, frischem Mozzarella und Basilikum.",

        productLasagnaName: "Lasagne Bolognese",
        productLasagnaDescription:
            "Unsere hausgemachte Lasagne zubereitet mit Bolognese-Sauce und Béchamelsauce.",

        productSalmonName: "Gegrillter Lachs",
        productSalmonDescription:
            "Ein frisches Lachsfilet perfekt gegrillt und serviert mit unserer cremigen Kürbissuppe.",

        productEntrecoteBeefName: "Entrecôte vom Rind",
        productentrecoteBeefDescription: "Gegrilltes und gesalzenes Entrecôte vom Rind",

        productFrenchFriesName: "Pommes Frites Beilage",
        productFrenchFriesDescription: "Eine salzige Beilage unserer besten Pommes Frites",

        productGarlicBreadName: "Knoblauchbrot",
        productGarlicBreadDescription: "Scheiben unseres butterigen und knusprigen Knoblauchbrots.",

        productEggFlanName: "Eier-Flan",
        productEggFlanDescription:
            "Hausgemachter Flan serviert mit unserem handwerklichen flüssigen Karamell und dem klassischen Napolitana-Keks.",

        productCremaCatalanaName: "Crema Catalana",
        productCremaCatalanaDescription:
            "Unser traditionelles spanisches Dessert serviert mit karamellisiertem Zucker.",

        productPannaCottaName: "Panna Cotta",
        productPannaCottaDescription: "Hausgemachte Panna Cotta serviert mit Rote-Früchte-Coulis.",

        productCheesecakeName: "Käsekuchen",
        productCheesecakeDescription:
            "Unser cremiger hausgemachter Käsekuchen serviert mit Heidelbeermarmelade",

        productBrownieName: "Schokoladen-Brownie",
        productBrownieDescription:
            "Unser handwerklicher perfekt gebackener Brownie mit handwerklichem Vanilleeis.",
    },

    zh: {
        // 导航栏
        userReplaceName: "用户",
        toastLogoutError: "退出登录失败。",

        bookingPageNavLabel: "预订",
        ordersPageNavLabel: "订单",
        menusPageNavLabel: "菜单",
        cartPageNavLabel: "购物车",

        lodingTextLogoutUser: "正在关闭个人资料...",
        logoutButton: "退出登录",
        loadingTextLogoutButton: "正在退出...",
        loginButton: "登录",
        registerButton: "注册",

        toastErrorLogout: "退出登录失败",

        profilePageButton: "个人资料",

        // LOGIN PAGE
        h1LoginPage: "登录",

        toastLoginError: "登录失败",
        loadingLoginButtonText: "正在登录...",

        // REGISTER PAGE
        h1RegisterPage: "加入我们",

        registerButtonText: "注册",
        loadingRegisterButtonText: "正在注册...",

        namePlaceholderFieldText: "请输入您的姓名",
        emailPlaceholderFieldText: "请输入您的邮箱",
        addressPlaceholderFieldText: "配送地址",
        passwordPlaceholderFieldText: "请输入您的密码",
        confirmPasswordPlaceholderFieldText: "请再次输入您的密码",

        toastRegisterError: "注册失败",

        // HOME PAGE
        toastWelcomeRegister: "欢迎",
        toastLoginSuccess: "登录成功 ✔",
        toastLogoutSuccess: "退出登录成功 ✔",

        h1HomePage: "ReservApp",

        // MENUPAGE
        fetchMessageError: "加载产品错误。请重试。",
        allCategoriesFilter: "所有类别",
        h1MenuPage: "菜单",

        loadingTextRefreshProductsButton: "正在刷新产品...",
        textRefreshProductsButton: "刷新",
        clearFilterButton: "清除筛选",

        // BOOKING PAGE
        h1BookingPage: "预订",

        confirmBookingTitle: "审核并确认",
        userNameConfirmText: "预订姓名",
        dateConfirmText: "日期",
        timeConfirmText: "时间",
        customersConfirmText: "用餐人数",
        highChairConfirmText: "需要儿童椅吗？",
        aditionalMessageConfirmText: "附加信息",
        confirmButtonModal: "确认",
        loadingTextConfirmButtonModal: "正在预订...",

        bookingTimeText: "时间",
        bookingTimePlaceholder: "选择时间",
        bookingCustomersText: "用餐人数",
        bookingCustomersPlaceholder: "选择人数",

        bookingHighChairTitle: "添加儿童椅",
        bookingHighChairDescription: "免费",

        bookingAditionalMessagePlaceholder: "有特殊要求吗？",

        bookingMaxCapacityTableTitle: "最大容量：",
        bookingTableTypeTitle: "桌子类型：",

        squareTableForm: "方桌",
        roundTableForm: "圆桌",
        rectangularTableForm: "长方桌",

        bookingTableWifiText: "无线网络：",

        bookingSelectTableButton: "选择桌子",

        bookingButtonConfirmText: "预订",
        bookingButtonResetForm: "重置表单",

        toastBookingSuccess: "预订成功",
        toastBookingUnavailable: "预订失败：该桌已被预订。",
        toastBookingError: "预订失败。请重试",

        // ORDERS PAGE
        h1OrdersPage: "外卖",
        smallOrdersPageSubtitle: "在家舒适地享受我们的菜单。",

        ordersPageInputPlaceholder: "搜索产品...",

        addProductToCartButton: "添加到购物车",
        removeProductToCartButton: "从购物车移除",
        loadingTextAddingProductsToCartButton: "正在添加...",
        loadingTextRemovingProductsFromCartButton: "正在移除...",
        addOneMoreProductToCartButton: "添加一个",
        removeOneMoreProductFromCartButton: "移除一个",

        toastAddedProductToCart: "已添加 ✔",
        toastQuantityProductUpdatedToCart: "购物车更新成功 ✔",
        toastRemovedProductFromCart: "商品已从购物车移除 ✔",
        toastErrorAddingProductToCart: "错误：无法添加到购物车",
        toastErrorQuantityProductUpdatedToCart: "错误：数量更新失败",
        toastErrorRemovingProductFromCart: "错误：无法从购物车移除商品",

        // CART PAGE
        h1CartPage: "您的购物车",
        confirmModalCartTitle: "订单确认",
        confirmModalCartMessage: "快完成了！确认您的订单以继续",

        confirmButtonCartModal: "确认",
        loadingConfirmButtonCartModal: "正在处理...",
        cancelButtonCartModal: "返回",

        accordionQtyText: "数量：",
        accordionDescriptionText: "描述：",
        accordionPriceText: "价格：",

        noProductsTitle: "您的购物车是空的",
        goToOrdersCartButton: "立即订购",

        toastCartRemovedSuccess: "购物车已清空 ✔",
        toastCartRemovedError: "删除所有商品失败",

        buttonCartPageOpenPaymentModal: "订购",
        buttonCartPageDeleteCart: "清空购物车",

        // PROFILE PAGE
        h1ProfilePage: "欢迎，",
        userDataSectionTitle: "个人信息",
        bookingsDataSectionTitle: "您的预订",
        ordersDataSectionTitle: "您的订单",

        buttonChangeAvatar: "更换头像",

        //  ----- USER DATA
        nameFieldText: "姓名",
        fullNameFieldText: "全名",
        emailFieldText: "邮箱",
        addressFieldText: "地址",
        passwordFieldText: "密码",
        confirmPasswordFieldText: "确认密码",
        userDataModalTitle: "确认数据更改",
        userDataModalMessage: "确认更改：",
        userDataModalMessageNexo: "为",
        userDataModalConfirmText: "更改",
        loadingUserDataModalConfirmText: "正在更改...",
        userDataModalCancelText: "取消",

        userDataEditButtonText: "编辑",
        userDataChangeButtonText: "更改",

        toastUserDataChangeSuccess: "个人资料更新成功 ✔",
        toastUserDataChangeError: "更新个人资料错误",

        //  ------ BOOKING DATA
        bookingDataTitle1: "您的即将到来的预订",
        bookingDataTitle2: "您的历史访问",
        bookingDataNoPendingBookingsFound: "您没有待处理的预订。",
        bookingDataNoPastVisitsFound: "您没有历史访问记录",

        buttonBookingDataMakeABook: "立即预订",
        buttonBookingDataCloseModalInfo: "关闭",
        buttonBookingDataCancelReservation: "取消预订",

        bookingDataModalDeletingTitle: "删除预订",
        bookingDataModalDeletingbutton: "删除",
        loadingBookingDataModalDeletingbutton: "正在删除...",

        bookingDataModalInfotitle: "预订详情",
        bookingDataModalInfoMessageText1: "删除您的预订，预订人数为",
        bookingDataModalInfoMessageCustomer1: "位客人",
        bookingDataModalInfoMessageCustomer2: "位客人",

        bookingDataModalInfoDateText: "预订日期：",
        bookingDataModalInfoTimeText: "预订时间：",
        bookingDataModalInfoPartySizeText: "人数：",
        bookingDataModalInfoHighChairText: "需要儿童椅吗？",

        toastBookingDataDeltingBookingError: "删除预订错误",

        //  -----ORDERS DATA
        ordersDataTitle1: "待处理订单",
        ordersDataTitle2: "已完成订单",

        ordersDataInfoModalMessage: "您想取消订单吗",

        toastOrdersDataSuccess: "订单取消成功 ✔",
        toastOrdersDataError: "取消订单错误。",

        ordersDataNotPendingOrdersText: "没有待处理的订单。",
        ordersDataNotOrders: "没有订单。",

        ordersDataCancelModalTitle: "取消订单",
        ordersDataCancelModalBackButton: "返回",
        loadingOrdersDataCancelButton: "正在取消...",

        ordersDataInfoModalTitle: "订单详情",
        ordersDataInfoModalcreationText: "创建日期：",
        ordersDataInfoModalProductText: "产品：",
        ordersDataInfoModalPriceText: "价格：",
        ordersDataInfoModalTotalProductsText: "总产品数：",
        ordersDataInfoModalTotalCountText: "总计：",
        buttonOrdersDataInfomodalCloseText: "关闭",

        buttonOrdersDataInfoCancelText: "取消",

        // Footer
        copyrightText: "ReservApp. 版权所有",

        // 常规消息
        affirmationText: "是",
        NegationText: "否",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "邮箱字段为必填项",
        emailNotValidField1: "邮箱无效（缺少'@'）",
        emailNotValidField2: "邮箱无效（缺少'.'）",
        emailTooShortField: "邮箱太短（最少5个字符）",
        emailTooLongField: "邮箱太长（最多50个字符）",

        passwordIsRequiredField: "密码字段为必填项",
        passwordTooShortField: "密码太短（最少9个字符）",
        passwordTooLongField: "密码太长（最多30个字符）",

        confirmPasswordIsRequiredField: "确认密码字段为必填项",
        doNotMatchPasswordsFields: "密码不匹配",

        nameIsRequiredField: "姓名字段为必填项",
        nameIsTooShortField: "姓名太短（最少4个字符）",
        nameIsTooLongField: "姓名太长（最多30个字符）",

        addressIsRequiredField: "地址字段为必填项",
        addressTooShortField: "地址太短（最少6个字符）",
        addressTooLongField: "地址太长（最多60个字符）",

        bookingDateIsRequiredField: "您必须选择预订日期",
        bookingTimeIsRequiredField: "时间字段为必填项",
        bookingCustomersIsRequiredField: "用餐人数字段为必填项",
        bookingTableIsRequiredField: "您必须选择一张桌子",

        profileNameNotEmptyField: "姓名字段不能为空",
        profileEmailNotEmptyField: "邮箱不能为空",
        profileAddressNotEmptyField: "地址不能为空",

        //  CTA CARDS DATA
        cardDataMenuTitle: "查看我们的菜单",
        cardDataMenuDescription: "浏览我们全部的菜品和饮料选择。",
        cardDataMenuButtonText: "查看菜单",

        cardDataLoginTitle: "欢迎回来",
        cardDataLoginDescription: "登录以管理您的订单和预订。",
        cardDataLoginButtonText: "登录",

        cardDataBookingTitle: "预订您的桌子",
        cardDataBookingDescription: "选择您的日期、时间，我们将为您保留位置。",
        cardDataBookingButtonText: "立即预订",

        cardDataOrdersTitle: "饿了吗？我们为您服务",
        cardDataOrdersDescription: "在家舒适地享受我们的最佳菜品。",
        cardDataOrdersButtonText: "立即订购",

        // PRODUCTS DATA
        productCokeName: "可口可乐",
        productCokeDescription: "瓶装可口可乐配冰块和一片青柠。",

        productOrangeFantaName: "橙味芬达",
        productOrangeFantaDescription: "瓶装橙味芬达配冰块和一片橙子。",

        productMineralWaterName: "矿泉水",
        productMineralWaterDescription: "瓶装矿泉水配冰块。",

        productSparklingWaterName: "苏打水",
        productSparklingWaterDescription: "瓶装苏打水配冰块和一片青柠。",

        productBeerName: "富勒啤酒",
        productBeerDescription: "半品脱我们的优质艾尔啤酒（富勒）。",

        productOrangeJuiceName: "鲜榨橙汁",
        productOrangeJuiceDescription: "一杯鲜榨橙汁",

        productLemonFantaName: "柠檬味芬达",
        productLemonFantaDescription: "瓶装柠檬味芬达配冰块和一片柠檬。",

        productRedWineName: "红葡萄酒杯",
        productRedWineDescription: "我们的招牌红葡萄酒。",

        productWhiteWineName: "白葡萄酒杯",
        productWhiteWineDescription: "我们的招牌白葡萄酒",

        productCoffeeName: "浓缩咖啡",
        productCoffeDescription: "用最好的阿拉比卡咖啡豆制作的浓缩咖啡。",

        productToastName: "番茄吐司",
        productDescription: "烤面包配番茄、大蒜和我们最好的西班牙橄榄油。",

        productCheeseName: "奶酪拼盘",
        productCheeseDescription: "我们精选的国产奶酪配小食。",

        productCroquettesName: "火腿可乐饼",
        productCroquettesDescription: "我们做过的最好的自制火腿可乐饼。",

        productIberianHamName: "伊比利亚火腿",
        productIberianHamDescription: "100克我们最好的5J伊比利亚火腿，手工切片。",

        productBravasName: "辣味炸薯条",
        productBravasDescription: "我们精选的土豆和世界上最好的辣味酱。",

        productMixedSaladName: "传统沙拉",
        productMixedSaladDescription: "一碗生菜、番茄、洋葱和橄榄。可配沙拉酱。",

        productClassicBurgerName: "牛肉汉堡",
        productClassicBurgerDescription: "第一名的牛肉汉堡配我们最好的切达奶酪、番茄和生菜。",

        productPorkSteakSirloinName: "伊比利亚猪里脊牛排",
        productPorkSteakSirloinDescription: "烤猪里脊牛排配我们最好的薄荷酱。",

        productRisottoName: "牛肝菌意式烩饭",
        productRisottoDescription: "我们做过的最奶油的意式烩饭配牛肝菌片。",

        productVeggieBurgerName: "素食汉堡",
        productVeggieBurgerDescription:
            "用甜菜根、豌豆蛋白、胡萝卜和苹果制作的多汁植物基汉堡，配红洋葱和脆生菜，夹在柔软的布里欧修面包中。",

        productSteakTartareName: "鞑靼牛排",
        productSteakTartareDescription: "鞑靼牛排配蛋黄，用巧克力木熏制。",

        productTakosName: "鸡肉塔可",
        productTakosDescription: "腌制鸡肉塔可配辣酱和新鲜墨西哥莎莎酱。",

        productRoastChickenName: "烤鸡",
        productRoastChickenDescription: "我们最好的烤鸡配手工柠檬胡椒酱。",

        productCarbonaraName: "意大利培根蛋面",
        productCarbonaraDescription: "用我们传统的培根蛋酱制作的新鲜意面。",

        productPaellaName: "海鲜烩饭",
        productPaellaDescription: "传统西班牙烩饭配各种海鲜",

        productCalamariName: "炸鱿鱼圈",
        productCalamariDescription: "裹面炸鱿鱼圈，配柠檬角。",

        productSoupName: "伊比利亚火腿汤",
        productSoupDescription: "我们的自制汤配煮鸡蛋和伊比利亚火腿。",

        productMusselsMariniereName: "水手式贻贝",
        productMusselsMarinièreDescription: "用我们新鲜的自制水手式酱汁烹制的贻贝。",

        productPizzaName: "玛格丽特披萨",
        productPizzaDescription: "我们的自制披萨底配番茄、新鲜马苏里拉奶酪和罗勒。",

        productLasagnaName: "博洛尼亚千层面",
        productLasagnaDescription: "用博洛尼亚肉酱和白酱制作的自制千层面。",

        productSalmonName: "烤三文鱼",
        productSalmonDescription: "新鲜三文鱼片完美烤制，配我们奶油南瓜汤。",

        productEntrecoteBeefName: "牛里脊肉",
        productentrecoteBeefDescription: "烤制并加盐的牛里脊肉",

        productFrenchFriesName: "炸薯条配菜",
        productFrenchFriesDescription: "一份咸味的我们最好的炸薯条",

        productGarlicBreadName: "蒜香面包",
        productGarlicBreadDescription: "我们黄油蒜香脆面包片。",

        productEggFlanName: "鸡蛋布丁",
        productEggFlanDescription: "自制布丁配我们的手工液体焦糖和经典那不勒斯饼干。",

        productCremaCatalanaName: "加泰罗尼亚奶油",
        productCremaCatalanaDescription: "我们的传统西班牙甜点配焦糖化糖。",

        productPannaCottaName: "意式奶冻",
        productPannaCottaDescription: "自制意式奶冻配红色水果果酱。",

        productCheesecakeName: "芝士蛋糕",
        productCheesecakeDescription: "我们奶油自制芝士蛋糕配蓝莓果酱",

        productBrownieName: "巧克力布朗尼",
        productBrownieDescription: "我们完美烘焙的手工布朗尼配手工香草冰淇淋。",
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
    const [lang, setLang] = useState(() => {
        const langFromStorage = getDataFromSessionStorage("lang");
        if (!langFromStorage) return "en";
        return langFromStorage;
    });

    const getText = (key) => {
        const selectedText = TEXTS[lang][key];
        if (!selectedText)
            return TEXTS[lang] && TEXTS[lang].noTextFound ? TEXTS[lang].noTextFound : "No text Found";
        return selectedText;
    };
    const handleLang = (lang = "en") => {
        setLang(lang);
        saveDataInSessionStorage("lang", lang);
    };

    return (
        <LanguageContext value={{ lang, TEXTS, languages, getText, handleLang }}>{children}</LanguageContext>
    );
};
