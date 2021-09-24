---
title: De APIs, Scrapeo de datos y crowdfunding
description: Necesitas la API de algún sitio que uses pero este no tiene? Ven que te enseño a scrapear webs
date: 2021-09-24
tags:
  - API
  - Automatization
layout: layouts/post.njk
draft: false
---
Hace unos días empecé a colaborar con un grupo de desarrolladores para crear [JustShip](https://justship.to/). JustShip es un espacio para ayudar a devs, makers y hackers a recorrer el camino y simplemente LANZAR 🚀.
Lo genial de esto es que es hecho por la comunidad y para la comunidad, open source y transparente con sus finanzas.

Todo esto suena muy bonito pero para comprar servidores, contratar servicios, pago de internet y demás se necesita dinero, es por eso que lanzamos una campaña de [crowdfunding](https://es.wikipedia.org/wiki/Micromecenazgo) en [Ko-fi](https://ko-fi.com/justship).

## Recaudando para lanzar!
[Ko-fi](https://ko-fi.com) es un buen sitio para recaudar dinero fiat y hasta ahora no es cubanofóbico. Tiene sus limitantes para extraer dinero, pero nada que un cubano o una cubana ninja 🥷🏻 con mil bloqueos y embargos arriba no pueda resolver 😉.

Así que decidimos hacer un post explicando de [que va la cosa](https://medium.com/justship/de-la-idea-al-producto-justship-fd5d9fd3ae83)
y lanzar el crowdfunding en [Ko-fi](https://ko-fi.com/justship).

## Whaaat! ¿Y el API dónde está?
Para hacer todo transparente queríamos mostrar como iba la recaudación en nuestra landing page inicial y tremendo choque fue cuando vimos que Ko-fi no tiene API!
Pero claro, esto no nos iba a detener. Somos informáticos, creativos y emprendedores! Es por eso que decidimos escrapear la web y crear un API para obtener la información que queríamos.

## ¿Qué es eso de trapear en la web?
Suelta la escoba, no es trapear, es escrapear. Esta palabra 95.67% inventada viene del inglés scraping o raspado en español. El web scraping es una técnica utilizada mediante programas de software para extraer información de sitios web. Usualmente, estos programas simulan la navegación de un humano en internet.

## Creando la API
Para crear algo sencillo, rápido y bonito vamos a crear un proyectico en [express](https://expressjs.com/es/) y desplegarlo en [vercel](https://vercel.com/). Todo muy serverless.

### Creando los endpoints
Express es una librería escrita en JavaScript que te permite crear una infraestructura web rápida, minimalista y flexible para Node.js
Vamos a crear dos rutas: Una que muestre un saludo caluroso y otra que dado una cuenta en Ko-fi extraiga los datos.
Así creamos un endpoint básico:

    // endpoint que muestra un saludo caluroso
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

El otro endpoint recibirá el nombre de usuario de Ko-fi por la url y mostrará su información:

    app.get('/:username', async (req, res) => {
      try {
        // obtenemos el username de la url
        const { username } = req.params;

        // escrapeamos los datos
        let result = await scrapping.getCrowdfunding(username);

        // enviamos la información al usuario
        res.send(result);
      } catch (error) {

        // se produjo un error? Pues también hay que mostrárselo al usuario
        res.status(500).send({
          type: 'error',
          code: error.name,
          message: error.message
        })
      }
    })
Bien, ya tenemos los dos endpoints, ahora que falta? A sí! Escrapear!

## Escrapeando datos
Para escrapear los datos vamos a usar al titiritero de Google: [Puppeteer](https://developers.google.com/web/tools/puppeteer). (También puedes encontrar su documentación en https://pptr.dev.)
Para trabajar con Puppeteer debes seguir la lógica de un usuario normal usando un navegador. Ejemplo:

1- abrir el navegador
2- abrir una nueva pestaña
3- abrir la url que deseas
4- ver la información que necesito

### Instalando Puppeteer
Instalar puppeteer es como instalar las otras librerías de Node:
`npm install puppeteer` para NPM y `yarn add puppeteer` en el caso de que uses yarn.
Menos bla bla bla y más código? Aquí te muestro que sencillo:

    // importamos la libería
    const puppeteer = require('puppeteer');

    async function escrapeo (url) {
        // "abrimos" el navegador
        const browser = await puppeteer.launch();

        // abrimos una nueva pestaña
        const page = await browser.newPage();

        // vamos a la url que deseamos.
        await page.goto(url);

        // aquí hacemos una captura de pantalla a esa web que visitamos
        // y la guardamos con el nombre screenshot.png
        await page.screenshot({path: 'screenshot.png'});

        // cerramos el navegador
        browser.close();
    }
Esto es un "hola mundo" con puppeteer. Una vez abierta la web que deseas puedes seleccionar los datos que necesites usando selectores:

    let results = await page.evaluate(() => {
        const selector = '#pagina > .my-class';
        return document.querySelector(selector).textContent;
    })
Con el método `evaluate` "entramos" a la consola del navegador de puppeteer y ejecutamos código javaScript. Ahí solo usamos `document.querySelector` para seleccionar el contenido de un elemento y retornarlo.

## ¿Solo podemos obtener datos con Puppeteer?
No. Para nada. En esta breve (lo sé, está muy largo) introducción te mostré como obtener datos, pero puedes introducir datos, dar click en botones y mucho más. Puedes crear un bot de ti mismo publicando memes de gaticos en facebook si lo deseas 😉.

## Y el resultado?
Cómo este artículo no pretendía ser tan largo no te puedo dejar todo el código aquí. Con esto solo pretendo mostrarte que se puede hacer y las herramientas que puedes utilizar para hacerlo. Ya te tocará a ti aplicar ingenio y mucho Google para crear tu bot publica gaticos.
El código se encuentra alojado en [GitHub](https://github.com/ragnarok22/kofi_data) y es open source. Si lo deseas puedes pasar, dar una ojeada y dejar tu Pull Request. Tiene varios errores que te pueden ser divertido corregir.
El código está desplegado en vercel y corriendo. Puedes encontrarlo [aquí](https://kofi-data.ragnarok22.dev/). Si deseas ver el crowdfunding de otras personas solo tienes que pasarle en la url su perfil como el ejemplo de JustShip: https://kofi-data.ragnarok22.dev/justship

## Conclusiones
Con Puppeteer puedes simular que eres una persona e interactuar con otra web. Introducir texto en un input, dar click en botones, ver que información contienen otros elementos y todo lo que tu cuerpo pida.
El código para obtener el crowdfunding de ko-fi puedes obtenerlo en mi [GitHub](https://github.com/ragnarok22/kofi_data).
Por cierto, aquí te dejo [mi Ko-fi](https://ko-fi.com/ragnarok22) por si te interesa apoyar mi contenido 😉.
PD: Si deseas apoyar a JustShip pásate por https://justship.to, ahí te enteras más del proyecto y ves las formas de donación.
