# Guía de instalación y configuración

Después de clonar este repositorio desde GitHub, sigue los siguientes pasos para configurar el entorno de desarrollo:

---

## 1. Instalar dependencias de desarrollo

Ejecuta el siguiente comando para instalar todas las dependencias de desarrollo necesarias:

```bash
npm install -D @eslint/js @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-unused-imports globals json-server vite
```

📌 **¿Qué hace este comando?**
Instala las herramientas de desarrollo como ESLint (para detectar errores en el código), Vite (para el servidor de desarrollo), y TypeScript (para tipado estático), entre otras.

---

## 2. Instalar dependencias de producción

Instala Axios para realizar peticiones HTTP:

```bash
npm install axios
```

📌 **¿Para qué sirve Axios?**
Axios es una librería que te permite hacer peticiones HTTP de manera sencilla a APIs. Por ejemplo, puedes obtener datos de un servidor, enviar formularios, o consumir servicios web.

**Ejemplo de uso básico:**

```javascript
const [products, setProducts] = useState([]);

// Obtener datos de una API
const fetchProducts = async () => {
    try {
        const response = await api.get("/products");
        console.log("response", response);
        console.log("Products data:", response.data);
        setProducts(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

useEffect(() => {
    fetchProducts();
}, []);
```

---

## 3. Ejecutar el servidor de desarrollo

Para iniciar el servidor de desarrollo con Vite, utiliza:

```bash
npm run dev
```

📌 **¿Qué ocurre?**
Este comando inicia un servidor local (normalmente en `http://localhost:5173`) donde podrás ver tu aplicación React en tiempo real. Cualquier cambio que hagas se reflejará automáticamente en el navegador.

---

## 4. Ejecutar JSON Server (opcional)

Si necesitas mockear una API con `json-server`, puedes arrancarlo con:

```bash
npx json-server --watch db.json --port 3000
```

📌 **¿Cuándo usar esto?**
JSON Server es útil cuando necesitas simular una API REST sin tener un backend real. Crea automáticamente endpoints basados en un archivo JSON.

**Ejemplo de archivo `db.json`:**

```json
{
    "usuarios": [
        { "id": 1, "nombre": "Juan", "email": "juan@email.com" },
        { "id": 2, "nombre": "María", "email": "maria@email.com" }
    ],
    "productos": [{ "id": 1, "nombre": "Laptop", "precio": 899 }]
}
```

Con este archivo, tendrías automáticamente disponibles las rutas:

-   `GET http://localhost:3000/usuarios` - Obtener todos los usuarios
-   `POST http://localhost:3000/usuarios` - Crear un nuevo usuario
-   `PUT http://localhost:3000/usuarios/1` - Actualizar usuario con ID 1

_(Asegúrate de que exista un archivo `db.json` en la raíz del proyecto o cámbialo por el nombre de tu archivo)._

---

**Ejemplo de servicio con Axios (`src/core/http/axios.js`):**

```javascript
import axios from "axios";

const baseURL = "https://react-students-api-eleven-code.vercel.app/api";

export const api = axios.create({
    baseURL,
    timeout: 10000, // ms milliseconds
    headers: {
        "Content-Type": "application/json", // TIPO DE CONTENIDO QUE ENVIAMOS AL SERVIDOR
        Accept: "application/json", // TIPO DE CONTENIDO QUE ACEPTAMOS DEL SERVIDOR
    },
});
```
