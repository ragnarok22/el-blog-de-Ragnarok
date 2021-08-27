---
title: De página web a aplicación nativa
description: Hay webs que no cuentan con una aplicación nativa para su sistema operativo y tienes que tener varias pestañas a la vez. Es por eso que te propongo compilar tu propia app nativa
date: 2021-08-27
tags:
  - web
layout: layouts/post.njk
draft: false
---
Con la explosión de JavaScript cada vez vemos webs más completas y funcionales.
Ya no son simples páginas webs, sino que le podemos llamar aplicaciones web por su funcionamiento tan completo.
El principal problema es que muchas veces estás web no cuentan con aplicaciones nativas para nuestros sistemas operativos por lo que tenemos que buscar alternativas en internet o tener muchísimas pestañas abiertas dependiendo de las necesidades de cada cual.

## ¿Es posible convertir una web en una app nativa sin programar?
La respuesta corta es Sí. Podemos "encapsular" esa web en un navegador y simular una aplicación nativa gracias a una herramienta llamada [Electron](https://www.electronjs.org).
Entre las aplicaciones nativas que podemos encontrar creadas con esta herramienta:
- Visual Studio Code
- Whatsapp
- Twitch
- Microsoft Team
- Figma

Aunque existen otras herramientas como [React-Native](https://reactnative.dev) y [Flutter](https://flutter.dev) pero para poder compilar las webs hechas con estas tecnologías debes tener acceso al código fuente que no es nuestro caso.

## ¿Cómo lo hago?
En este tutorial pretendo usar [Nativefier](https://github.com/nativefier/nativefier).
Nativefier es una línea de comandos hecha en NodeJS para crear fácilmente aplicaciones de escritorio de cualquier sitio web con una configuración mínima. Estas aplicaciones son creadas con Electron (que usa Chrome bajo la capa). Puedes compilar estas web a Windows, Mac y Linux.

### Instalación
Para instalarlo debes primero tener instalado [Node](https://nodejs.dev).
Una vez instalado Node procedemos a instalar Nativefier: `npm install nativefier -g`

### Compilar una web
Para este tutorial vamos a compilar [QvaPay](qvapay.com/register/ragnarok), un procesador de pagos online enfocado en las criptomonedas.
Para compilarlo para Linux ejecutamos el siguiente comando:

    nativefier -p linux -a x64 -n QvaPay https://www.qvapay.com/
- con `-p linux` le indicamos a que plataforma a la que queremos compilar. Por defecto es el sistema operativo de tu computador. Soporta los siguientes: "darwin", "linux", "mac", "mas", "osx", "windows"
- con `-a x64` especificamos la arquitectura del CPU de la aplicación que deseamos. Por defecto usa la arquitectura del Node instalado. Soporta: "ia32", "x64", "armv7l", "arm64"
- con `-n QvaPay` especificamos el nombre del ejecutable
- `https://www.qvapay.com` es la url del sitio que deseamos compilar
Este comando creará una carpeta con el nombre `QvaPay-linux-x64` y dentro contendrá todos los archivos necesarios para ejcutarse, incluyendo `QvaPay`, nuestro ejecutable.

Además, podemos indicarle un ícono, el color de fondo, tamaño de la ventana, etc. Para conocer todas las posibilidades que esta herramienta te ofrece puedes ejecutar el comando:

    nativefier --help

## Conclusiones
Sin dudas esta herramienta es una gran opción para todos aquellos que deseen sus webs favoritas como aplicaciones nativas. Puedes encontrar más información en su [repositorio oficial](https://github.com/nativefier/nativefier).
Me basé en [este artículo](https://www.linuxadictos.com/duolingo-como-app-de-gnu-linux-aprende-ingles-de-una-forma-divertida.html) para este tutorial.
Además puedes ver el compilado que le hice a [QvaPay](qvapay.com/register/ragnarok) usando los GitHub actions (que te mostré antes como usarlos en [este artículo](https://blog.ragnarok22.dev/posts/github-actions/)) en este [link](https://link.limbatus.dev/qvapay-repo).
