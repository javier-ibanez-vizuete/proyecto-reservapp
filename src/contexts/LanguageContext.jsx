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
        loginButton: "LogIn",
        registerButton: "Register",

        toastErrorLogout: "Logout failed",

        profilePageButton: "Profile",

        // HOME PAGE
        toastWelcomeRegister: "Welcome",
        toastLoginSuccess: "Logged In successfully ✔",
        toastLogoutSuccess: "Logged out Succesfully ✔",

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
        aditionalMessageConfirmText: "Aditional Message",
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

        // Footer
        copyrightText: "ReservApp. All Rights reserved",

        // Mensajes Generales
        affirmationText: "Yes",
        NegationText: "No",
    },

    es: {
        userReplaceName: "Usuario",
        toastLogoutError: "¡Ups! Algo salió mal.",
        toastLogoutSuccess: "Cierre de sesión completado",

        bookingPageNavLabel: "RESERVAS",
        ordersPageNavLabel: "PEDIDOS",
        menusPageNavLabel: "CARTA",
        cartPageNavLabel: "CARRITO",

        lodingTextLogoutUser: "Cerrando perfil...",
        logoutButton: "Cerrar sesión",
        loginButton: "Iniciar sesión",
        registerButton: "Registrarse",

        profilePageButton: "Perfil",

        toastWelcomeRegister: "Bienvenido",
        toastLoginSuccess: "Inicio de sesión exitoso",
        h1HomePage: "Página principal",

        fetchMessageError: "Error al cargar los productos. Inténtalo de nuevo.",
        allCategoriesFilter: "Todas las categorías",
        h1MenuPage: "CARTA",

        loadingTextRefreshProductsButton: "Actualizando productos...",
        textRefreshProductsButton: "Actualizar",
        clearFilterButton: "Borrar filtro",

        h1BookingPage: "RESERVA",

        confirmBookingTitle: "Revisar y confirmar",
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

        copyrightText: "ReservApp. Todos los derechos reservados",

        affirmationText: "Sí",
        NegationText: "No",
    },

    fr: {
        userReplaceName: "Utilisateur",
        toastLogoutError: "Oups ! Une erreur est survenue.",
        toastLogoutSuccess: "Déconnexion terminée",

        bookingPageNavLabel: "RÉSERVATIONS",
        ordersPageNavLabel: "COMMANDES",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "PANIER",

        lodingTextLogoutUser: "Fermeture du profil...",
        logoutButton: "Se déconnecter",
        loginButton: "Se connecter",
        registerButton: "S’inscrire",

        profilePageButton: "Profil",

        toastWelcomeRegister: "Bienvenue",
        toastLoginSuccess: "Connexion réussie",
        h1HomePage: "Page d’accueil",

        fetchMessageError: "Erreur lors du chargement des produits. Réessayez.",
        allCategoriesFilter: "Toutes les catégories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Actualisation des produits...",
        textRefreshProductsButton: "Rafraîchir",
        clearFilterButton: "Effacer le filtre",

        h1BookingPage: "RÉSERVATION",

        confirmBookingTitle: "Vérifier et confirmer",
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

        copyrightText: "ReservApp. Tous droits réservés",

        affirmationText: "Oui",
        NegationText: "Non",
    },

    it: {
        userReplaceName: "Utente",
        toastLogoutError: "Ops! Qualcosa è andato storto.",
        toastLogoutSuccess: "Disconnessione completata",

        bookingPageNavLabel: "PRENOTAZIONI",
        ordersPageNavLabel: "ORDINI",
        menusPageNavLabel: "MENÙ",
        cartPageNavLabel: "CARRELLO",

        lodingTextLogoutUser: "Chiusura profilo...",
        logoutButton: "Disconnettersi",
        loginButton: "Accedi",
        registerButton: "Registrati",

        profilePageButton: "Profilo",

        toastWelcomeRegister: "Benvenuto",
        toastLoginSuccess: "Accesso riuscito",
        h1HomePage: "Pagina iniziale",

        fetchMessageError: "Errore nel caricamento dei prodotti. Riprova.",
        allCategoriesFilter: "Tutte le categorie",
        h1MenuPage: "MENÙ",

        loadingTextRefreshProductsButton: "Aggiornamento prodotti...",
        textRefreshProductsButton: "Aggiorna",
        clearFilterButton: "Cancella filtro",

        h1BookingPage: "PRENOTAZIONE",

        confirmBookingTitle: "Rivedi e conferma",
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

        copyrightText: "ReservApp. Tutti i diritti riservati",

        affirmationText: "Sì",
        NegationText: "No",
    },

    de: {
        userReplaceName: "Benutzer",
        toastLogoutError: "Ups! Etwas ist schiefgelaufen.",
        toastLogoutSuccess: "Abmeldung abgeschlossen",

        bookingPageNavLabel: "RESERVIERUNGEN",
        ordersPageNavLabel: "BESTELLUNGEN",
        menusPageNavLabel: "SPEISEKARTE",
        cartPageNavLabel: "WARENKORB",

        lodingTextLogoutUser: "Profil wird geschlossen...",
        logoutButton: "Abmelden",
        loginButton: "Anmelden",
        registerButton: "Registrieren",

        profilePageButton: "Profil",

        toastWelcomeRegister: "Willkommen",
        toastLoginSuccess: "Login erfolgreich",
        h1HomePage: "Startseite",

        fetchMessageError: "Fehler beim Laden der Produkte. Versuchen Sie es erneut.",
        allCategoriesFilter: "Alle Kategorien",
        h1MenuPage: "SPEISEKARTE",

        loadingTextRefreshProductsButton: "Produkte werden aktualisiert...",
        textRefreshProductsButton: "Aktualisieren",
        clearFilterButton: "Filter löschen",

        h1BookingPage: "RESERVIERUNG",

        confirmBookingTitle: "Überprüfen und bestätigen",
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

        copyrightText: "ReservApp. Alle Rechte vorbehalten",

        affirmationText: "Ja",
        NegationText: "Nein",
    },

    zh: {
        userReplaceName: "用户",
        toastLogoutError: "哎呀！出现了错误。",
        toastLogoutSuccess: "退出成功",

        bookingPageNavLabel: "预订",
        ordersPageNavLabel: "订单",
        menusPageNavLabel: "菜单",
        cartPageNavLabel: "购物车",

        lodingTextLogoutUser: "正在关闭资料...",
        logoutButton: "退出",
        loginButton: "登录",
        registerButton: "注册",

        profilePageButton: "个人资料",

        toastWelcomeRegister: "欢迎",
        toastLoginSuccess: "登录成功",
        h1HomePage: "主页",

        fetchMessageError: "加载产品时出错。请重试。",
        allCategoriesFilter: "所有分类",
        h1MenuPage: "菜单",

        loadingTextRefreshProductsButton: "正在刷新产品...",
        textRefreshProductsButton: "刷新",
        clearFilterButton: "清除筛选",

        h1BookingPage: "预订",

        confirmBookingTitle: "查看并确认",
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

        copyrightText: "ReservApp. 版权所有",

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
