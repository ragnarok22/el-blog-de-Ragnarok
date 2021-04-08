---
title: Chequear tus páginas web las 24 horas
description: Hoy verás como tener vigilado tus servicios y aplicaciones web como si fuera un terrorista buscado por la CIA.
date: 2021-04-08
tags:
  - CD/CI
  - Automatization

layout: layouts/post.njk
draft: false
---
En este artículo te voy a mostrar cómo puedes estar pendiente de todos tus proyectos desplegados en la web las 24 horas del día. Relájate que vas a poder dormir. Aquí te muestro el resultado final:

![UpDown](/img/posts/looking-webs/updown.png)
https://status.blog.ragnarok22.dev

![UpDown](/img/posts/looking-webs/monitor.png)
https://monitor.ragnarok22.dev/

Lograr esto es tan sencillo que temo que será un artículo corto.

## Monitoreo de aplicaciones web simple y barato
En [UpDown](https://updown.io/) puedes hacerte una cuenta en segundos usando GitHub, Google o un correo.
Una vez que te hallas creado una cuenta solo debes agregar el link de la página que quieres monitorear y un alias para que te puedas guiar (esto es opcional) y ya tienes un monitoreo constante.

Además de la URL y el alias puedes agregar con que frecuencia quieres que chequee y el Apdex T (tiempo de respuesta satisfactorio). La configuración que viene por defecto es la recomendada pero puedes configurarlo a tu antojo. Para ver el estado de tu sitio como lo mostré anteriormente solo debes pinchar el alias de la página que agregaste.

### Quiero tenerlo en mi dominio!
Bueno, en caso de que quieras tenerlo en tu propio dominio es también sencillo de hacer, solo que debes tocar los registros de tu dominio (sin miedo he!).

El primer paso es poner ese sitio público. En la página que te muestra las estadísticas te sale la opción:

![UpDown public](/img/posts/looking-webs/public-updown.png)

Una vez que lo hallas puesto público debes hacer dos cosas:

1- fijarte en la url, ahí viene un token que tendrás que usar más adelante, un ejemplo es https://updown.io/ngg8, en este caso el token sería `ngg8`.

2- Vas a tu proveedor de dominio o donde puedas editar tu zona de dominio y agregar un registro CNAME con el valor que quieras () apuntanto al token de la siguiente forma <u>XXXX</u>.status.updown.io. Siguiendo el ejemplo anterior usando el token `ngg8` sería ngg8.status.updown.io

Hecho. ya tienes un subdominio mostrando el estado de tus aplicaciones web. Si te enredaste un poco con esto de los dominios te muestro mi configuración:

![DNS records](/img/posts/looking-webs/dns-records.png)

Para más información puedes ver el sitio de [UpDown](https://updown.io/public-status).

## Caídas en el servidor ocurren todo el tiempo. Entérate enseguida!
Otro monitor de páginas web muy bueno es [UptimeRobot](https://uptimerobot.com/). En su página web ellos comentan: "las caídas en el servidor ocurren todo el tiempo, incluso al mejor de nosotros, pero es importante saberlo antes de que nuestros clientes se vean afectados!". Su API trae integración para avisar por correo, SMS, twiiter, Telegram y muchísimos más ([un total de 16](https://uptimerobot.com/integrations/)). Cuenta hasta con una aplicación móvil que puedes descargar de la [Google Play](https://play.google.com/store/apps/details?id=com.uptimerobot) o la [App Store](https://apps.apple.com/us/app/uptime-robot-app/id1104878581)

Para empezar a usarlo debes registrarte con tu nombre, email y una contraseña. Una vez dentro vas a donde dice `Add new monitor`. Ahí te sale para rellenar la información del servicio que quieres monitorear. Lo primero es elegir el tipo de monitor, puede ser `HTTP(s)`, `Keyword`, `Ping`, `Port` y `Heartbeat` (este último solo para usuarios pro).

Seleccionamos el tipo de monitor HTTP(s) y nos aparece 3 campos más:

1- **Friendly name**: un nombre con el que puedas reconocer el sitio fácilmente

2- **URL (or IP)**: la URL o el IP que desees monitorear

3- **Monitoring Interval**: el intervalo de tiempo con que quieres que compruebe la disponibilidad del sitio. El mínimo para la cuenta gratis es de 5 minutos

Abajo nos aparece una sección donde nos muestra el correo con el que nos registramos y podemos seleccionarlo para que nos lleguen las notificaciones por ahí en caso de alguna caída del servicio.
Una vez todo configurado le damos en `Create monitor`.

Hecho!

Ya tenemos nuestro monitor monitoreando nuestro servicio, y no solo puede ser una página web, puede ser un API, un servidor de correo, un servidor VPN y lo que tengas en internet ejecutándose.

### Pssst, quiero esto también en mi subdominio
Para crear un subdominio que apunte a esta información nos vamos a la página web donde nos dice `Status pages`. Ahí nos van aparecer todas las páginas de estado que tengamos. Spoiler alert: si tu cuenta es gratis solo vas a poder tener una :'(

Agregamos una con el nombre que querramos y acto seguido le agregamos todos los monitores que quieras. Esto sirve si tienes un API, una página web, un servidor de correo, etc hosteado y deseas saber el estado del mismo. Lo tienes todo centralizado en una sola página.

Ahora, para crear tu subdominio solo debes de ir a la configuración global de esa página de estado que creaste. Ahí vas a poder ponerle el dominio que desees. Una vez que configures todo le das salvar.

Ahora vamos para la parte cómica. Agregar el Subdominio. Este paso es bastante parecido al anterior. Es solo ir a tu proveedor de dominio y crear un registro `CNAME` apuntando a stats.uptimerobot.com. Acá te muestro cómo me quedó a mi:

![DNS Monitor](/img/posts/looking-webs/dns-monitor.png)

En la pestaña apariencia puedes cambiar un poco la apariencia del sitio pero ya eso te lo dejo a ti ;)