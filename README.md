# 🚀 Herramientas y guía para abrir el proyecto en local

<a href="https://nodejs.org/en/download" target="_blank">
<img src="https://img.shields.io/badge/LTS%20v20.13.1-%235FA04E?style=flat-square&logo=nodedotjs&logoColor=%235FA04E&label=Node%20js&labelColor=white"></a>

<a href="https://code.visualstudio.com/" target="_blank">
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-%23007ACC?style=flat-square&logo=visualstudiocode"></a>

<a href="https://www.postman.com/downloads/" target="_blank">
<img src="https://img.shields.io/badge/Postman-%23FF6C37?style=flat-square&logo=postman&logoColor=white"></a>

## Node js en la terminal 📟

> Ejecuta en la raiz el siguiente comando para instalar las dependencias (package json).

```sh
npm install
```

## Por último abre VS Code </>

> En la raiz del proyecto ejecuta.

```sh
code .
```

## Estructura del proyecto 🗂️

Dentro del proyecto Astro, verá las siguientes carpetas.

```text
/
├── API/
│   ├── database
│   │
│   ├── routes
│   │
│   auth
│   
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   
│   ├── layouts/
│   │   
│   └── pages/
│       
└── package.json
```

En `API/`, está el modelo de database, el CRUD con los endpoints de login y registro.

Astro busca archivos `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta según su nombre de archivo.

En `src/components/`, coloco los componentes reutilizables de Astro o React.

Los archivos estáticos, como imágenes los coloco en el directorio `public/`.

## Comandos de Astro 🧞

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

> Para iniciar el servidor del desarrollo local en `localhost:4321`

```sh
npm run dev
```

> Para iniciar el servidor de la APi

```sh
npm run start
```
