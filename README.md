# Vinyl Store E-Commerce (Proyecto de Práctica Profesional)

Este es un proyecto de e-commerce de vinilos totalmente funcional construido con React, desarrollado como parte de mi Práctica Profesionalizante. La aplicación simula un flujo de compra completo, desde la navegación y filtrado de productos hasta la generación de una orden de compra simulada.

**(URL del deploy en vivo que  se añadirá en el Sprint 15)**

---

## 🚀 Características Principales

* **Catálogo Dinámico:** Carga de productos desde un archivo `productos.json`.
* **Filtrado Avanzado:** Filtra productos por género y búsqueda de texto usando React Context.
* **Ordenamiento:** Ordena productos por precio, alfabéticamente o por fecha de agregado.
* **Paginación:** El catálogo principal está paginado para un mejor rendimiento y UX.
* **Modo Oscuro/Claro:** Tema global persistente usando Context API y `localStorage`.
* **Favoritos:** Los usuarios pueden guardar sus vinilos favoritos (con persistencia en `localStorage`).
* **Carrito de Compras:** Flujo completo de "Añadir" y "Eliminar" usando Context API.
* **Checkout Simulado:** Formulario de checkout con validación de datos.
* **Integración con WhatsApp:** Genera un pedido listo para enviar por WhatsApp al finalizar la compra.
* **Panel de Admin Simulado:** Una ruta `/admin-ordenes` que lee y muestra todas las órdenes guardadas en `localStorage` (simulación de backend).
* **Diseño Responsive:** La aplicación es 100% usable en dispositivos móviles (CSS Media Queries).

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 18+
* **Enrutamiento:** React Router DOM
* **Manejo de Estado Global:** React Context API (para Temas, Favoritos, Carrito y Filtros).
* **Estilos:** CSS puro con Variables de CSS y Media Queries.
* **Plataforma:** Vite

## 🔧 Instalación y Uso Local

Para correr este proyecto en tu máquina local, sigue estos pasos:

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/joajose8209/proyecto-e-commerce.git](https://github.com/joajose8209/proyecto-e-commerce.git)
    ```
2.  Navega a la carpeta del proyecto:
    ```bash
    cd proyecto-e-commerce
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Corre la aplicación:
    ```bash
    npm run dev
    ```