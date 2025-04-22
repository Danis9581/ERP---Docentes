# 🏫 ERP de Gestión Docente - Sistema Integral para Administración Educativa

[![PHP](https://img.shields.io/badge/PHP-8.1-777BB4?logo=php)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

**Módulo especializado de un sistema ERP para la gestión centralizada de información docente**, incluyendo registro, modificación, consulta avanzada y análisis de disponibilidad. Ideal para instituciones educativas que requieren precisión en la administración de su personal académico.

*"Optimizando la gestión educativa, un docente a la vez."*

## ✨ Características Clave
- **👨‍🏫 CRUD Completo**: Creación, lectura, actualización y eliminación de registros docentes
- **🔍 Búsqueda Inteligente**: Filtrado por identificación, especialidad o disponibilidad
- **📊 Dashboard Integrado**: Visualización consolidada de todo el personal académico
- **📝 Sistema de Comentarios**: Anotaciones relevantes sobre cada docente
- **⚡ API Modular**: Endpoints bien definidos para integración con otros sistemas

## 🛠️ Arquitectura Tecnológica
| Componente       | Tecnología                  | Función                              |
|------------------|----------------------------|--------------------------------------|
| **Frontend**     | HTML5, CSS3, JavaScript ES6 | Interfaz interactiva y responsive    |
| **Backend**      | PHP 8.1                    | Lógica de negocio y APIs             |
| **Base de Datos**| MySQL 8.0                  | Almacenamiento relacional seguro     |
| **Servidor**     | Apache/Nginx               | Entorno de ejecución                 |

## 📂 Estructura del Proyecto
```bash
├── core/
│   └── accesobbdd.php           # Conexión centralizada a BD
├── api/
│   ├── altaDocentesApi.php       # Endpoint de creación
│   ├── actualizacionDocentesApi.php # Endpoint de actualización
│   └── leerDocentesApi.php       # Endpoint de consulta
├── views/
│   ├── altaDocentes.php          # Formulario de registro
│   ├── listadoDocentes.php       # Tabla maestra de docentes
│   └── consultarDocentes.php     # Panel de búsqueda avanzada
└── assets/
    ├── js/operativa_docentes.js  # Lógica frontend
    └── css/styles.css            # Estilos personalizados
