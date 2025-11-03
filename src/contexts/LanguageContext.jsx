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
        phoneNumberFieldText: "Phone Number",
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
        // - - - DASHBOARD ITEMS - - -
        dashboardTotalUsersDescriptionLabel: "Users",
        dashboardConnectedUsersDescriptionLabel: "Users Online",

        dashboardTotalBookingsDescriptionLabel: "Bookings",
        dashboardPendingBookingsDescriptionLabel: "Bookings (Today)",
        dashboardDelayedBookingsDescriptionLabel: "Delayed Bookings",

        dashboardTotalOrdersDescriptionLabel: "Orders",
        dashboardCompletedOrdersDescriptionLabel: "Completed Orders",
        dashboardPendingOrdersDescriptionLabel: "Pending Orders",
        dashboardCancelledOrdersDescriptionLabel: "Cancelled Orders",
        dashboardSuccesfulAverageOrdersDescriptionLabel: "Order Completion Rate",

        dashboardTotalProductsDescriptionLabel: "Products",

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

        // - - - ADMIN BENTO GRID ITEM - - -
        bentoGridUserRoleText: "Role:",

        //  - - - ADMIN USERS PAGE
        h1AdminUserPage: "Users",

        adminUserPageLabelTextName: "Filter users by name",
        adminUserPagePlaceholderTextName: "Search users...",

        adminUserPageDefaultStatusFilter: "Filter by status",
        adminUserPageActiveStatusFilter: "Active",
        adminUserPageInactiveStatusFilter: "Inactive",

        adminUserPageUserRoleText: "Role:",

        //  - - - ADMIN USER DETAILS
        adminUserDetailNotSubjectFieldText: "Please enter a subject.",
        adminUserDetailNotMessageFieldText: "Please enter a message.",

        adminUserDetailMailModalTitle: "Send Email to -",
        adminUserDetailMailModalSubjectText: "Subject",
        adminUserDetailMailModalSubjectPlaceholder: "Write a Subject...",
        adminUserDetailMailModalMessageText: "Message",
        adminUserDetailMailModalMessagePlaceholder: "Write a message...",
        adminUserDetailMailModalSendButton: "Send",
        adminUserDetailMailButtonText: "Send Email",

        adminUserDetailConfirmModalTitle: "Call Confirmation",
        adminUserDetailConfirmModalText: "Call",
        adminUserDetailConfirmModalButtonText: "Call User",

        adminUserDetailDeleteModalTitle: "Delete User",
        adminUserDetailDeleteModalText: "Are you sure you want to delete",
        adminUserDetailDeleteModalDeleteButton: "Delete user",
        loadingAdminUserDetailDeleteModalDeleteButton: "Deleting user...",

        adminUserDetailBookingsCountText: "Total Reservations:",
        adminUserDetailOrdersCountText: "Total Reservations:",

        adminUserDetailDeleteButtonText: "Delete User",
        adminUserDetailCancelButton: "Cancel",
        toastAdminUserDetailsRemoveUserError: "Error Deleting User",

        // - - - ADMIN BOOKINGS PAGE
        h1AdminBookingsPage: "BOOKINGS",

        adminBookingsAllLinkText: "All bookings",
        adminBookingsTodaysLinkText: "Today",
        adminBookingsSelectDateText: "Select Date",

        // - - - ADMIN BOOKINGS TODAY SECTION
        h5AdminBookingsTodaySection: "Bookings for ",
        adminBookingsTodaySectionPendingTitle: "Pending Bookings",
        adminBookingsTodaySectionLateArrivalsTitle: "Late Arrivals",
        adminBookingsTodaySectionNotPendingBookingsText: "There's not Pending Bookings",

        // - - - ADMIN BOOKING CARD
        adminBookingCardCustomersText: "Guests: ",
        adminBookingCardBookedByText: "Booked by: ",

        // - - - ADMIN BOOKING DETAIL
        adminBookingDetailSuccessCancelToast: "Booking cancelled successfully ✔",
        adminBookingDetailErrorCancelToast: "Failed to cancel booking",

        adminBookingDetailCancelModaltitleText: "Cancel Booking",
        adminBookingDetailCancelModalMessageText: "Are you sure you want to cancel the booking of ",
        adminBookingDetailCancelConfirmButtonText: "Cancel Booking",
        loadingAdminBookingDetailCancelConfirmButtonText: "Cancelling...",
        adminBookingDetailCancelCancelButtonText: "Go back",

        adminBookingDetailBookedOnText: "Booked on: ",
        adminBookingDetailAdditinoalMessageText: "Additional message:",
        adminBookingDetailExtrasText: "Extras:",
        adminBookingDetailHighChairExtraText: "High Chair",
        adminBookingDetailStatusText: "Status: ",

        adminBookingDetailCompletedStatusText: "Completed",
        adminBookingDetailPendingStatusText: "Pending",
        adminBookingDetailCancelledStatusText: "Cancelled",
        adminBookingDetailCancelBookingButtonText: "Cancel Booking",
    },

    es: {
        // BARRA DE NAVEGACIÓN
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

        // PÁGINA DE LOGIN
        h1LoginPage: "Iniciar Sesión",

        toastLoginError: "Error al iniciar sesión",
        loadingLoginButtonText: "Iniciando sesión...",

        // PÁGINA DE REGISTRO
        h1RegisterPage: "Únete a Nosotros",

        registerButtonText: "Registrarse",
        loadingRegisterButtonText: "Registrando...",

        namePlaceholderFieldText: "Introduce tu nombre",
        emailPlaceholderFieldText: "Introduce tu email",
        addressPlaceholderFieldText: "Dirección de entrega",
        passwordPlaceholderFieldText: "Introduce tu contraseña",
        confirmPasswordPlaceholderFieldText: "Vuelve a introducir tu contraseña",

        toastRegisterError: "Error en el registro",

        // PÁGINA DE INICIO
        toastWelcomeRegister: "Bienvenido",
        toastLoginSuccess: "Sesión iniciada correctamente ✔",
        toastLogoutSuccess: "Sesión cerrada correctamente ✔",

        h1HomePage: "ReservApp",

        // PÁGINA DE MENÚ
        fetchMessageError: "Error al cargar los productos. Inténtalo de nuevo.",
        allCategoriesFilter: "Todas las Categorías",
        h1MenuPage: "MENÚ",

        loadingTextRefreshProductsButton: "Actualizando Productos...",
        textRefreshProductsButton: "Actualizar",
        clearFilterButton: "Limpiar Filtro",

        // PÁGINA DE RESERVAS
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
        bookingTimePlaceholder: "Seleccionar Hora",
        bookingCustomersText: "Comensales",
        bookingCustomersPlaceholder: "Seleccionar Comensales",

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

        // PÁGINA DE PEDIDOS
        h1OrdersPage: "ENTREGA A DOMICILIO",
        smallOrdersPageSubtitle: "Disfruta de nuestro menú desde la comodidad de tu hogar.",

        ordersPageInputPlaceholder: "Buscar Productos...",

        addProductToCartButton: "Añadir al Carrito",
        removeProductToCartButton: "Eliminar del Carrito",
        loadingTextAddingProductsToCartButton: "Añadiendo...",
        loadingTextRemovingProductsFromCartButton: "Eliminando...",
        addOneMoreProductToCartButton: "Añadir uno",
        removeOneMoreProductFromCartButton: "Eliminar uno",

        toastAddedProductToCart: "Añadido ✔",
        toastQuantityProductUpdatedToCart: "Carrito actualizado correctamente ✔",
        toastRemovedProductFromCart: "Artículo eliminado del carrito ✔",
        toastErrorAddingProductToCart: "Error: No se pudo añadir al carrito",
        toastErrorQuantityProductUpdatedToCart: "Error: Fallo al actualizar cantidad",
        toastErrorRemovingProductFromCart: "Error: No se pudo eliminar del carrito",

        // PÁGINA DE CARRITO
        h1CartPage: "TU CARRITO",
        confirmModalCartTitle: "Confirmación del Pedido",
        confirmModalCartMessage: "¡Casi terminado! Confirma tu pedido para continuar",

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

        // PÁGINA DE PERFIL
        h1ProfilePage: "Bienvenido/a, ",
        userDataSectionTitle: "Información Personal",
        bookingsDataSectionTitle: "Tus Reservas",
        ordersDataSectionTitle: "Tus Pedidos",

        buttonChangeAvatar: "Cambiar Avatar",

        //  ----- DATOS DE USUARIO
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
        toastUserDataChangeError: "Error al actualizar perfil",

        //  ------ DATOS DE RESERVAS
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

        bookingDataModalInfotitle: "Detalles de la reserva",
        bookingDataModalInfoMessageText1: "Eliminar tu Reserva para ",
        bookingDataModalInfoMessageCustomer1: "Comensal",
        bookingDataModalInfoMessageCustomer2: "Comensales",

        bookingDataModalInfoDateText: "Fecha de reserva:",
        bookingDataModalInfoTimeText: "Hora de reserva:",
        bookingDataModalInfoPartySizeText: "Número de comensales:",
        bookingDataModalInfoHighChairText: "¿Se necesita trona?",

        toastBookingDataDeltingBookingError: "Error al eliminar la Reserva",

        //  -----DATOS DE PEDIDOS
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
        ordersDataInfoModalTotalProductsText: "Total de Productos:",
        ordersDataInfoModalTotalCountText: "Total:",
        buttonOrdersDataInfomodalCloseText: "Cerrar",

        buttonOrdersDataInfoCancelText: "Cancelar",

        // Footer
        copyrightText: "ReservApp. Todos los derechos reservados",

        // Mensajes Generales
        affirmationText: "Sí",
        NegationText: "No",

        // VERIFICADOR DE CAMPOS
        emailIsRequiredField: "El campo Email es obligatorio",
        emailNotValidField1: "Email no válido (falta '@')",
        emailNotValidField2: "Email no válido (falta '.')",
        emailTooShortField: "Email demasiado corto (mín. 5 caracteres)",
        emailTooLongField: "Email demasiado largo (máx. 50 caracteres)",

        passwordIsRequiredField: "El campo Contraseña es obligatorio",
        passwordTooShortField: "La contraseña es demasiado corta (mín. 9 caracteres)",
        passwordTooLongField: "Contraseña demasiado larga (máx. 30 caracteres)",

        confirmPasswordIsRequiredField: "El campo Confirmar Contraseña es obligatorio",
        doNotMatchPasswordsFields: "Las contraseñas no coinciden",

        nameIsRequiredField: "El campo Nombre es obligatorio",
        nameIsTooShortField: "Nombre demasiado corto (mín. 4 caracteres)",
        nameIsTooLongField: "Nombre demasiado largo (máx. 30 caracteres)",

        addressIsRequiredField: "El campo Dirección es obligatorio",
        addressTooShortField: "Dirección demasiado corta (mín. 6 caracteres)",
        addressTooLongField: "Dirección demasiado larga (máx. 60 caracteres)",

        bookingDateIsRequiredField: "Debes elegir una Fecha de Reserva",
        bookingTimeIsRequiredField: "El campo Hora es obligatorio",
        bookingCustomersIsRequiredField: "El campo Comensales es obligatorio",
        bookingTableIsRequiredField: "Debes elegir una Mesa",

        profileNameNotEmptyField: "El campo Nombre no debe estar vacío",
        profileEmailNotEmptyField: "El Email no debe estar vacío",
        profileAddressNotEmptyField: "La Dirección no debe estar vacía",

        //  DATOS DE TARJETAS CTA
        cardDataMenuTitle: "Consulta nuestro Menú",
        cardDataMenuDescription: "Explora nuestra selección completa de platos y bebidas.",
        cardDataMenuButtonText: "Ver Menú",

        cardDataLoginTitle: "Bienvenido de Nuevo",
        cardDataLoginDescription: "Inicia sesión para gestionar tus pedidos y reservas.",
        cardDataLoginButtonText: "Iniciar Sesión",

        cardDataBookingTitle: "Reserva tu Mesa",
        cardDataBookingDescription: "Elige tu fecha, hora y te guardaremos tu sitio.",
        cardDataBookingButtonText: "Reservar Ahora",

        cardDataOrdersTitle: "¿Hambre? Nosotros te Ayudamos",
        cardDataOrdersDescription: "Disfruta de nuestros mejores platos desde la comodidad de tu hogar.",
        cardDataOrdersButtonText: "Pedir Ahora",

        // DATOS DE PRODUCTOS
        productCokeName: "Coca-Cola",
        productCokeDescription: "Botella de Coca-Cola servida con cubitos de hielo y una rodaja de lima.",

        productOrangeFantaName: "Fanta Naranja",
        productOrangeFantaDescription:
            "Botella de Fanta Naranja servida con cubitos de hielo y una rodaja de naranja.",

        productMineralWaterName: "Agua Mineral",
        productMineralWaterDescription: "Botella de Agua Mineral servida con cubitos de hielo.",

        productSparklingWaterName: "Agua con Gas",
        productSparklingWaterDescription:
            "Botella de Agua con Gas servida con cubitos de hielo y una rodaja de lima.",

        productBeerName: "Cerveza Fuller's",
        productBeerDescription: "Media Pinta de nuestra Ale Premium (Fuller's).",

        productOrangeJuiceName: "Zumo de Naranja Natural",
        productOrangeJuiceDescription: "Un vaso de zumo de naranja recién exprimido",

        productLemonFantaName: "Fanta Limón",
        productLemonFantaDescription:
            "Botella de Fanta Limón servida con cubitos de hielo y una rodaja de limón.",

        productRedWineName: "Copa de Vino Tinto",
        productRedWineDescription: "Nuestro Vino Tinto de la Casa.",

        productWhiteWineName: "Copa de Vino Blanco",
        productWhiteWineDescription: "Nuestro Vino Blanco de la Casa",

        productCoffeeName: "Café Espresso",
        productCoffeDescription: "Nuestro Café Espresso elaborado con los mejores granos de café arábica.",

        productToastName: "Tostada con Tomate",
        productDescription: "Pan tostado con tomate, ajo y nuestro mejor aceite de oliva español.",

        productCheeseName: "Tabla de Quesos",
        productCheeseDescription: "Nuestra mejor selección de quesos nacionales con acompañamientos.",

        productCroquettesName: "Croquetas de Jamón",
        productCroquettesDescription: "Las mejores Croquetas de Jamón caseras que hemos hecho nunca.",

        productIberianHamName: "Jamón Ibérico",
        productIberianHamDescription: "100g de nuestro mejor Jamón Ibérico 5J, cortado a mano.",

        productBravasName: "Patatas Bravas",
        productBravasDescription: "Nuestras patatas seleccionadas y la mejor salsa brava del mundo.",

        productMixedSaladName: "Ensalada Tradicional",
        productMixedSaladDescription:
            "Un bol de lechuga, tomate, cebolla y aceitunas. Se puede servir con aliño.",

        productClassicBurgerName: "Hamburguesa de Ternera",
        productClassicBurgerDescription:
            "La Hamburguesa de Ternera número uno con nuestro mejor queso Cheddar, tomate y lechuga.",

        productPorkSteakSirloinName: "Solomillo Ibérico",
        productPorkSteakSirloinDescription:
            "Un Solomillo de cerdo a la parrilla servido con nuestra mejor salsa de menta.",

        productRisottoName: "Risotto de Boletus",
        productRisottoDescription:
            "El risotto más cremoso que hemos hecho nunca servido con láminas de boletus.",

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
            "Nuestro mejor Pollo Asado servido con nuestra salsa artesanal de limón/pimienta.",

        productCarbonaraName: "Espaguetis a la Carbonara",
        productCarbonaraDescription:
            "Pasta fresca de espaguetis elaborada con nuestra tradicional Salsa Carbonara.",

        productPaellaName: "Paella de Mariscos",
        productPaellaDescription: "Una Paella tradicional española servida con una variedad de mariscos",

        productCalamariName: "Calamares Fritos",
        productCalamariDescription: "Aros de calamar rebozados, servidos con un borde de limón.",

        productSoupName: "Sopa de Jamón Ibérico",
        productSoupDescription: "Nuestra Sopa casera servida con un Huevo Cocido y Jamón Ibérico.",

        productMusselsMariniereName: "Mejillones a la Marinera",
        productMusselsMarinièreDescription: "Mejillones cocinados en nuestra salsa marinera casera fresca.",

        productPizzaName: "Pizza Margarita",
        productPizzaDescription: "Nuestra base de Pizza casera con tomate, mozzarella fresca y albahaca.",

        productLasagnaName: "Lasaña Boloñesa",
        productLasagnaDescription: "Nuestra Lasaña casera elaborada con salsa boloñesa y bechamel.",

        productSalmonName: "Salmón a la Parrilla",
        productSalmonDescription:
            "Un filete de Salmón fresco a la parrilla a la perfección y servido con nuestra cremosa crema de calabaza.",

        productEntrecoteBeefName: "Entrecot de Ternera",
        productentrecoteBeefDescription: "Entrecot de Ternera a la Parrilla y Salado",

        productFrenchFriesName: "Guarnición de Patatas Fritas",
        productFrenchFriesDescription: "Una guarnición salada de nuestras mejores Patatas Fritas",

        productGarlicBreadName: "Pan de Ajo",
        productGarlicBreadDescription: "Rebanadas de nuestro crujiente pan de ajo con mantequilla.",

        productEggFlanName: "Flan de Huevo",
        productEggFlanDescription:
            "Flan casero servido con nuestro caramelo líquido artesanal y la clásica galleta Napolitana.",

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
            "Nuestro Brownie artesanal perfectamente horneado con helado artesanal de vainilla.",

        // DISEÑO ADMIN
        // - - - ELEMENTOS DEL DASHBOARD - - -
        dashboardTotalUsersDescriptionLabel: "Usuarios",
        dashboardConnectedUsersDescriptionLabel: "Usuarios Conectados",

        dashboardTotalBookingsDescriptionLabel: "Reservas",
        dashboardPendingBookingsDescriptionLabel: "Reservas (Hoy)",
        dashboardDelayedBookingsDescriptionLabel: "Reservas Retrasadas",

        dashboardTotalOrdersDescriptionLabel: "Pedidos",
        dashboardCompletedOrdersDescriptionLabel: "Pedidos Completados",
        dashboardPendingOrdersDescriptionLabel: "Pedidos Pendientes",
        dashboardCancelledOrdersDescriptionLabel: "Pedidos Cancelados",
        dashboardSuccesfulAverageOrdersDescriptionLabel: "Tasa de Éxito de Pedidos",

        dashboardTotalProductsDescriptionLabel: "Productos",

        // - - - DATOS DEL ASIDE - - -
        asideUsersTitleLink: "Usuarios",
        asideSeeUsersLabelLink: "Ver Usuarios",

        asideProductsTitleLink: "Productos",
        asideSeeProductsLabelLink: "Ver Productos",
        asideAddProductsLabelLink: "Añadir Producto",

        asideBookingsTitleLink: "Reservas",
        asideSeeBookings: "Ver Reservas",

        asideOrdersTitleLink: "Pedidos",
        asideSeeOrdersLabelLink: "Ver Pedidos",

        // - - - ELEMENTO BENTO GRID ADMIN - - -
        bentoGridUserRoleText: "Rol:",

        //  - - - ADMIN USERS PAGE
        h1AdminUserPage: "Usuarios",

        adminUserPageLabelTextName: "Filtrar usuarios por nombre",
        adminUserPagePlaceholderTextName: "Buscar usuarios...",

        adminUserPageDefaultStatusFilter: "Filtrar por estado",
        adminUserPageActiveStatusFilter: "Activo",
        adminUserPageInactiveStatusFilter: "Inactivo",

        adminUserPageUserRoleText: "Rol:",

        //  - - - ADMIN USER DETAILS
        adminUserDetailNotSubjectFieldText: "Por favor ingrese un asunto.",
        adminUserDetailNotMessageFieldText: "Por favor ingrese un mensaje.",

        adminUserDetailMailModalTitle: "Enviar correo a -",
        adminUserDetailMailModalSubjectText: "Asunto",
        adminUserDetailMailModalSubjectPlaceholder: "Escriba un asunto...",
        adminUserDetailMailModalMessageText: "Mensaje",
        adminUserDetailMailModalMessagePlaceholder: "Escriba un mensaje...",
        adminUserDetailMailModalSendButton: "Enviar",
        adminUserDetailMailButtonText: "Enviar correo",

        adminUserDetailConfirmModalTitle: "Confirmación de llamada",
        adminUserDetailConfirmModalText: "Llamar",
        adminUserDetailConfirmModalButtonText: "Llamar al usuario",

        adminUserDetailDeleteModalTitle: "Eliminar usuario",
        adminUserDetailDeleteModalText: "¿Está seguro que desea eliminar",
        adminUserDetailDeleteModalDeleteButton: "Eliminar usuario",
        loadingAdminUserDetailDeleteModalDeleteButton: "Eliminando usuario...",

        adminUserDetailBookingsCountText: "Total de reservas:",
        adminUserDetailOrdersCountText: "Total de reservas:",

        adminUserDetailDeleteButtonText: "Eliminar usuario",
        adminUserDetailCancelButton: "Cancelar",
        toastAdminUserDetailsRemoveUserError: "Error al eliminar usuario",

        // - - - ADMIN BOOKINGS PAGE
        h1AdminBookingsPage: "RESERVAS",

        adminBookingsAllLinkText: "Todas las reservas",
        adminBookingsTodaysLinkText: "Hoy",
        adminBookingsSelectDateText: "Seleccionar fecha",

        // - - - ADMIN BOOKINGS TODAY SECTION
        h5AdminBookingsTodaySection: "Reservas para ",
        adminBookingsTodaySectionPendingTitle: "Reservas pendientes",
        adminBookingsTodaySectionLateArrivalsTitle: "Llegadas tarde",
        adminBookingsTodaySectionNotPendingBookingsText: "No hay reservas pendientes",

        // - - - ADMIN BOOKING CARD
        adminBookingCardCustomersText: "Comensales: ",
        adminBookingCardBookedByText: "Reservado por: ",

        // - - - ADMIN BOOKING DETAIL
        adminBookingDetailSuccessCancelToast: "Reserva cancelada correctamente ✔",
        adminBookingDetailErrorCancelToast: "Error al cancelar la reserva",

        adminBookingDetailCancelModaltitleText: "Cancelar reserva",
        adminBookingDetailCancelModalMessageText: "¿Estás seguro de que deseas cancelar la reserva de ",
        adminBookingDetailCancelConfirmButtonText: "Cancelar reserva",
        loadingAdminBookingDetailCancelConfirmButtonText: "Cancelando...",
        adminBookingDetailCancelCancelButtonText: "Volver",

        adminBookingDetailBookedOnText: "Reservado el: ",
        adminBookingDetailAdditinoalMessageText: "Mensaje adicional:",
        adminBookingDetailExtrasText: "Extras:",
        adminBookingDetailHighChairExtraText: "Trona",
        adminBookingDetailStatusText: "Estado: ",

        adminBookingDetailCompletedStatusText: "Completada",
        adminBookingDetailPendingStatusText: "Pendiente",
        adminBookingDetailCancelledStatusText: "Cancelada",
        adminBookingDetailCancelBookingButtonText: "Cancelar reserva",
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
        logoutButton: "Déconnexion",
        loadingTextLogoutButton: "Déconnexion...",
        loginButton: "Se Connecter",
        registerButton: "S'inscrire",

        toastErrorLogout: "Échec de la déconnexion",

        profilePageButton: "Profil",

        // PAGE DE CONNEXION
        h1LoginPage: "Se Connecter",

        toastLoginError: "Échec de la connexion",
        loadingLoginButtonText: "Connexion...",

        // PAGE D'INSCRIPTION
        h1RegisterPage: "Rejoignez-Nous",

        registerButtonText: "S'inscrire",
        loadingRegisterButtonText: "Inscription...",

        namePlaceholderFieldText: "Entrez votre nom",
        emailPlaceholderFieldText: "Entrez votre email",
        addressPlaceholderFieldText: "Adresse de livraison",
        passwordPlaceholderFieldText: "Entrez votre mot de passe",
        confirmPasswordPlaceholderFieldText: "Confirmez votre mot de passe",

        toastRegisterError: "Échec de l'inscription",

        // PAGE D'ACCUEIL
        toastWelcomeRegister: "Bienvenue",
        toastLoginSuccess: "Connexion réussie ✔",
        toastLogoutSuccess: "Déconnexion réussie ✔",

        h1HomePage: "ReservApp",

        // PAGE MENU
        fetchMessageError: "Erreur de chargement des produits. Réessayez.",
        allCategoriesFilter: "Toutes les Catégories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Actualisation des Produits...",
        textRefreshProductsButton: "Actualiser",
        clearFilterButton: "Effacer le Filtre",

        // PAGE DE RÉSERVATION
        h1BookingPage: "RÉSERVATION",

        confirmBookingTitle: "Vérifier et Confirmer",
        userNameConfirmText: "Nom de la Réservation",
        dateConfirmText: "Date",
        timeConfirmText: "Heure",
        customersConfirmText: "Convives",
        highChairConfirmText: "Chaise Haute?",
        aditionalMessageConfirmText: "Message Supplémentaire",
        confirmButtonModal: "Confirmer",
        loadingTextConfirmButtonModal: "Réservation...",

        bookingTimeText: "Heure",
        bookingTimePlaceholder: "Sélectionner l'Heure",
        bookingCustomersText: "Convives",
        bookingCustomersPlaceholder: "Sélectionner le Nombre",

        bookingHighChairTitle: "Ajouter une Chaise Haute",
        bookingHighChairDescription: "Gratuit",

        bookingAditionalMessagePlaceholder: "Des demandes particulières?",

        bookingMaxCapacityTableTitle: "Capacité Max.:",
        bookingTableTypeTitle: "Type de Table:",

        squareTableForm: "Table Carrée",
        roundTableForm: "Table Ronde",
        rectangularTableForm: "Table Rectangulaire",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Sélectionner la Table",

        bookingButtonConfirmText: "Réserver",
        bookingButtonResetForm: "Réinitialiser le Formulaire",

        toastBookingSuccess: "Réservation Effectuée",
        toastBookingUnavailable: "Réservation Échouée: Cette table est déjà réservée.",
        toastBookingError: "Réservation Échouée. Réessayez",

        // PAGE DES COMMANDES
        h1OrdersPage: "LIVRAISON À DOMICILE",
        smallOrdersPageSubtitle: "Profitez de notre menu dans le confort de votre foyer.",

        ordersPageInputPlaceholder: "Rechercher des Produits...",

        addProductToCartButton: "Ajouter au Panier",
        removeProductToCartButton: "Retirer du Panier",
        loadingTextAddingProductsToCartButton: "Ajout...",
        loadingTextRemovingProductsFromCartButton: "Suppression...",
        addOneMoreProductToCartButton: "Ajouter un",
        removeOneMoreProductFromCartButton: "Retirer un",

        toastAddedProductToCart: "Ajouté ✔",
        toastQuantityProductUpdatedToCart: "Panier mis à jour avec succès ✔",
        toastRemovedProductFromCart: "Article retiré du panier ✔",
        toastErrorAddingProductToCart: "Erreur: Impossible d'ajouter au panier",
        toastErrorQuantityProductUpdatedToCart: "Erreur: Échec de mise à jour de la quantité",
        toastErrorRemovingProductFromCart: "Erreur: Impossible de retirer l'article du panier",

        // PAGE DU PANIER
        h1CartPage: "VOTRE PANIER",
        confirmModalCartTitle: "Confirmation de la Commande",
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
        toastCartRemovedError: "Échec de suppression de tous les articles",

        buttonCartPageOpenPaymentModal: "Commander",
        buttonCartPageDeleteCart: "Vider le Panier",

        // PAGE DE PROFIL
        h1ProfilePage: "Bienvenue, ",
        userDataSectionTitle: "Informations Personnelles",
        bookingsDataSectionTitle: "Vos Réservations",
        ordersDataSectionTitle: "Vos Commandes",

        buttonChangeAvatar: "Changer l'Avatar",

        //  ----- DONNÉES UTILISATEUR
        nameFieldText: "Nom",
        fullNameFieldText: "Nom Complet",
        emailFieldText: "Email",
        addressFieldText: "Adresse",
        passwordFieldText: "Mot de Passe",
        confirmPasswordFieldText: "Confirmer le Mot de Passe",
        userDataModalTitle: "Confirmer la Modification des Données",
        userDataModalMessage: "Confirmer le changement: ",
        userDataModalMessageNexo: "à",
        userDataModalConfirmText: "Modifier",
        loadingUserDataModalConfirmText: "Modification...",
        userDataModalCancelText: "Annuler",

        userDataEditButtonText: "Modifier",
        userDataChangeButtonText: "Changer",

        toastUserDataChangeSuccess: "Profil mis à jour avec succès ✔",
        toastUserDataChangeError: "Erreur de mise à jour du profil",

        //  ------ DONNÉES DE RÉSERVATIONS
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

        bookingDataModalInfotitle: "Détails de la réservation",
        bookingDataModalInfoMessageText1: "Supprimer votre Réservation pour ",
        bookingDataModalInfoMessageCustomer1: "Convive",
        bookingDataModalInfoMessageCustomer2: "Convives",

        bookingDataModalInfoDateText: "Date de réservation:",
        bookingDataModalInfoTimeText: "Heure de réservation:",
        bookingDataModalInfoPartySizeText: "Nombre de convives:",
        bookingDataModalInfoHighChairText: "Chaise haute nécessaire?",

        toastBookingDataDeltingBookingError: "Erreur de suppression de la Réservation",

        //  -----DONNÉES DES COMMANDES
        ordersDataTitle1: "Commandes en Attente",
        ordersDataTitle2: "Commandes Terminées",

        ordersDataInfoModalMessage: "Voulez-vous annuler la commande de ",

        toastOrdersDataSuccess: "Commande annulée avec succès ✔",
        toastOrdersDataError: "Erreur d'annulation de la commande.",

        ordersDataNotPendingOrdersText: "Il n'y a pas de commandes en attente.",
        ordersDataNotOrders: "Il n'y a pas de commandes.",

        ordersDataCancelModalTitle: "Annuler la Commande",
        ordersDataCancelModalBackButton: "Retour",
        loadingOrdersDataCancelButton: "Annulation...",

        ordersDataInfoModalTitle: "Détails de la Commande",
        ordersDataInfoModalcreationText: "Date de Création:",
        ordersDataInfoModalProductText: "Produit:",
        ordersDataInfoModalPriceText: "Prix:",
        ordersDataInfoModalTotalProductsText: "Total de Produits:",
        ordersDataInfoModalTotalCountText: "Total:",
        buttonOrdersDataInfomodalCloseText: "Fermer",

        buttonOrdersDataInfoCancelText: "Annuler",

        // Footer
        copyrightText: "ReservApp. Tous droits réservés",

        // Messages Généraux
        affirmationText: "Oui",
        NegationText: "Non",

        // VÉRIFICATEUR DE CHAMPS
        emailIsRequiredField: "Le champ Email est obligatoire",
        emailNotValidField1: "Email non valide ('@' manquant)",
        emailNotValidField2: "Email non valide ('.' manquant)",
        emailTooShortField: "Email trop court (min. 5 caractères)",
        emailTooLongField: "Email trop long (max. 50 caractères)",

        passwordIsRequiredField: "Le champ Mot de Passe est obligatoire",
        passwordTooShortField: "Le mot de passe est trop court (min. 9 caractères)",
        passwordTooLongField: "Mot de passe trop long (max. 30 caractères)",

        confirmPasswordIsRequiredField: "Le champ Confirmer le Mot de Passe est obligatoire",
        doNotMatchPasswordsFields: "Les mots de passe ne correspondent pas",

        nameIsRequiredField: "Le champ Nom est obligatoire",
        nameIsTooShortField: "Nom trop court (min. 4 caractères)",
        nameIsTooLongField: "Nom trop long (max. 30 caractères)",

        addressIsRequiredField: "Le champ Adresse est obligatoire",
        addressTooShortField: "Adresse trop courte (min. 6 caractères)",
        addressTooLongField: "Adresse trop longue (max. 60 caractères)",

        bookingDateIsRequiredField: "Vous devez choisir une Date de Réservation",
        bookingTimeIsRequiredField: "Le champ Heure est obligatoire",
        bookingCustomersIsRequiredField: "Le champ Convives est obligatoire",
        bookingTableIsRequiredField: "Vous devez choisir une Table",

        profileNameNotEmptyField: "Le champ Nom ne doit pas être vide",
        profileEmailNotEmptyField: "L'Email ne doit pas être vide",
        profileAddressNotEmptyField: "L'Adresse ne doit pas être vide",

        //  DONNÉES DES CARTES CTA
        cardDataMenuTitle: "Consultez notre Menu",
        cardDataMenuDescription: "Parcourez notre sélection complète de plats et boissons.",
        cardDataMenuButtonText: "Voir le Menu",

        cardDataLoginTitle: "Bon Retour",
        cardDataLoginDescription: "Connectez-vous pour gérer vos commandes et réservations.",
        cardDataLoginButtonText: "Se Connecter",

        cardDataBookingTitle: "Réservez votre Table",
        cardDataBookingDescription: "Choisissez votre date, heure et nous vous gardons votre place.",
        cardDataBookingButtonText: "Réserver Maintenant",

        cardDataOrdersTitle: "Faim? On s'occupe de Vous",
        cardDataOrdersDescription: "Profitez de nos meilleurs plats dans le confort de chez vous.",
        cardDataOrdersButtonText: "Commander Maintenant",

        // DONNÉES DES PRODUITS
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

        productCoffeeName: "Café Espresso",
        productCoffeDescription: "Notre Café Espresso préparé avec les meilleurs grains de café arabica.",

        productToastName: "Tartine à la Tomate",
        productDescription: "Pain grillé avec tomate, ail et notre meilleure huile d'olive espagnole.",

        productCheeseName: "Plateau de Fromages",
        productCheeseDescription: "Notre meilleure sélection de fromages nationaux avec accompagnements.",

        productCroquettesName: "Croquettes de Jambon",
        productCroquettesDescription:
            "Les meilleures Croquettes de Jambon maison que nous ayons jamais faites.",

        productIberianHamName: "Jambon Ibérique",
        productIberianHamDescription: "100g de notre meilleur Jambon Ibérique 5J, tranché à la main.",

        productBravasName: "Pommes de Terre Bravas",
        productBravasDescription: "Nos pommes de terre sélectionnées et la meilleure sauce brava du monde.",

        productMixedSaladName: "Salade Traditionnelle",
        productMixedSaladDescription:
            "Un bol de laitue, tomate, oignon et olives. Peut être servie avec vinaigrette.",

        productClassicBurgerName: "Burger de Bœuf",
        productClassicBurgerDescription:
            "Le Burger de Bœuf numéro un avec notre meilleur fromage Cheddar, tomate et laitue.",

        productPorkSteakSirloinName: "Filet de Porc Ibérique",
        productPorkSteakSirloinDescription:
            "Un Filet de porc grillé servi avec notre meilleure sauce à la menthe.",

        productRisottoName: "Risotto aux Cèpes",
        productRisottoDescription:
            "Le risotto le plus crémeux que nous ayons jamais fait servi avec des tranches de cèpes.",

        productVeggieBurgerName: "Burger Végétarien",
        productVeggieBurgerDescription:
            "Un steak végétal juteux à base de betterave, protéine de pois, carotte et pomme, servi dans un pain brioché moelleux avec oignon rouge et laitue croquante.",

        productSteakTartareName: "Steak Tartare",
        productSteakTartareDescription: "Steak Tartare servi avec jaune d'œuf et fumé au bois de chocolat.",

        productTakosName: "Tacos au Poulet",
        productTakosDescription: "Tacos au poulet mariné servis avec sauce épicée et pico de gallo frais.",

        productRoastChickenName: "Poulet Rôti",
        productRoastChickenDescription:
            "Notre meilleur Poulet Rôti servi avec notre sauce artisanale citron/poivre.",

        productCarbonaraName: "Spaghetti à la Carbonara",
        productCarbonaraDescription:
            "Pâtes fraîches spaghetti préparées avec notre Sauce Carbonara traditionnelle.",

        productPaellaName: "Paella aux Fruits de Mer",
        productPaellaDescription:
            "Une Paella traditionnelle espagnole servie avec une variété de fruits de mer",

        productCalamariName: "Calamars Frits",
        productCalamariDescription: "Anneaux de calamars panés, servis avec un quartier de citron.",

        productSoupName: "Soupe au Jambon Ibérique",
        productSoupDescription: "Notre Soupe maison servie avec un Œuf Dur et du Jambon Ibérique.",

        productMusselsMariniereName: "Moules Marinière",
        productMusselsMarinièreDescription: "Moules cuisinées dans notre sauce marinière maison fraîche.",

        productPizzaName: "Pizza Margherita",
        productPizzaDescription: "Notre pâte à Pizza maison avec tomate, mozzarella fraîche et basilic.",

        productLasagnaName: "Lasagne Bolognaise",
        productLasagnaDescription: "Notre Lasagne maison préparée avec sauce bolognaise et béchamel.",

        productSalmonName: "Saumon Grillé",
        productSalmonDescription:
            "Un filet de Saumon frais grillé à la perfection et servi avec notre velouté de potiron crémeux.",

        productEntrecoteBeefName: "Entrecôte de Bœuf",
        productentrecoteBeefDescription: "Entrecôte de Bœuf grillée et salée",

        productFrenchFriesName: "Accompagnement de Frites",
        productFrenchFriesDescription: "Un accompagnement salé de nos meilleures Frites",

        productGarlicBreadName: "Pain à l'Ail",
        productGarlicBreadDescription: "Tranches de notre pain à l'ail beurré et croustillant.",

        productEggFlanName: "Flan aux Œufs",
        productEggFlanDescription:
            "Flan maison servi avec notre caramel liquide artisanal et le classique biscuit Napolitain.",

        productCremaCatalanaName: "Crème Catalane",
        productCremaCatalanaDescription:
            "Notre dessert traditionnel espagnol servi avec du sucre caramélisé.",

        productPannaCottaName: "Panna Cotta",
        productPannaCottaDescription: "Panna cotta maison servie avec coulis de fruits rouges.",

        productCheesecakeName: "Cheesecake",
        productCheesecakeDescription: "Notre Cheesecake crémeux maison servi avec confiture de myrtilles",

        productBrownieName: "Brownie au Chocolat",
        productBrownieDescription:
            "Notre Brownie artisanal parfaitement cuit avec glace artisanale à la vanille.",

        // LAYOUT ADMIN
        // - - - ÉLÉMENTS DU TABLEAU DE BORD - - -
        dashboardTotalUsersDescriptionLabel: "Utilisateurs",
        dashboardConnectedUsersDescriptionLabel: "Utilisateurs Connectés",

        dashboardTotalBookingsDescriptionLabel: "Réservations",
        dashboardPendingBookingsDescriptionLabel: "Réservations (Aujourd'hui)",
        dashboardDelayedBookingsDescriptionLabel: "Réservations en Retard",

        dashboardTotalOrdersDescriptionLabel: "Commandes",
        dashboardCompletedOrdersDescriptionLabel: "Commandes Terminées",
        dashboardPendingOrdersDescriptionLabel: "Commandes en Attente",
        dashboardCancelledOrdersDescriptionLabel: "Commandes Annulées",
        dashboardSuccesfulAverageOrdersDescriptionLabel: "Taux de Réussite des Commandes",

        dashboardTotalProductsDescriptionLabel: "Produits",

        // - - - DONNÉES DE LA BARRE LATÉRALE - - -
        asideUsersTitleLink: "Utilisateurs",
        asideSeeUsersLabelLink: "Voir les Utilisateurs",

        asideProductsTitleLink: "Produits",
        asideSeeProductsLabelLink: "Voir les Produits",
        asideAddProductsLabelLink: "Ajouter un Produit",

        asideBookingsTitleLink: "Réservations",
        asideSeeBookings: "Voir les Réservations",

        asideOrdersTitleLink: "Commandes",
        asideSeeOrdersLabelLink: "Voir les Commandes",

        // - - - ÉLÉMENT BENTO GRID ADMIN - - -
        bentoGridUserRoleText: "Rôle:",

        //  - - - ADMIN USERS PAGE
        h1AdminUserPage: "Utilisateurs",

        adminUserPageLabelTextName: "Filtrer les utilisateurs par nom",
        adminUserPagePlaceholderTextName: "Rechercher des utilisateurs...",

        adminUserPageDefaultStatusFilter: "Filtrer par statut",
        adminUserPageActiveStatusFilter: "Actif",
        adminUserPageInactiveStatusFilter: "Inactif",

        adminUserPageUserRoleText: "Rôle:",

        //  - - - ADMIN USER DETAILS
        adminUserDetailNotSubjectFieldText: "Veuillez saisir un objet.",
        adminUserDetailNotMessageFieldText: "Veuillez saisir un message.",

        adminUserDetailMailModalTitle: "Envoyer un email à -",
        adminUserDetailMailModalSubjectText: "Objet",
        adminUserDetailMailModalSubjectPlaceholder: "Écrire un objet...",
        adminUserDetailMailModalMessageText: "Message",
        adminUserDetailMailModalMessagePlaceholder: "Écrire un message...",
        adminUserDetailMailModalSendButton: "Envoyer",
        adminUserDetailMailButtonText: "Envoyer l'email",

        adminUserDetailConfirmModalTitle: "Confirmation d'appel",
        adminUserDetailConfirmModalText: "Appeler",
        adminUserDetailConfirmModalButtonText: "Appeler l'utilisateur",

        adminUserDetailDeleteModalTitle: "Supprimer l'utilisateur",
        adminUserDetailDeleteModalText: "Êtes-vous sûr de vouloir supprimer",
        adminUserDetailDeleteModalDeleteButton: "Supprimer l'utilisateur",
        loadingAdminUserDetailDeleteModalDeleteButton: "Suppression de l'utilisateur...",

        adminUserDetailBookingsCountText: "Total des réservations :",
        adminUserDetailOrdersCountText: "Total des réservations :",

        adminUserDetailDeleteButtonText: "Supprimer l'utilisateur",
        adminUserDetailCancelButton: "Annuler",
        toastAdminUserDetailsRemoveUserError: "Erreur lors de la suppression de l'utilisateur",

        // - - - ADMIN BOOKINGS PAGE
        h1AdminBookingsPage: "RÉSERVATIONS",

        adminBookingsAllLinkText: "Toutes les réservations",
        adminBookingsTodaysLinkText: "Aujourd'hui",
        adminBookingsSelectDateText: "Sélectionner une date",

        // - - - ADMIN BOOKINGS TODAY SECTION
        h5AdminBookingsTodaySection: "Réservations pour ",
        adminBookingsTodaySectionPendingTitle: "Réservations en attente",
        adminBookingsTodaySectionLateArrivalsTitle: "Arrivées tardives",
        adminBookingsTodaySectionNotPendingBookingsText: "Il n'y a pas de réservations en attente",

        // - - - ADMIN BOOKING CARD
        adminBookingCardCustomersText: "Convives : ",
        adminBookingCardBookedByText: "Réservé par : ",

        // - - - ADMIN BOOKING DETAIL
        adminBookingDetailSuccessCancelToast: "Réservation annulée avec succès ✔",
        adminBookingDetailErrorCancelToast: "Échec de l'annulation de la réservation",

        adminBookingDetailCancelModaltitleText: "Annuler la réservation",
        adminBookingDetailCancelModalMessageText: "Êtes-vous sûr de vouloir annuler la réservation de ",
        adminBookingDetailCancelConfirmButtonText: "Annuler la réservation",
        loadingAdminBookingDetailCancelConfirmButtonText: "Annulation en cours...",
        adminBookingDetailCancelCancelButtonText: "Retour",

        adminBookingDetailBookedOnText: "Réservé le : ",
        adminBookingDetailAdditinoalMessageText: "Message supplémentaire :",
        adminBookingDetailExtrasText: "Extras :",
        adminBookingDetailHighChairExtraText: "Chaise haute",
        adminBookingDetailStatusText: "Statut : ",

        adminBookingDetailCompletedStatusText: "Terminée",
        adminBookingDetailPendingStatusText: "En attente",
        adminBookingDetailCancelledStatusText: "Annulée",
        adminBookingDetailCancelBookingButtonText: "Annuler la réservation",
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

        // PAGINA DI LOGIN
        h1LoginPage: "Accedi",

        toastLoginError: "Accesso fallito",
        loadingLoginButtonText: "Accesso...",

        // PAGINA DI REGISTRAZIONE
        h1RegisterPage: "Unisciti a Noi",

        registerButtonText: "Iscriviti",
        loadingRegisterButtonText: "Iscrizione...",

        namePlaceholderFieldText: "Inserisci il tuo nome",
        emailPlaceholderFieldText: "Inserisci la tua email",
        addressPlaceholderFieldText: "Indirizzo di consegna",
        passwordPlaceholderFieldText: "Inserisci la tua password",
        confirmPasswordPlaceholderFieldText: "Conferma la tua password",

        toastRegisterError: "Registrazione fallita",

        // PAGINA HOME
        toastWelcomeRegister: "Benvenuto",
        toastLoginSuccess: "Accesso effettuato con successo ✔",
        toastLogoutSuccess: "Disconnessione effettuata con successo ✔",

        h1HomePage: "ReservApp",

        // PAGINA MENU
        fetchMessageError: "Errore nel caricamento dei Prodotti. Riprova.",
        allCategoriesFilter: "Tutte le Categorie",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Aggiornamento Prodotti...",
        textRefreshProductsButton: "Aggiorna",
        clearFilterButton: "Cancella Filtro",

        // PAGINA PRENOTAZIONI
        h1BookingPage: "PRENOTAZIONE",

        confirmBookingTitle: "Verifica e Conferma",
        userNameConfirmText: "Nome della Prenotazione",
        dateConfirmText: "Data",
        timeConfirmText: "Ora",
        customersConfirmText: "Commensali",
        highChairConfirmText: "Seggiolone?",
        aditionalMessageConfirmText: "Messaggio Aggiuntivo",
        confirmButtonModal: "Conferma",
        loadingTextConfirmButtonModal: "Prenotazione...",

        bookingTimeText: "Ora",
        bookingTimePlaceholder: "Seleziona l'Ora",
        bookingCustomersText: "Commensali",
        bookingCustomersPlaceholder: "Seleziona il Numero",

        bookingHighChairTitle: "Aggiungi Seggiolone",
        bookingHighChairDescription: "Gratuito",

        bookingAditionalMessagePlaceholder: "Richieste particolari?",

        bookingMaxCapacityTableTitle: "Capacità Max.:",
        bookingTableTypeTitle: "Tipo di Tavolo:",

        squareTableForm: "Tavolo Quadrato",
        roundTableForm: "Tavolo Rotondo",
        rectangularTableForm: "Tavolo Rettangolare",

        bookingTableWifiText: "Wifi:",

        bookingSelectTableButton: "Seleziona Tavolo",

        bookingButtonConfirmText: "Prenota",
        bookingButtonResetForm: "Ripristina Modulo",

        toastBookingSuccess: "Prenotazione Completata",
        toastBookingUnavailable: "Prenotazione Fallita: Questo tavolo è già prenotato.",
        toastBookingError: "Prenotazione Fallita. Riprova",

        // PAGINA ORDINI
        h1OrdersPage: "CONSEGNA A DOMICILIO",
        smallOrdersPageSubtitle: "Goditi il nostro menu comodamente da casa tua.",

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

        // PAGINA CARRELLO
        h1CartPage: "IL TUO CARRELLO",
        confirmModalCartTitle: "Conferma dell'Ordine",
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

        // PAGINA PROFILO
        h1ProfilePage: "Benvenuto/a, ",
        userDataSectionTitle: "Informazioni Personali",
        bookingsDataSectionTitle: "Le Tue Prenotazioni",
        ordersDataSectionTitle: "I Tuoi Ordini",

        buttonChangeAvatar: "Cambia Avatar",

        //  ----- DATI UTENTE
        nameFieldText: "Nome",
        fullNameFieldText: "Nome Completo",
        emailFieldText: "Email",
        addressFieldText: "Indirizzo",
        passwordFieldText: "Password",
        confirmPasswordFieldText: "Conferma Password",
        userDataModalTitle: "Conferma Modifica Dati",
        userDataModalMessage: "Conferma modifica: ",
        userDataModalMessageNexo: "a",
        userDataModalConfirmText: "Modifica",
        loadingUserDataModalConfirmText: "Modifica...",
        userDataModalCancelText: "Annulla",

        userDataEditButtonText: "Modifica",
        userDataChangeButtonText: "Cambia",

        toastUserDataChangeSuccess: "Profilo aggiornato con successo ✔",
        toastUserDataChangeError: "Errore nell'aggiornamento del profilo",

        //  ------ DATI PRENOTAZIONI
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

        bookingDataModalInfotitle: "Dettagli della prenotazione",
        bookingDataModalInfoMessageText1: "Eliminare la tua Prenotazione per ",
        bookingDataModalInfoMessageCustomer1: "Commensale",
        bookingDataModalInfoMessageCustomer2: "Commensali",

        bookingDataModalInfoDateText: "Data di prenotazione:",
        bookingDataModalInfoTimeText: "Ora di prenotazione:",
        bookingDataModalInfoPartySizeText: "Numero di commensali:",
        bookingDataModalInfoHighChairText: "Seggiolone necessario?",

        toastBookingDataDeltingBookingError: "Errore nell'eliminazione della Prenotazione",

        //  -----DATI ORDINI
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

        // VERIFICATORE DI CAMPI
        emailIsRequiredField: "Il campo Email è obbligatorio",
        emailNotValidField1: "Email non valida ('@' mancante)",
        emailNotValidField2: "Email non valida ('.' mancante)",
        emailTooShortField: "Email troppo corta (min. 5 caratteri)",
        emailTooLongField: "Email troppo lunga (max. 50 caratteri)",

        passwordIsRequiredField: "Il campo Password è obbligatorio",
        passwordTooShortField: "La password è troppo corta (min. 9 caratteri)",
        passwordTooLongField: "Password troppo lunga (max. 30 caratteri)",

        confirmPasswordIsRequiredField: "Il campo Conferma Password è obbligatorio",
        doNotMatchPasswordsFields: "Le password non corrispondono",

        nameIsRequiredField: "Il campo Nome è obbligatorio",
        nameIsTooShortField: "Nome troppo corto (min. 4 caratteri)",
        nameIsTooLongField: "Nome troppo lungo (max. 30 caratteri)",

        addressIsRequiredField: "Il campo Indirizzo è obbligatorio",
        addressTooShortField: "Indirizzo troppo corto (min. 6 caratteri)",
        addressTooLongField: "Indirizzo troppo lungo (max. 60 caratteri)",

        bookingDateIsRequiredField: "Devi scegliere una Data di Prenotazione",
        bookingTimeIsRequiredField: "Il campo Ora è obbligatorio",
        bookingCustomersIsRequiredField: "Il campo Commensali è obbligatorio",
        bookingTableIsRequiredField: "Devi scegliere un Tavolo",

        profileNameNotEmptyField: "Il campo Nome non deve essere vuoto",
        profileEmailNotEmptyField: "L'Email non deve essere vuota",
        profileAddressNotEmptyField: "L'Indirizzo non deve essere vuoto",

        //  DATI DELLE SCHEDE CTA
        cardDataMenuTitle: "Consulta il nostro Menu",
        cardDataMenuDescription: "Sfoglia la nostra selezione completa di piatti e bevande.",
        cardDataMenuButtonText: "Vedi Menu",

        cardDataLoginTitle: "Bentornato",
        cardDataLoginDescription: "Accedi per gestire i tuoi ordini e prenotazioni.",
        cardDataLoginButtonText: "Accedi",

        cardDataBookingTitle: "Prenota il tuo Tavolo",
        cardDataBookingDescription: "Scegli la tua data, ora e ti riserviamo il posto.",
        cardDataBookingButtonText: "Prenota Ora",

        cardDataOrdersTitle: "Fame? Ci Pensiamo Noi",
        cardDataOrdersDescription: "Goditi i nostri migliori piatti comodamente da casa tua.",
        cardDataOrdersButtonText: "Ordina Ora",

        // DATI PRODOTTI
        productCokeName: "Coca-Cola",
        productCokeDescription: "Bottiglia di Coca-Cola servita con cubetti di ghiaccio e una fetta di lime.",

        productOrangeFantaName: "Fanta all'Arancia",
        productOrangeFantaDescription:
            "Bottiglia di Fanta all'Arancia servita con cubetti di ghiaccio e una fetta di arancia.",

        productMineralWaterName: "Acqua Minerale",
        productMineralWaterDescription: "Bottiglia di Acqua Minerale servita con cubetti di ghiaccio.",

        productSparklingWaterName: "Acqua Frizzante",
        productSparklingWaterDescription:
            "Bottiglia di Acqua Frizzante servita con cubetti di ghiaccio e una fetta di lime.",

        productBeerName: "Birra Fuller's",
        productBeerDescription: "Mezza pinta della nostra Ale Premium (Fuller's).",

        productOrangeJuiceName: "Spremuta d'Arancia Fresca",
        productOrangeJuiceDescription: "Un bicchiere di spremuta d'arancia fresca",

        productLemonFantaName: "Fanta al Limone",
        productLemonFantaDescription:
            "Bottiglia di Fanta al Limone servita con cubetti di ghiaccio e una fetta di limone.",

        productRedWineName: "Bicchiere di Vino Rosso",
        productRedWineDescription: "Il nostro Vino Rosso della Casa.",

        productWhiteWineName: "Bicchiere di Vino Bianco",
        productWhiteWineDescription: "Il nostro Vino Bianco della Casa",

        productCoffeeName: "Caffè Espresso",
        productCoffeDescription:
            "Il nostro Caffè Espresso preparato con i migliori chicchi di caffè arabica.",

        productToastName: "Bruschetta al Pomodoro",
        productDescription: "Pane tostato con pomodoro, aglio e il nostro miglior olio d'oliva spagnolo.",

        productCheeseName: "Tagliere di Formaggi",
        productCheeseDescription: "La nostra migliore selezione di formaggi nazionali con accompagnamenti.",

        productCroquettesName: "Crocchette di Prosciutto",
        productCroquettesDescription:
            "Le migliori Crocchette di Prosciutto fatte in casa che abbiamo mai preparato.",

        productIberianHamName: "Prosciutto Iberico",
        productIberianHamDescription: "100g del nostro miglior Prosciutto Iberico 5J, tagliato a mano.",

        productBravasName: "Patatas Bravas",
        productBravasDescription: "Le nostre patate selezionate e la migliore salsa brava del mondo.",

        productMixedSaladName: "Insalata Tradizionale",
        productMixedSaladDescription:
            "Una ciotola di lattuga, pomodoro, cipolla e olive. Può essere servita con condimento.",

        productClassicBurgerName: "Hamburger di Manzo",
        productClassicBurgerDescription:
            "L'Hamburger di Manzo numero uno con il nostro miglior formaggio Cheddar, pomodoro e lattuga.",

        productPorkSteakSirloinName: "Filetto di Maiale Iberico",
        productPorkSteakSirloinDescription:
            "Un Filetto di maiale alla griglia servito con la nostra migliore salsa alla menta.",

        productRisottoName: "Risotto ai Funghi Porcini",
        productRisottoDescription:
            "Il risotto più cremoso che abbiamo mai fatto servito con fette di porcini.",

        productVeggieBurgerName: "Hamburger Vegetariano",
        productVeggieBurgerDescription:
            "Un succoso hamburger vegetale a base di barbabietola, proteine di piselli, carota e mela, servito in un soffice panino brioche con cipolla rossa e lattuga croccante.",

        productSteakTartareName: "Tartare di Manzo",
        productSteakTartareDescription:
            "Tartare di Manzo servita con tuorlo d'uovo e affumicata con legno di cioccolato.",

        productTakosName: "Tacos di Pollo",
        productTakosDescription: "Tacos di pollo marinato serviti con salsa piccante e pico de gallo fresco.",

        productRoastChickenName: "Pollo Arrosto",
        productRoastChickenDescription:
            "Il nostro miglior Pollo Arrosto servito con la nostra salsa artigianale al limone/pepe.",

        productCarbonaraName: "Spaghetti alla Carbonara",
        productCarbonaraDescription:
            "Pasta fresca di spaghetti preparata con la nostra tradizionale Salsa Carbonara.",

        productPaellaName: "Paella ai Frutti di Mare",
        productPaellaDescription:
            "Una Paella tradizionale spagnola servita con una varietà di frutti di mare",

        productCalamariName: "Calamari Fritti",
        productCalamariDescription: "Anelli di calamari impanati, serviti con uno spicchio di limone.",

        productSoupName: "Zuppa al Prosciutto Iberico",
        productSoupDescription:
            "La nostra Zuppa fatta in casa servita con un Uovo Sodo e Prosciutto Iberico.",

        productMusselsMariniereName: "Cozze alla Marinara",
        productMusselsMarinièreDescription:
            "Cozze cucinate nella nostra fresca salsa marinara fatta in casa.",

        productPizzaName: "Pizza Margherita",
        productPizzaDescription:
            "La nostra base Pizza fatta in casa con pomodoro, mozzarella fresca e basilico.",

        productLasagnaName: "Lasagne alla Bolognese",
        productLasagnaDescription:
            "Le nostre Lasagne fatte in casa preparate con ragù bolognese e besciamella.",

        productSalmonName: "Salmone alla Griglia",
        productSalmonDescription:
            "Un filetto di Salmone fresco grigliato alla perfezione e servito con la nostra cremosa vellutata di zucca.",

        productEntrecoteBeefName: "Entrecôte di Manzo",
        productentrecoteBeefDescription: "Entrecôte di Manzo grigliata e salata",

        productFrenchFriesName: "Contorno di Patatine Fritte",
        productFrenchFriesDescription: "Un contorno salato delle nostre migliori Patatine Fritte",

        productGarlicBreadName: "Pane all'Aglio",
        productGarlicBreadDescription: "Fette del nostro croccante pane all'aglio imburrato.",

        productEggFlanName: "Flan all'Uovo",
        productEggFlanDescription:
            "Flan fatto in casa servito con il nostro caramello liquido artigianale e il classico biscotto Napolitano.",

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
            "Il nostro Brownie artigianale perfettamente cotto con gelato artigianale alla vaniglia.",

        // LAYOUT ADMIN
        // - - - ELEMENTI DELLA DASHBOARD - - -
        dashboardTotalUsersDescriptionLabel: "Utenti",
        dashboardConnectedUsersDescriptionLabel: "Utenti Online",

        dashboardTotalBookingsDescriptionLabel: "Prenotazioni",
        dashboardPendingBookingsDescriptionLabel: "Prenotazioni (Oggi)",
        dashboardDelayedBookingsDescriptionLabel: "Prenotazioni in Ritardo",

        dashboardTotalOrdersDescriptionLabel: "Ordini",
        dashboardCompletedOrdersDescriptionLabel: "Ordini Completati",
        dashboardPendingOrdersDescriptionLabel: "Ordini in Attesa",
        dashboardCancelledOrdersDescriptionLabel: "Ordini Annullati",
        dashboardSuccesfulAverageOrdersDescriptionLabel: "Tasso di Successo degli Ordini",

        dashboardTotalProductsDescriptionLabel: "Prodotti",

        // - - - DATI DELLA BARRA LATERALE - - -
        asideUsersTitleLink: "Utenti",
        asideSeeUsersLabelLink: "Vedi Utenti",

        asideProductsTitleLink: "Prodotti",
        asideSeeProductsLabelLink: "Vedi Prodotti",
        asideAddProductsLabelLink: "Aggiungi Prodotto",

        asideBookingsTitleLink: "Prenotazioni",
        asideSeeBookings: "Vedi Prenotazioni",

        asideOrdersTitleLink: "Ordini",
        asideSeeOrdersLabelLink: "Vedi Ordini",

        // - - - ELEMENTO BENTO GRID ADMIN - - -
        bentoGridUserRoleText: "Ruolo:",

        //  - - - ADMIN USERS PAGE
        h1AdminUserPage: "Utenti",

        adminUserPageLabelTextName: "Filtra gli utenti per nome",
        adminUserPagePlaceholderTextName: "Cerca utenti...",

        adminUserPageDefaultStatusFilter: "Filtra per stato",
        adminUserPageActiveStatusFilter: "Attivo",
        adminUserPageInactiveStatusFilter: "Inattivo",

        adminUserPageUserRoleText: "Ruolo:",

        //  - - - ADMIN USER DETAILS
        adminUserDetailNotSubjectFieldText: "Inserisci un oggetto.",
        adminUserDetailNotMessageFieldText: "Inserisci un messaggio.",

        adminUserDetailMailModalTitle: "Invia email a -",
        adminUserDetailMailModalSubjectText: "Oggetto",
        adminUserDetailMailModalSubjectPlaceholder: "Scrivi un oggetto...",
        adminUserDetailMailModalMessageText: "Messaggio",
        adminUserDetailMailModalMessagePlaceholder: "Scrivi un messaggio...",
        adminUserDetailMailModalSendButton: "Invia",
        adminUserDetailMailButtonText: "Invia email",

        adminUserDetailConfirmModalTitle: "Conferma chiamata",
        adminUserDetailConfirmModalText: "Chiama",
        adminUserDetailConfirmModalButtonText: "Chiama utente",

        adminUserDetailDeleteModalTitle: "Elimina utente",
        adminUserDetailDeleteModalText: "Sei sicuro di voler eliminare",
        adminUserDetailDeleteModalDeleteButton: "Elimina utente",
        loadingAdminUserDetailDeleteModalDeleteButton: "Eliminazione utente...",

        adminUserDetailBookingsCountText: "Totale prenotazioni:",
        adminUserDetailOrdersCountText: "Totale prenotazioni:",

        adminUserDetailDeleteButtonText: "Elimina utente",
        adminUserDetailCancelButton: "Annulla",
        toastAdminUserDetailsRemoveUserError: "Errore durante l'eliminazione dell'utente",

        // - - - ADMIN BOOKINGS PAGE
        h1AdminBookingsPage: "PRENOTAZIONI",

        adminBookingsAllLinkText: "Tutte le prenotazioni",
        adminBookingsTodaysLinkText: "Oggi",
        adminBookingsSelectDateText: "Seleziona data",

        // - - - ADMIN BOOKINGS TODAY SECTION
        h5AdminBookingsTodaySection: "Prenotazioni per ",
        adminBookingsTodaySectionPendingTitle: "Prenotazioni in sospeso",
        adminBookingsTodaySectionLateArrivalsTitle: "Arrivi in ritardo",
        adminBookingsTodaySectionNotPendingBookingsText: "Non ci sono prenotazioni in sospeso",

        // - - - ADMIN BOOKING CARD
        adminBookingCardCustomersText: "Ospiti: ",
        adminBookingCardBookedByText: "Prenotato da: ",

        // - - - ADMIN BOOKING DETAIL
        adminBookingDetailSuccessCancelToast: "Prenotazione annullata con successo ✔",
        adminBookingDetailErrorCancelToast: "Impossibile annullare la prenotazione",

        adminBookingDetailCancelModaltitleText: "Annulla prenotazione",
        adminBookingDetailCancelModalMessageText: "Sei sicuro di voler annullare la prenotazione di ",
        adminBookingDetailCancelConfirmButtonText: "Annulla prenotazione",
        loadingAdminBookingDetailCancelConfirmButtonText: "Annullamento in corso...",
        adminBookingDetailCancelCancelButtonText: "Torna indietro",

        adminBookingDetailBookedOnText: "Prenotato il: ",
        adminBookingDetailAdditinoalMessageText: "Messaggio aggiuntivo:",
        adminBookingDetailExtrasText: "Extra:",
        adminBookingDetailHighChairExtraText: "Seggiolone",
        adminBookingDetailStatusText: "Stato: ",

        adminBookingDetailCompletedStatusText: "Completata",
        adminBookingDetailPendingStatusText: "In sospeso",
        adminBookingDetailCancelledStatusText: "Annullata",
        adminBookingDetailCancelBookingButtonText: "Annulla prenotazione",
    },

    de: {
        // BARRA DE NAVIGATION
        userReplaceName: "Benutzer",
        toastLogoutError: "Abmeldung fehlgeschlagen.",

        bookingPageNavLabel: "BUCHUNGEN",
        ordersPageNavLabel: "BESTELLUNGEN",
        menusPageNavLabel: "MENÜ",
        cartPageNavLabel: "WAGEN",

        lodingTextLogoutUser: "Profil wird geschlossen...",
        logoutButton: "Abmelden",
        loadingTextLogoutButton: "Melde ab...",
        loginButton: "Anmelden",
        registerButton: "Registrieren",

        toastErrorLogout: "Abmeldung fehlgeschlagen",

        profilePageButton: "Profil",

        // LOGIN PAGE
        h1LoginPage: "Anmelden",

        toastLoginError: "Anmeldung fehlgeschlagen",
        loadingLoginButtonText: "Melde an...",

        // REGISTER PAGE
        h1RegisterPage: "Registrieren",

        registerButtonText: "Jetzt anmelden",
        loadingRegisterButtonText: "Registriere...",

        namePlaceholderFieldText: "Geben Sie Ihren Namen ein",
        emailPlaceholderFieldText: "Geben Sie Ihre E-Mail ein",
        addressPlaceholderFieldText: "Lieferadresse",
        passwordPlaceholderFieldText: "Geben Sie Ihr Passwort ein",
        confirmPasswordPlaceholderFieldText: "Passwort erneut eingeben",

        toastRegisterError: "Registrierung fehlgeschlagen",

        // HOME PAGE
        toastWelcomeRegister: "Willkommen",
        toastLoginSuccess: "Erfolgreich angemeldet ✔",
        toastLogoutSuccess: "Erfolgreich abgemeldet ✔",

        h1HomePage: "ReservApp",

        // MENUPAGE
        fetchMessageError: "Fehler beim Laden der Produkte. Bitte erneut versuchen.",
        allCategoriesFilter: "Alle Kategorien",
        h1MenuPage: "MENÜ",

        loadingTextRefreshProductsButton: "Produkte werden aktualisiert...",
        textRefreshProductsButton: "Aktualisieren",
        clearFilterButton: "Filter löschen",

        // BOOKING PAGE
        h1BookingPage: "BUCHUNG",

        confirmBookingTitle: "Überprüfen und Bestätigen",
        userNameConfirmText: "Reservierungsname",
        dateConfirmText: "Datum",
        timeConfirmText: "Uhrzeit",
        customersConfirmText: "Gäste",
        highChairConfirmText: "Hochstuhl?",
        aditionalMessageConfirmText: "Zusätzliche Nachricht",
        confirmButtonModal: "Bestätigen",
        loadingTextConfirmButtonModal: "Buche...",

        bookingTimeText: "Uhrzeit",
        bookingTimePlaceholder: "Uhrzeit auswählen",
        bookingCustomersText: "Gäste",
        bookingCustomersPlaceholder: "Gäste auswählen",

        bookingHighChairTitle: "Hochstuhl hinzufügen",
        bookingHighChairDescription: "Kostenfrei",

        bookingAditionalMessagePlaceholder: "Sonderwünsche?",

        bookingMaxCapacityTableTitle: "Max. Kapazität:",
        bookingTableTypeTitle: "Tischart:",

        squareTableForm: "Quadratischer Tisch",
        roundTableForm: "Runder Tisch",
        rectangularTableForm: "Rechteckiger Tisch",

        bookingTableWifiText: "WLAN:",

        bookingSelectTableButton: "Tisch auswählen",

        bookingButtonConfirmText: "Buchen",
        bookingButtonResetForm: "Formular zurücksetzen",

        toastBookingSuccess: "Reservierung abgeschlossen",
        toastBookingUnavailable: "Buchung fehlgeschlagen: Dieser Tisch ist bereits reserviert.",
        toastBookingError: "Buchung fehlgeschlagen. Bitte erneut versuchen.",

        // ORDERS PAGE
        h1OrdersPage: "LIEFERUNG",
        smallOrdersPageSubtitle: "Genießen Sie unser Menü bequem von zu Hause.",

        ordersPageInputPlaceholder: "Produkte suchen...",

        addProductToCartButton: "In den Warenkorb",
        removeProductToCartButton: "Aus dem Warenkorb entfernen",
        loadingTextAddingProductsToCartButton: "Wird hinzugefügt...",
        loadingTextRemovingProductsFromCartButton: "Wird entfernt...",
        addOneMoreProductToCartButton: "Hinzugefügt",
        removeOneMoreProductFromCartButton: "Entfernen",

        toastAddedProductToCart: "Hinzugefügt ✔",
        toastQuantityProductUpdatedToCart: "Warenkorb erfolgreich aktualisiert ✔",
        toastRemovedProductFromCart: "Artikel aus dem Warenkorb entfernt ✔",
        toastErrorAddingProductToCart: "Fehler: konnte nicht in den Warenkorb gelegt werden",
        toastErrorQuantityProductUpdatedToCart: "Fehler: Mengenaktualisierung fehlgeschlagen",
        toastErrorRemovingProductFromCart: "Fehler: konnte Artikel nicht entfernen",

        // CART PAGE
        h1CartPage: "IHR WARENKORB",
        confirmModalCartTitle: "Bestätigung der Bestellung",
        confirmModalCartMessage: "Sie sind fast fertig! Bestätigen Sie Ihre Bestellung, um fortzufahren",

        confirmButtonCartModal: "Bestätigen",
        loadingConfirmButtonCartModal: "Verarbeite...",
        cancelButtonCartModal: "Zurück",

        accordionQtyText: "Menge:",
        accordionDescriptionText: "Beschreibung:",
        accordionPriceText: "Preis:",

        noProductsTitle: "Ihr Warenkorb ist leer",
        goToOrdersCartButton: "Jetzt bestellen",

        toastCartRemovedSuccess: "Warenkorb geleert ✔",
        toastCartRemovedError: "Fehler beim Entfernen aller Artikel",

        buttonCartPageOpenPaymentModal: "Bestellen",
        buttonCartPageDeleteCart: "Warenkorb löschen",

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
        userDataModalTitle: "Änderung bestätigen",
        userDataModalMessage: "Änderung bestätigen: ",
        userDataModalMessageNexo: "zu",
        userDataModalConfirmText: "Ändern",
        loadingUserDataModalConfirmText: "Ändere...",
        userDataModalCancelText: "Abbrechen",

        userDataEditButtonText: "Bearbeiten",
        userDataChangeButtonText: "Ändern",

        toastUserDataChangeSuccess: "Profil erfolgreich aktualisiert ✔",
        toastUserDataChangeError: "Fehler bei der Profilaktualisierung",

        //  ------ BOOKING DATA
        bookingDataTitle1: "Ihre nächsten Reservierungen",
        bookingDataTitle2: "Ihre vergangenen Besuche",
        bookingDataNoPendingBookingsFound: "Sie haben keine anstehenden Reservierungen.",
        bookingDataNoPastVisitsFound: "Sie haben keine vergangenen Besuche.",

        buttonBookingDataMakeABook: "Jetzt reservieren",
        buttonBookingDataCloseModalInfo: "Schließen",
        buttonBookingDataCancelReservation: "Reservierung stornieren",

        bookingDataModalDeletingTitle: "Reservierung löschen",
        bookingDataModalDeletingbutton: "Löschen",
        loadingBookingDataModalDeletingbutton: "Lösche...",

        bookingDataModalInfotitle: "Reservierungsdetails",
        bookingDataModalInfoMessageText1: "Löschen Sie Ihre Reservierung für ",
        bookingDataModalInfoMessageCustomer1: "Gast",
        bookingDataModalInfoMessageCustomer2: "Gäste",

        bookingDataModalInfoDateText: "Reservierungsdatum:",
        bookingDataModalInfoTimeText: "Reservierungszeit:",
        bookingDataModalInfoPartySizeText: "Gruppengröße:",
        bookingDataModalInfoHighChairText: "Hochstuhl benötigt?",

        toastBookingDataDeltingBookingError: "Fehler beim Löschen der Reservierung",

        //  -----ORDERS DATA
        ordersDataTitle1: "Ausstehende Bestellungen",
        ordersDataTitle2: "Abgeschlossene Bestellungen",

        ordersDataInfoModalMessage: "Möchten Sie die Bestellung von ",
        toastOrdersDataSuccess: "Bestellung erfolgreich storniert ✔",
        toastOrdersDataError: "Fehler beim Stornieren der Bestellung.",

        ordersDataNotPendingOrdersText: "Keine ausstehenden Bestellungen.",
        ordersDataNotOrders: "Keine Bestellungen.",

        ordersDataCancelModalTitle: "Bestellung stornieren",
        ordersDataCancelModalBackButton: "Zurück",
        loadingOrdersDataCancelButton: "Storniere...",

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

        // Mensajes Generales
        affirmationText: "Ja",
        NegationText: "Nein",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "E-Mail-Feld ist erforderlich",
        emailNotValidField1: "E-Mail nicht gültig (‘@’ fehlt)",
        emailNotValidField2: "E-Mail nicht gültig (‘.’ fehlt)",
        emailTooShortField: "E-Mail zu kurz (mind. 5 Zeichen)",
        emailTooLongField: "E-Mail zu lang (max. 50 Zeichen)",

        passwordIsRequiredField: "Passwortfeld ist erforderlich",
        passwordTooShortField: "Passwort zu kurz (mind. 9 Zeichen)",
        passwordTooLongField: "Passwort zu lang (max. 30 Zeichen)",

        confirmPasswordIsRequiredField: "Bestätigungs-Passwortfeld ist erforderlich",
        doNotMatchPasswordsFields: "Passwörter stimmen nicht überein",

        nameIsRequiredField: "Namensfeld ist erforderlich",
        nameIsTooShortField: "Name zu kurz (mind. 4 Zeichen)",
        nameIsTooLongField: "Name zu lang (max. 30 Zeichen)",

        addressIsRequiredField: "Adressfeld ist erforderlich",
        addressTooShortField: "Adresse zu kurz (mind. 6 Zeichen)",
        addressTooLongField: "Adresse zu lang (max. 60 Zeichen)",

        bookingDateIsRequiredField: "Sie müssen ein Buchungsdatum wählen",
        bookingTimeIsRequiredField: "Zeitfeld ist erforderlich",
        bookingCustomersIsRequiredField: "Gästezahlfeld ist erforderlich",
        bookingTableIsRequiredField: "Sie müssen einen Tisch wählen",

        profileNameNotEmptyField: "Namensfeld darf nicht leer sein",
        profileEmailNotEmptyField: "E-Mail darf nicht leer sein",
        profileAddressNotEmptyField: "Adresse darf nicht leer sein",

        // CTA CARDS DATA
        cardDataMenuTitle: "Entdecken Sie unser Menü",
        cardDataMenuDescription: "Durchstöbern Sie unsere vollständige Auswahl an Gerichten und Getränken.",
        cardDataMenuButtonText: "Menü ansehen",

        cardDataLoginTitle: "Willkommen zurück",
        cardDataLoginDescription: "Melden Sie sich an, um Ihre Bestellungen und Reservierungen zu verwalten.",
        cardDataLoginButtonText: "Anmelden",

        cardDataBookingTitle: "Reservieren Sie Ihren Tisch",
        cardDataBookingDescription: "Wählen Sie Ihr Datum, Ihre Uhrzeit – wir reservieren Ihren Platz.",
        cardDataBookingButtonText: "Jetzt reservieren",

        cardDataOrdersTitle: "Hungrig? Wir sind für Sie da",
        cardDataOrdersDescription: "Genießen Sie unsere besten Gerichte bequem bei Ihnen zu Hause.",
        cardDataOrdersButtonText: "Jetzt bestellen",

        // PRODUCTS DATA
        productCokeName: "Coke",
        productCokeDescription: "Flasche Coke mit Eiswürfeln und einer Scheibe Limette.",

        productOrangeFantaName: "Orange Fanta",
        productOrangeFantaDescription: "Flasche Orange Fanta mit Eiswürfeln und einer Scheibe Orange.",

        productMineralWaterName: "Mineralwasser",
        productMineralWaterDescription: "Flasche Mineralwasser mit Eiswürfeln.",

        productSparklingWaterName: "Sprudelwasser",
        productSparklingWaterDescription: "Flasche Sprudelwasser mit Eiswürfeln und einer Scheibe Limette.",

        productBeerName: "Fuller’s Bier",
        productBeerDescription: "Halbe Pint unseres Premium Ales (Fuller’s).",

        productOrangeJuiceName: "Frisch gepresster Orangensaft",
        productOrangeJuiceDescription: "Ein Glas frisch gepresster Orangensaft.",

        productLemonFantaName: "Lemon Fanta",
        productLemonFantaDescription: "Flasche Lemon Fanta mit Eiswürfeln und einer Scheibe Zitrone.",

        productRedWineName: "Haus-Rotwein",
        productRedWineDescription: "Unser Haus-Rotwein.",

        productWhiteWineName: "Haus-Weißwein",
        productWhiteWineDescription: "Unser Haus-Weißwein.",

        productCoffeeName: "Espresso",
        productCoffeDescription: "Unser Espresso aus den besten Arabica-Kaffeebohnen.",

        productToastName: "Tomaten-Toast",
        productDescription: "Geröstetes Brot mit Tomate, Knoblauch und unserem besten spanischen Olivenöl.",

        productCheeseName: "Käseplatte",
        productCheeseDescription: "Unsere beste Auswahl nationaler Käsesorten mit Beilagen.",

        productCroquettesName: "Schinken-Croquettes",
        productCroquettesDescription:
            "Die besten hausgemachten Schinken-Croquettes, die wir je gemacht haben.",

        productIberianHamName: "Iberischer Schinken",
        productIberianHamDescription: "100 g unseres feinsten 5 J-Schinkens, handgeschnitten.",

        productBravasName: "Bravas Kartoffeln",
        productBravasDescription: "Unsere handverlesenen Kartoffeln und die beste Bravas-Sauce der Welt.",

        productMixedSaladName: "Traditioneller Salat",
        productMixedSaladDescription:
            "Eine Schüssel Salat mit Eisberg, Tomate, Zwiebel und Oliven. Kann mit Dressing serviert werden.",

        productClassicBurgerName: "Rindfleisch-Burger",
        productClassicBurgerDescription:
            "Der Nummer 1 Rindfleisch-Burger mit unserem besten Cheddar, Tomate und Salat.",

        productPorkSteakSirloinName: "Iberisches Rinderfilet",
        productPorkSteakSirloinDescription: "Ein gegrilltes Rinderfilet mit unserer besten Minzsauce.",

        productRisottoName: "Boletus-Risotto",
        productRisottoDescription:
            "Das cremigste Risotto, das wir je gemacht haben, serviert mit Boletus-Scheiben.",

        productVeggieBurgerName: "Veggie-Burger",
        productVeggieBurgerDescription:
            "Ein saftiges pflanzenbasiertes Patty aus Rote Beete, Erbsenprotein, Karotte und Apfel, serviert im weichen Brioche-Brötchen mit roten Zwiebeln und knusprigem Salat.",

        productSteakTartareName: "Steak Tartare",
        productSteakTartareDescription: "Steak Tartare serviert mit Eigelb und geräuchertem Schichtholz.",

        productTakosName: "Hähnchen-Tacos",
        productTakosDescription: "Marinierte Hähnchen-Tacos mit scharfer Sauce und frischem Pico de Gallo.",

        productRoastChickenName: "Brathähnchen",
        productRoastChickenDescription:
            "Unser bestes Brathähnchen mit unserer hausgemachten Zitronen-Pfeffer-Sauce.",

        productCarbonaraName: "Spaghetti Carbonara",
        productCarbonaraDescription: "Frische Pasta mit unserer traditionellen Carbonara-Sauce.",

        productPaellaName: "Meeresfrüchte-Paella",
        productPaellaDescription: "Eine spanische traditionelle Paella mit einer Vielfalt an Meeresfrüchten",

        productCalamariName: "Gebratene Calamari",
        productCalamariDescription: "Backte Calamari-Ringe, serviert mit einer Zitronenseite.",

        productSoupName: "Iberische Schinkensuppe",
        productSoupDescription:
            "Unsere hausgemachte Suppe serviert mit einem gekochten Ei und iberischem Schinken.",

        productMusselsMariniereName: "Miesmuscheln Marinière",
        productMusselsMarinièreDescription:
            "Miesmuscheln in unserer frisch hausgemachten Marinara-Sauce gekocht.",

        productPizzaName: "Margherita Pizza",
        productPizzaDescription:
            "Unser hausgemachter Pizzaboden mit Tomate, frischem Mozzarella und Basilikum.",

        productLasagnaName: "Bolognese Lasagne",
        productLasagnaDescription: "Unsere hausgemachte Lasagne mit Bolognese-Sauce und Bechamel.",

        productSalmonName: "Gegrillter Lachs",
        productSalmonDescription:
            "Ein frisches Lachs­filet perfekt gegrillt und serviert mit unserer cremigen Kürbissuppe.",

        productEntrecoteBeefName: "Entrecôte Rind",
        productentrecoteBeefDescription: "Gegrilltes und gesalzenes Entrecôte-Rind",

        productFrenchFriesName: "Pommes Frites Beilage",
        productFrenchFriesDescription: "Eine salzige Beilage unserer besten Pommes Frites",

        productGarlicBreadName: "Knoblauchbrot",
        productGarlicBreadDescription:
            "Scheiben unseres mit Butter bestrichenen und knusprigen Knoblauchbrots.",

        productEggFlanName: "Eier­flan",
        productEggFlanDescription:
            "Hausgemachter Flan serviert mit unserem handgemachten flüssigen Karamell und dem klassischen Napolitaner-Keks.",

        productCremaCatalanaName: "Crema Catalana",
        productCremaCatalanaDescription:
            "Unser traditionelles spanisches Dessert serviert mit karamellisiertem Zucker.",

        productPannaCottaName: "Panna Cotta",
        productPannaCottaDescription: "Hausgemachte Panna Cotta serviert mit Rot­frucht­Coulis.",

        productCheesecakeName: "Käsekuchen",
        productCheesecakeDescription:
            "Unser cremiger hausgemachter Käsekuchen serviert mit Blaubeer­marmelade",

        productBrownieName: "Schokoladen-Brownie",
        productBrownieDescription: "Unser handwerklich perfekter Brownie mit hausgemachtem Vanille-Eis.",

        // ADMIN LAYOUT
        // - - - DASHBOARD ITEMS - - -
        dashboardTotalUsersDescriptionLabel: "Benutzer",
        dashboardConnectedUsersDescriptionLabel: "Benutzer online",

        dashboardTotalBookingsDescriptionLabel: "Buchungen",
        dashboardPendingBookingsDescriptionLabel: "Buchungen (Heute)",
        dashboardDelayedBookingsDescriptionLabel: "Verspätete Buchungen",

        dashboardTotalOrdersDescriptionLabel: "Bestellungen",
        dashboardCompletedOrdersDescriptionLabel: "Abgeschlossene Bestellungen",
        dashboardPendingOrdersDescriptionLabel: "Ausstehende Bestellungen",
        dashboardCancelledOrdersDescriptionLabel: "Stornierte Bestellungen",
        dashboardSuccesfulAverageOrdersDescriptionLabel: "Auftragsabschlussrate",

        dashboardTotalProductsDescriptionLabel: "Produkte",

        // - - - ASIDE DATA - - -
        asideUsersTitleLink: "Benutzer",
        asideSeeUsersLabelLink: "Benutzer ansehen",

        asideProductsTitleLink: "Produkte",
        asideSeeProductsLabelLink: "Benutzer anzeigen",
        asideAddProductsLabelLink: "Produkt hinzufügen",

        asideBookingsTitleLink: "Buchungen",
        asideSeeBookings: "Buchungen ansehen",

        asideOrdersTitleLink: "Bestellungen",
        asideSeeOrdersLabelLink: "Bestellungen ansehen",

        // - - - ADMIN BENTO GRID ITEM - -
        bentoGridUserRoleText: "Rolle:",

        //  - - - ADMIN USERS PAGE
        h1AdminUserPage: "Benutzer",

        adminUserPageLabelTextName: "Benutzer nach Name filtern",
        adminUserPagePlaceholderTextName: "Benutzer suchen...",

        adminUserPageDefaultStatusFilter: "Nach Status filtern",
        adminUserPageActiveStatusFilter: "Aktiv",
        adminUserPageInactiveStatusFilter: "Inaktiv",

        adminUserPageUserRoleText: "Rolle:",

        //  - - - ADMIN USER DETAILS
        adminUserDetailNotSubjectFieldText: "Bitte geben Sie einen Betreff ein.",
        adminUserDetailNotMessageFieldText: "Bitte geben Sie eine Nachricht ein.",

        adminUserDetailMailModalTitle: "E-Mail senden an -",
        adminUserDetailMailModalSubjectText: "Betreff",
        adminUserDetailMailModalSubjectPlaceholder: "Betreff schreiben...",
        adminUserDetailMailModalMessageText: "Nachricht",
        adminUserDetailMailModalMessagePlaceholder: "Nachricht schreiben...",
        adminUserDetailMailModalSendButton: "Senden",
        adminUserDetailMailButtonText: "E-Mail senden",

        adminUserDetailConfirmModalTitle: "Anrufbestätigung",
        adminUserDetailConfirmModalText: "Anrufen",
        adminUserDetailConfirmModalButtonText: "Benutzer anrufen",

        adminUserDetailDeleteModalTitle: "Benutzer löschen",
        adminUserDetailDeleteModalText: "Sind Sie sicher, dass Sie löschen möchten",
        adminUserDetailDeleteModalDeleteButton: "Benutzer löschen",
        loadingAdminUserDetailDeleteModalDeleteButton: "Benutzer wird gelöscht...",

        adminUserDetailBookingsCountText: "Gesamtreservierungen:",
        adminUserDetailOrdersCountText: "Gesamtreservierungen:",

        adminUserDetailDeleteButtonText: "Benutzer löschen",
        adminUserDetailCancelButton: "Abbrechen",
        toastAdminUserDetailsRemoveUserError: "Fehler beim Löschen des Benutzers",

        // - - - ADMIN BOOKINGS PAGE
        h1AdminBookingsPage: "BUCHUNGEN",

        adminBookingsAllLinkText: "Alle Buchungen",
        adminBookingsTodaysLinkText: "Heute",
        adminBookingsSelectDateText: "Datum auswählen",

        // - - - ADMIN BOOKINGS TODAY SECTION
        h5AdminBookingsTodaySection: "Buchungen für ",
        adminBookingsTodaySectionPendingTitle: "Ausstehende Buchungen",
        adminBookingsTodaySectionLateArrivalsTitle: "Verspätete Ankünfte",
        adminBookingsTodaySectionNotPendingBookingsText: "Keine ausstehenden Buchungen vorhanden",

        // - - - ADMIN BOOKING CARD
        adminBookingCardCustomersText: "Gäste: ",
        adminBookingCardBookedByText: "Gebucht von: ",

        // - - - ADMIN BOOKING DETAIL
        adminBookingDetailSuccessCancelToast: "Buchung erfolgreich storniert ✔",
        adminBookingDetailErrorCancelToast: "Fehler beim Stornieren der Buchung",

        adminBookingDetailCancelModaltitleText: "Buchung stornieren",
        adminBookingDetailCancelModalMessageText: "Sind Sie sicher, dass Sie die Buchung von ",
        adminBookingDetailCancelConfirmButtonText: "Buchung stornieren",
        loadingAdminBookingDetailCancelConfirmButtonText: "Stornierung läuft...",
        adminBookingDetailCancelCancelButtonText: "Zurück",

        adminBookingDetailBookedOnText: "Gebucht am: ",
        adminBookingDetailAdditinoalMessageText: "Zusätzliche Nachricht:",
        adminBookingDetailExtrasText: "Extras:",
        adminBookingDetailHighChairExtraText: "Kinderstuhl",
        adminBookingDetailStatusText: "Status: ",

        adminBookingDetailCompletedStatusText: "Abgeschlossen",
        adminBookingDetailPendingStatusText: "Ausstehend",
        adminBookingDetailCancelledStatusText: "Storniert",
        adminBookingDetailCancelBookingButtonText: "Buchung stornieren",
    },

    zh: {
        // BARRA DE NAVIGATION
        userReplaceName: "用户",
        toastLogoutError: "退出失败。",

        bookingPageNavLabel: "预订",
        ordersPageNavLabel: "订单",
        menusPageNavLabel: "菜单",
        cartPageNavLabel: "购物车",

        lodingTextLogoutUser: "正在关闭个人资料...",
        logoutButton: "退出",
        loadingTextLogoutButton: "正在退出...",
        loginButton: "登录",
        registerButton: "注册",

        toastErrorLogout: "退出失败",

        profilePageButton: "个人资料",

        // LOGIN PAGE
        h1LoginPage: "登录",

        toastLoginError: "登录失败",
        loadingLoginButtonText: "正在登录...",

        // REGISTER PAGE
        h1RegisterPage: "加入我们",

        registerButtonText: "注册",
        loadingRegisterButtonText: "正在注册...",

        namePlaceholderFieldText: "输入您的姓名",
        emailPlaceholderFieldText: "输入您的邮箱",
        addressPlaceholderFieldText: "送货地址",
        passwordPlaceholderFieldText: "输入您的密码",
        confirmPasswordPlaceholderFieldText: "重新输入密码",

        toastRegisterError: "注册失败",

        // HOME PAGE
        toastWelcomeRegister: "欢迎",
        toastLoginSuccess: "登录成功 ✔",
        toastLogoutSuccess: "成功退出 ✔",

        h1HomePage: "ReservApp",

        // MENUPAGE
        fetchMessageError: "加载产品时出错，请重试。",
        allCategoriesFilter: "所有类别",
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
        customersConfirmText: "客户人数",
        highChairConfirmText: "儿童高脚椅？",
        aditionalMessageConfirmText: "附加信息",
        confirmButtonModal: "确认",
        loadingTextConfirmButtonModal: "正在预订...",

        bookingTimeText: "时间",
        bookingTimePlaceholder: "选择时间",
        bookingCustomersText: "客户人数",
        bookingCustomersPlaceholder: "选择客户人数",

        bookingHighChairTitle: "添加儿童高脚椅",
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

        toastBookingSuccess: "预订完成",
        toastBookingUnavailable: "预订失败：此桌已被预订。",
        toastBookingError: "预订失败，请重试",

        // ORDERS PAGE
        h1OrdersPage: "外卖",
        smallOrdersPageSubtitle: "在家享受我们的菜单。",

        ordersPageInputPlaceholder: "搜索产品...",

        addProductToCartButton: "加入购物车",
        removeProductToCartButton: "从购物车移除",
        loadingTextAddingProductsToCartButton: "正在添加...",
        loadingTextRemovingProductsFromCartButton: "正在移除...",
        addOneMoreProductToCartButton: "再加一个",
        removeOneMoreProductFromCartButton: "移除一个",

        toastAddedProductToCart: "已添加 ✔",
        toastQuantityProductUpdatedToCart: "购物车更新成功 ✔",
        toastRemovedProductFromCart: "已从购物车移除 ✔",
        toastErrorAddingProductToCart: "错误：无法加入购物车",
        toastErrorQuantityProductUpdatedToCart: "错误：数量更新失败",
        toastErrorRemovingProductFromCart: "错误：无法移除商品",

        // CART PAGE
        h1CartPage: "您的购物车",
        confirmModalCartTitle: "订单确认",
        confirmModalCartMessage: "您快完成了！确认订单以继续",

        confirmButtonCartModal: "确认",
        loadingConfirmButtonCartModal: "处理中...",
        cancelButtonCartModal: "返回",

        accordionQtyText: "数量：",
        accordionDescriptionText: "描述：",
        accordionPriceText: "价格：",

        noProductsTitle: "您的购物车是空的",
        goToOrdersCartButton: "立即下单",

        toastCartRemovedSuccess: "购物车已清空 ✔",
        toastCartRemovedError: "无法移除所有商品",

        buttonCartPageOpenPaymentModal: "下单",
        buttonCartPageDeleteCart: "删除购物车",

        // PROFILE PAGE
        h1ProfilePage: "欢迎, ",
        userDataSectionTitle: "个人信息",
        bookingsDataSectionTitle: "您的预订",
        ordersDataSectionTitle: "您的订单",

        buttonChangeAvatar: "更改头像",

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
        toastUserDataChangeError: "更新个人资料失败",

        //  ------ BOOKING DATA
        bookingDataTitle1: "您的下次预订",
        bookingDataTitle2: "您过去的访问",
        bookingDataNoPendingBookingsFound: "您没有待处理的预订。",
        bookingDataNoPastVisitsFound: "您没有过往访问记录。",

        buttonBookingDataMakeABook: "立即预订",
        buttonBookingDataCloseModalInfo: "关闭",
        buttonBookingDataCancelReservation: "取消预订",

        bookingDataModalDeletingTitle: "删除预订",
        bookingDataModalDeletingbutton: "删除",
        loadingBookingDataModalDeletingbutton: "正在删除...",

        bookingDataModalInfotitle: "预订详情",
        bookingDataModalInfoMessageText1: "删除您的预订：",
        bookingDataModalInfoMessageCustomer1: "客户",
        bookingDataModalInfoMessageCustomer2: "客户人数",

        bookingDataModalInfoDateText: "预订日期：",
        bookingDataModalInfoTimeText: "预订时间：",
        bookingDataModalInfoPartySizeText: "人数：",
        bookingDataModalInfoHighChairText: "需要儿童高脚椅？",

        toastBookingDataDeltingBookingError: "删除预订时出错",

        //  -----ORDERS DATA
        ordersDataTitle1: "待处理订单",
        ordersDataTitle2: "已完成订单",

        ordersDataInfoModalMessage: "您想取消订单：",

        toastOrdersDataSuccess: "订单已成功取消 ✔",
        toastOrdersDataError: "取消订单时出错。",

        ordersDataNotPendingOrdersText: "没有待处理的订单。",
        ordersDataNotOrders: "没有订单。",

        ordersDataCancelModalTitle: "取消订单",
        ordersDataCancelModalBackButton: "返回",
        loadingOrdersDataCancelButton: "正在取消...",

        ordersDataInfoModalTitle: "订单详情",
        ordersDataInfoModalcreationText: "创建日期：",
        ordersDataInfoModalProductText: "产品：",
        ordersDataInfoModalPriceText: "价格：",
        ordersDataInfoModalTotalProductsText: "产品总数：",
        ordersDataInfoModalTotalCountText: "总计：",
        buttonOrdersDataInfomodalCloseText: "关闭",

        buttonOrdersDataInfoCancelText: "取消",

        // Footer
        copyrightText: "ReservApp. 版权所有",

        // Mensajes Generales
        affirmationText: "是",
        NegationText: "否",

        // FIELDS VERIFICATOR
        emailIsRequiredField: "邮箱为必填项",
        emailNotValidField1: "邮箱无效（缺少 '@'）",
        emailNotValidField2: "邮箱无效（缺少 '.'）",
        emailTooShortField: "邮箱过短（最少5个字符）",
        emailTooLongField: "邮箱过长（最多50个字符）",

        passwordIsRequiredField: "密码为必填项",
        passwordTooShortField: "密码过短（最少9个字符）",
        passwordTooLongField: "密码过长（最多30个字符）",

        confirmPasswordIsRequiredField: "确认密码为必填项",
        doNotMatchPasswordsFields: "密码不匹配",

        nameIsRequiredField: "姓名为必填项",
        nameIsTooShortField: "姓名过短（最少4个字符）",
        nameIsTooLongField: "姓名过长（最多30个字符）",

        addressIsRequiredField: "地址为必填项",
        addressTooShortField: "地址过短（最少6个字符）",
        addressTooLongField: "地址过长（最多60个字符）",

        bookingDateIsRequiredField: "必须选择预订日期",
        bookingTimeIsRequiredField: "时间为必填项",
        bookingCustomersIsRequiredField: "客户人数为必填项",
        bookingTableIsRequiredField: "必须选择桌子",

        profileNameNotEmptyField: "姓名不能为空",
        profileEmailNotEmptyField: "邮箱不能为空",
        profileAddressNotEmptyField: "地址不能为空",

        //  CTA CARDS DATA
        cardDataMenuTitle: "查看我们的菜单",
        cardDataMenuDescription: "浏览我们所有的菜肴和饮品。",
        cardDataMenuButtonText: "查看菜单",

        cardDataLoginTitle: "欢迎回来",
        cardDataLoginDescription: "登录以管理您的订单和预订。",
        cardDataLoginButtonText: "登录",

        cardDataBookingTitle: "预订您的桌子",
        cardDataBookingDescription: "选择日期和时间，我们将为您保留座位。",
        cardDataBookingButtonText: "立即预订",

        cardDataOrdersTitle: "饿了吗？我们帮您",
        cardDataOrdersDescription: "在家享用我们最美味的菜肴。",
        cardDataOrdersButtonText: "立即下单",

        // PRODUCTS DATA
        productCokeName: "可口可乐",
        productCokeDescription: "一瓶可口可乐，配冰块和一片青柠。",

        productOrangeFantaName: "橙味芬达",
        productOrangeFantaDescription: "一瓶橙味芬达，配冰块和一片橙子。",

        productMineralWaterName: "矿泉水",
        productMineralWaterDescription: "一瓶矿泉水，配冰块。",

        productSparklingWaterName: "气泡水",
        productSparklingWaterDescription: "一瓶气泡水，配冰块和一片青柠。",

        productBeerName: "富乐啤酒",
        productBeerDescription: "半品脱我们优质的啤酒（Fuller's）。",

        productOrangeJuiceName: "鲜榨橙汁",
        productOrangeJuiceDescription: "一杯新鲜榨橙汁。",

        productLemonFantaName: "柠檬芬达",
        productLemonFantaDescription: "一瓶柠檬芬达，配冰块和一片柠檬。",

        productRedWineName: "红酒杯",
        productRedWineDescription: "我们的招牌红酒。",

        productWhiteWineName: "白酒杯",
        productWhiteWineDescription: "我们的招牌白酒。",

        productCoffeeName: "浓缩咖啡",
        productCoffeDescription: "使用最优质的阿拉比卡咖啡豆制作的浓缩咖啡。",

        productToastName: "番茄吐司",
        productDescription: "烤面包配番茄、大蒜和我们最好的西班牙橄榄油。",

        productCheeseName: "奶酪拼盘",
        productCheeseDescription: "精选本土奶酪搭配配菜。",

        productCroquettesName: "火腿可乐饼",
        productCroquettesDescription: "我们制作的最佳自制火腿可乐饼。",

        productIberianHamName: "伊比利亚火腿",
        productIberianHamDescription: "100克我们精选的5J伊比利亚火腿，手工切片。",

        productBravasName: "西班牙辣薯条",
        productBravasDescription: "精选土豆，搭配世界上最好的Brava酱。",

        productMixedSaladName: "传统沙拉",
        productMixedSaladDescription: "生菜、番茄、洋葱和橄榄，可搭配沙拉酱。",

        productClassicBurgerName: "牛肉汉堡",
        productClassicBurgerDescription: "招牌牛肉汉堡，搭配切达奶酪、番茄和生菜。",

        productPorkSteakSirloinName: "伊比利亚猪里脊",
        productPorkSteakSirloinDescription: "烤猪里脊，搭配薄荷酱。",

        productRisottoName: "牛肝菌烩饭",
        productRisottoDescription: "最奶油的烩饭，搭配牛肝菌片。",

        productVeggieBurgerName: "素食汉堡",
        productVeggieBurgerDescription:
            "多汁植物饼，配甜菜、豌豆蛋白、胡萝卜和苹果，软布里欧修面包夹红洋葱和生菜。",

        productSteakTartareName: "牛肉塔塔",
        productSteakTartareDescription: "牛肉塔塔，配蛋黄并用巧克力木烟熏。",

        productTakosName: "鸡肉玉米卷",
        productTakosDescription: "腌制鸡肉玉米卷，搭配辣酱和新鲜莎莎酱。",

        productRoastChickenName: "烤鸡",
        productRoastChickenDescription: "招牌烤鸡，搭配手工柠檬胡椒酱。",

        productCarbonaraName: "卡邦尼意面",
        productCarbonaraDescription: "新鲜意面，搭配传统卡邦尼酱。",

        productPaellaName: "海鲜烩饭",
        productPaellaDescription: "西班牙传统海鲜烩饭，含多种海鲜。",

        productCalamariName: "炸鱿鱼圈",
        productCalamariDescription: "裹粉鱿鱼圈，配柠檬角。",

        productSoupName: "伊比利亚火腿汤",
        productSoupDescription: "自制汤，搭配煮蛋和伊比利亚火腿。",

        productMusselsMariniereName: "蒜香贻贝",
        productMusselsMarinièreDescription: "用自制番茄酱烹制的新鲜贻贝。",

        productPizzaName: "玛格丽塔披萨",
        productPizzaDescription: "自制披萨底，配番茄、新鲜马苏里拉奶酪和罗勒。",

        productLasagnaName: "博洛尼亚千层面",
        productLasagnaDescription: "自制千层面，配博洛尼亚酱和白酱。",

        productSalmonName: "烤三文鱼",
        productSalmonDescription: "新鲜三文鱼片，完美烤制，搭配南瓜浓汤。",

        productEntrecoteBeefName: "牛排",
        productentrecoteBeefDescription: "烤制盐味牛排。",

        productFrenchFriesName: "薯条",
        productFrenchFriesDescription: "精选美味薯条。",

        productGarlicBreadName: "蒜香面包",
        productGarlicBreadDescription: "黄油香脆蒜香面包片。",

        productEggFlanName: "鸡蛋布丁",
        productEggFlanDescription: "自制布丁，配手工焦糖和拿破仑饼干。",

        productCremaCatalanaName: "加泰罗尼亚奶油",
        productCremaCatalanaDescription: "传统西班牙甜点，配焦糖。",

        productPannaCottaName: "奶冻",
        productPannaCottaDescription: "自制奶冻，配红果酱。",

        productCheesecakeName: "芝士蛋糕",
        productCheesecakeDescription: "自制奶油芝士蛋糕，配蓝莓果酱。",

        productBrownieName: "巧克力布朗尼",
        productBrownieDescription: "手工完美烘焙布朗尼，配香草冰淇淋。",

        // ADMIN LAYOUT
        // - - - DASHBOARD ITEMS - - -
        dashboardTotalUsersDescriptionLabel: "用户",
        dashboardConnectedUsersDescriptionLabel: "在线用户",

        dashboardTotalBookingsDescriptionLabel: "预订",
        dashboardPendingBookingsDescriptionLabel: "今日预订",
        dashboardDelayedBookingsDescriptionLabel: "延迟预订",

        dashboardTotalOrdersDescriptionLabel: "订单",
        dashboardCompletedOrdersDescriptionLabel: "已完成订单",
        dashboardPendingOrdersDescriptionLabel: "已完成订单",
        dashboardCancelledOrdersDescriptionLabel: "已取消订单",
        dashboardSuccesfulAverageOrdersDescriptionLabel: "订单完成率",

        dashboardTotalProductsDescriptionLabel: "产品",

        // - - - ASIDE DATA - - -
        asideUsersTitleLink: "用户",
        asideSeeUsersLabelLink: "查看用户",

        asideProductsTitleLink: "产品",
        asideSeeProductsLabelLink: "查看用户",
        asideAddProductsLabelLink: "添加产品",

        asideBookingsTitleLink: "预订",
        asideSeeBookings: "查看预订",

        asideOrdersTitleLink: "订单",
        asideSeeOrdersLabelLink: "查看订单",

        // - - - ADMIN BENTO GRID ITEM - - -
        bentoGridUserRoleText: "角色：",

        //  - - - ADMIN USERS PAGE
        h1AdminUserPage: "用户",

        adminUserPageLabelTextName: "按姓名筛选用户",
        adminUserPagePlaceholderTextName: "搜索用户...",

        adminUserPageDefaultStatusFilter: "按状态筛选",
        adminUserPageActiveStatusFilter: "活跃",
        adminUserPageInactiveStatusFilter: "不活跃",

        adminUserPageUserRoleText: "角色：",

        //  - - - ADMIN USER DETAILS
        adminUserDetailNotSubjectFieldText: "请输入主题。",
        adminUserDetailNotMessageFieldText: "请输入消息。",

        adminUserDetailMailModalTitle: "发送邮件给 -",
        adminUserDetailMailModalSubjectText: "主题",
        adminUserDetailMailModalSubjectPlaceholder: "写一个主题...",
        adminUserDetailMailModalMessageText: "消息",
        adminUserDetailMailModalMessagePlaceholder: "写一条消息...",
        adminUserDetailMailModalSendButton: "发送",
        adminUserDetailMailButtonText: "发送邮件",

        adminUserDetailConfirmModalTitle: "呼叫确认",
        adminUserDetailConfirmModalText: "呼叫",
        adminUserDetailConfirmModalButtonText: "呼叫用户",

        adminUserDetailDeleteModalTitle: "删除用户",
        adminUserDetailDeleteModalText: "您确定要删除",
        adminUserDetailDeleteModalDeleteButton: "删除用户",
        loadingAdminUserDetailDeleteModalDeleteButton: "正在删除用户...",

        adminUserDetailBookingsCountText: "总预订数：",
        adminUserDetailOrdersCountText: "总预订数：",

        adminUserDetailDeleteButtonText: "删除用户",
        adminUserDetailCancelButton: "取消",
        toastAdminUserDetailsRemoveUserError: "删除用户时出错",

        // - - - ADMIN BOOKINGS PAGE
        h1AdminBookingsPage: "预订",

        adminBookingsAllLinkText: "所有预订",
        adminBookingsTodaysLinkText: "今天",
        adminBookingsSelectDateText: "选择日期",

        // - - - ADMIN BOOKINGS TODAY SECTION
        h5AdminBookingsTodaySection: "预订日期：",
        adminBookingsTodaySectionPendingTitle: "待处理的预订",
        adminBookingsTodaySectionLateArrivalsTitle: "迟到的客人",
        adminBookingsTodaySectionNotPendingBookingsText: "没有待处理的预订",

        // - - - ADMIN BOOKING CARD
        adminBookingCardCustomersText: "客人：",
        adminBookingCardBookedByText: "预订人：",

        // - - - ADMIN BOOKING DETAIL
        adminBookingDetailSuccessCancelToast: "预订已成功取消 ✔",
        adminBookingDetailErrorCancelToast: "取消预订失败",

        adminBookingDetailCancelModaltitleText: "取消预订",
        adminBookingDetailCancelModalMessageText: "您确定要取消以下预订：",
        adminBookingDetailCancelConfirmButtonText: "取消预订",
        loadingAdminBookingDetailCancelConfirmButtonText: "正在取消...",
        adminBookingDetailCancelCancelButtonText: "返回",

        adminBookingDetailBookedOnText: "预订日期：",
        adminBookingDetailAdditinoalMessageText: "附加留言：",
        adminBookingDetailExtrasText: "额外要求：",
        adminBookingDetailHighChairExtraText: "婴儿高脚椅",
        adminBookingDetailStatusText: "状态：",

        adminBookingDetailCompletedStatusText: "已完成",
        adminBookingDetailPendingStatusText: "待处理",
        adminBookingDetailCancelledStatusText: "已取消",
        adminBookingDetailCancelBookingButtonText: "取消预订",
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
