import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownTrigger } from "./DropdownTrigger";

/**
 * Dropdown Component - Menú desplegable con múltiples opciones
 *
 * Componente de dropdown altamente configurable que muestra menús desplegables
 * con posicionamiento inteligente, múltiples triggers y accesibilidad completa.
 * Construido con el patrón de componentes compuestos para máxima flexibilidad.
 *
 * @component
 * @example
 * // Dropdown básico con menú de usuario
 * <Dropdown>
 *   <DropdownTrigger>
 *     <Button variant="outline">
 *       <Avatar size="small" name="Usuario" />
 *       <span>Mi Cuenta</span>
 *       <ChevronDown />
 *     </Button>
 *   </DropdownTrigger>
 *   <DropdownMenu>
 *     <DropdownItem onClick={() => navigate('/profile')}>
 *       Perfil
 *     </DropdownItem>
 *     <DropdownItem onClick={() => navigate('/settings')}>
 *       Configuración
 *     </DropdownItem>
 *     <DropdownDivider />
 *     <DropdownItem onClick={handleLogout} variant="destructive">
 *       Cerrar Sesión
 *     </DropdownItem>
 *   </DropdownMenu>
 * </Dropdown>
 *
 * @example
 * // Dropdown con posicionamiento personalizado
 * <Dropdown placement="top-end" trigger="click">
 *   <DropdownTrigger>
 *     <Button variant="ghost">Opciones ⚙️</Button>
 *   </DropdownTrigger>
 *   <DropdownMenu>
 *     <DropdownItem>Exportar</DropdownItem>
 *     <DropdownItem>Importar</DropdownItem>
 *     <DropdownItem>Compartir</DropdownItem>
 *   </DropdownMenu>
 * </Dropdown>
 *
 * @example
 * // Dropdown con contenido complejo
 * <Dropdown placement="bottom-start" offset={12}>
 *   <DropdownTrigger>
 *     <Button variant="primary">
 *       Crear Nuevo
 *       <PlusIcon />
 *     </Button>
 *   </DropdownTrigger>
 *   <DropdownMenu>
 *     <DropdownItem>
 *       <div className="flex items-center space-x-2">
 *         <DocumentIcon className="w-4 h-4" />
 *         <div>
 *           <p className="font-medium">Documento</p>
 *           <p className="text-xs text-gray-500">Crear nuevo documento</p>
 *         </div>
 *       </div>
 *     </DropdownItem>
 *     <DropdownItem>
 *       <div className="flex items-center space-x-2">
 *         <FolderIcon className="w-4 h-4" />
 *         <div>
 *           <p className="font-medium">Carpeta</p>
 *           <p className="text-xs text-gray-500">Organizar archivos</p>
 *         </div>
 *       </div>
 *     </DropdownItem>
 *   </DropdownMenu>
 * </Dropdown>
 */
export const Dropdown = ({
    /**
     * Componentes hijos - debe incluir DropdownTrigger y DropdownMenu
     * @type {React.ReactNode}
     */
    children,

    /**
     * Evento que activa el dropdown
     * @type {'click' | 'hover'}
     * @default 'click'
     */
    trigger = "click",

    /**
     * Posición del menú relativo al trigger
     * @type {'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'}
     * @default 'bottom-start'
     */
    placement = "bottom-start",

    /**
     * Distancia en píxeles entre el trigger y el menú
     * @type {number}
     * @default 8
     */
    offset = 8,

    /**
     * Clases CSS adicionales para el contenedor
     * @type {string}
     * @default ''
     */
    className = "",

    /**
     * Si el dropdown está deshabilitado
     * @type {boolean}
     * @default false
     */
    disabled = false,

    /**
     * Props adicionales pasadas al contenedor
     */
    ...props
}) => {
    // Estado para controlar la visibilidad del dropdown
    const [isOpen, setIsOpen] = useState(false);

    // Referencias para los elementos DOM
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);

    /**
     * Effect para manejar eventos globales cuando el dropdown está abierto
     */
    useEffect(() => {
        /**
         * Cierra el dropdown al hacer click fuera
         */
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        /**
         * Cierra el dropdown con la tecla Escape
         */
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        /**
         * Previene el scroll cuando el dropdown está abierto (móvil)
         */
        const handleScroll = () => {
            if (window.innerWidth <= 768) {
                // Solo en móvil
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    /**
     * Alterna la visibilidad del dropdown
     */
    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    /**
     * Cierra el dropdown
     */
    const closeDropdown = () => setIsOpen(false);

    /**
     * Maneja eventos de hover para trigger hover
     */
    const handleMouseEnter = () => {
        if (trigger === "hover" && !disabled) {
            setIsOpen(true);
        }
    };

    /**
     * Maneja eventos de mouse leave para trigger hover
     */
    const handleMouseLeave = () => {
        if (trigger === "hover") {
            setIsOpen(false);
        }
    };

    /**
     * Mapeo de posiciones a clases CSS
     */
    const placementClasses = {
        "top-start": "bottom-full left-0 mb-2",
        "top-end": "bottom-full right-0 mb-2",
        "bottom-start": "top-full left-0 mt-2",
        "bottom-end": "top-full right-0 mt-2",
        "left-start": "right-full top-0 mr-2",
        "left-end": "right-full bottom-0 mr-2",
        "right-start": "left-full top-0 ml-2",
        "right-end": "left-full bottom-0 ml-2",
    };

    /**
     * Clases CSS calculadas para el contenedor
     */
    const dropdownClasses = classnames(
        // Clases base del dropdown
        "relative inline-flex text-left",

        // Estado deshabilitado
        {
            "opacity-50 cursor-not-allowed": disabled,
        },

        // Clases adicionales
        className
    );

    /**
     * Props para el contenedor dropdown
     */
    const dropdownProps = {
        ref: dropdownRef,
        className: dropdownClasses,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        role: "menu",
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        "data-dropdown": true,
        "data-open": isOpen,
        "data-placement": placement,
        "data-trigger": trigger,
        ...props,
    };

    return (
        <div {...dropdownProps}>
            {React.Children.map(children, (child) => {
                if (child.type === DropdownTrigger) {
                    return React.cloneElement(child, {
                        onClick: toggleDropdown,
                        isOpen,
                        disabled,
                        ref: triggerRef,
                    });
                }
                if (child.type === DropdownMenu) {
                    return React.cloneElement(child, {
                        isOpen,
                        onClose: closeDropdown,
                        placement: placementClasses[placement],
                    });
                }
                return child;
            })}
        </div>
    );
};

// Agregamos los sub-componentes como propiedades estáticas para facilitar el uso
Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
