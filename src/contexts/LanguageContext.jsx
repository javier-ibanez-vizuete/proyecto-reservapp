import { createContext, useState } from "react";
const TEXTS = {
    en: {
        // BARRA DE NAVEGACION
        userReplaceName: "User",
        toastLogoutError: "Ups! Something went Wrong.",
        toastLogoutSuccess: "Logout Completed",

        bookingPageNavLabel: "BOOKINGS",
        ordersPageNavLabel: "ORDERS",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "TROLLY",

        lodingTextLogoutUser: "Closing Profile...",
        logoutButton: "Logout",
        loginButton: "LogIn",
        registerButton: "Register",

        profilePageButton: "Profile",

        // HOME PAGE
        toastWelcomeRegister: "Welcome",
        toastLoginSuccess: "Login successful",
        h1HomePage: "Home Page",

        // MENUPAGE
        fetchMessageError: "Error loading Products. Try Again.",
        allCategoriesFilter: "All Categories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Refreshing Products...",
        textRefreshProductsButton: "Refresh",
        clearFilterButton: "Clear Filter",

        // Footer
        copyrightText: "ReservApp. All Rights reserved",
    },

    es: {
        // BARRA DE NAVEGACION
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

        // HOME PAGE
        toastWelcomeRegister: "Bienvenido",
        toastLoginSuccess: "Inicio de sesión exitoso",
        h1HomePage: "Página principal",

        // MENUPAGE
        fetchMessageError: "Error al cargar los productos. Inténtalo de nuevo.",
        allCategoriesFilter: "Todas las categorías",
        h1MenuPage: "CARTA",

        loadingTextRefreshProductsButton: "Actualizando productos...",
        textRefreshProductsButton: "Actualizar",
        clearFilterButton: "Borrar filtro",

        // Footer
        copyrightText: "ReservApp. Todos los derechos reservados",
    },

    fr: {
        // BARRA DE NAVEGACION
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

        // HOME PAGE
        toastWelcomeRegister: "Bienvenue",
        toastLoginSuccess: "Connexion réussie",
        h1HomePage: "Page d’accueil",

        // MENUPAGE
        fetchMessageError: "Erreur lors du chargement des produits. Réessayez.",
        allCategoriesFilter: "Toutes les catégories",
        h1MenuPage: "MENU",

        loadingTextRefreshProductsButton: "Actualisation des produits...",
        textRefreshProductsButton: "Rafraîchir",
        clearFilterButton: "Effacer le filtre",

        // Footer
        copyrightText: "ReservApp. Tous droits réservés",
    },

    it: {
        // BARRA DE NAVEGACION
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

        // HOME PAGE
        toastWelcomeRegister: "Benvenuto",
        toastLoginSuccess: "Accesso riuscito",
        h1HomePage: "Pagina iniziale",

        // MENUPAGE
        fetchMessageError: "Errore nel caricamento dei prodotti. Riprova.",
        allCategoriesFilter: "Tutte le categorie",
        h1MenuPage: "MENÙ",

        loadingTextRefreshProductsButton: "Aggiornamento prodotti...",
        textRefreshProductsButton: "Aggiorna",
        clearFilterButton: "Cancella filtro",

        // Footer
        copyrightText: "ReservApp. Tutti i diritti riservati",
    },

    de: {
        // BARRA DE NAVEGACION
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

        // HOME PAGE
        toastWelcomeRegister: "Willkommen",
        toastLoginSuccess: "Login erfolgreich",
        h1HomePage: "Startseite",

        // MENUPAGE
        fetchMessageError: "Fehler beim Laden der Produkte. Versuchen Sie es erneut.",
        allCategoriesFilter: "Alle Kategorien",
        h1MenuPage: "SPEISEKARTE",

        loadingTextRefreshProductsButton: "Produkte werden aktualisiert...",
        textRefreshProductsButton: "Aktualisieren",
        clearFilterButton: "Filter löschen",

        // Footer
        copyrightText: "ReservApp. Alle Rechte vorbehalten",
    },

    zh: {
        // BARRA DE NAVEGACION
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

        // HOME PAGE
        toastWelcomeRegister: "欢迎",
        toastLoginSuccess: "登录成功",
        h1HomePage: "主页",

        // MENUPAGE
        fetchMessageError: "加载产品时出错。请重试。",
        allCategoriesFilter: "所有分类",
        h1MenuPage: "菜单",

        loadingTextRefreshProductsButton: "正在刷新产品...",
        textRefreshProductsButton: "刷新",
        clearFilterButton: "清除筛选",

        // Footer
        copyrightText: "ReservApp. 版权所有",
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
