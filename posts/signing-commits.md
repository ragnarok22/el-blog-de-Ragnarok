---
title: ¿Cómo auto firmar tus commits?
description: En este artículo aprenderás a firmar tu obra como un artista famoso.
date: 2021-03-17
tags:
  - GitHub
layout: layouts/post.njk
draft: false
---
Como lo lees. Puedes firmar cada pedazo de código que escribas, cada pequeña pieza de arte que programes en cada commit. ¿Por qué es importante firmar los commits? Al firmar los commits o tags que crees localmente, otras personas pueden verificar que tu trabajo viene de una fuente confiable, como por ejemplo tu laptop o tu computadora personal. Un commit o tag que tenga una firma GPG que es criptográficamente comprobable, GitHub o GitLab marca el commit o tag como verificado:
<div><img src="/img/posts/signing-commits/signed-commit.png"></img></div>

Incluso en los repositorios, los administradores pueden implementar la firma como algo requerido en una rama para bloquear todas las confirmaciones que no estén firmadas y verificadas. Para obtener más información, consulta "[Acerca de la firma de confirmación requerida](https://docs.github.com/es/articles/about-required-commit-signing)".
[GitHub](http://github.com/) utilizará GPG automáticamente para firmar las confirmaciones que hagas utilizando la interface web de GitHub con excepción de cuando combinas y fusionas una solicitud de extracción de la cual no seas autor. Las confirmaciones que firme GitHub tendrán un estado verificado en GitHub. Puedes verificar la firma localmente usando la clave pública disponible en https://github.com/web-flow.gpg.

## ¿Qué es GPG?
GPG significa [GNU Privacy Guard](https://gnupg.org/), es una herramienta de cifrado y firmas digitales de software libre bajo licencia GPL. Puedes usar GPG para firmar commits con una clave GPG que generas tu mismo.

## Verificar los commits usando GPG
Para firmar los commits usando GPG y que sean verificadas en GitHub, debes seguir los siguientes pasos:

### Genera una clave nueva
Puedes generar una nueva llave GPG para usarla en tus commits y tags. Cada firma puede utilizar diferentes algoritmos criptográficos, Los algoritmos complatibles con GitHub son:
- RSA
- ElGamal
- DSA
- ECDH
- ECDSA
- EdDSA

Nota: Antes de generar una nueva llave GPG, asegúrate de haber verificado tu dirección de correo en GitHub, si no lo has hecho no podrás firmar los commits con GPG.
1- Descarga e instala la [línea de comando GPG](https://www.gnupg.org/download/) para tu sistema operativo.
2- Abre la consola en Linux o Git Bash en Windows
3- Genera un par de la llave GPG. Tu llave debe utilizar RSA. Si estás usando la versión 2.1.17 o superior usa el comando `gpg --full-generate-key`. Si estás usando una versión más antigua usa el comando `gpg --default-new-key-algo rsa4096 --gen-key`.
4- En las versiones más modernas te sale un prompt donde debes especificar la clase de llaves que deseas. Tu llave debe tener al menos 4096 bits. También debes ingresar el período de validez que deberá tener la llave.
5- Verifica tu información de ID de usuario. Nota: Cuando se te pida que ingreses tu dirección de correo electrónico, asegúrate de poner la que usas en tu cuenta de GitHub.
6- Escribe una contraseña para la llave
7- Utiliza el comando `gpg --list-secret-keys --keyid-format LONG` para enumerar las llaves GPG para las cuales tienes tanto una llave pública como privada. Se requiere una llave privada para registrar confirmaciones o etiquetas. Algunas instalacciones GPG en Linux pueden requerir que uses `gpg2` en vez de `gpg`.
8- De la lista de llaves GPG, copia la ID de la llave GPG que queires utilizar, en este ejemplo, el ID de la llave GPG es `3AA5C34371567BD2`:
```bash
$ gpg --list-secret-keys --keyid-format LONG
/Users/ragnarok22/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2021-03-17 [expires: 2021-04-17]
uid                          Ragnarok22 
ssb   4096R/42B317FD4BA89E7A 2021-03-17
```
9- Pega el siguiente texto sustituyendo el ID de la llave GPG que deseas utilizar. En este ejemplo el ID es `3AA5C34371567BD2`:
```bash
$ gpg --armor --export 3AA5C34371567BD2
```
10- Copia tu llave GPG, comenzando con `-----BEGIN PGP PUBLIC KEY BLOCK-----` y terminando con `-----END PGP PUBLIC KEY BLOCK-----`.


### Agrega una clave GPG a tu cuenta de GitHub
Una vez que ya tengas tu llave GPG debes agregarla en tu cuenta, para hacerlo debes ir a la [configuración en GitHub](https://github.com/settings/keys). Vas a tu perfil, settings, SSH and GPG keys. Una vez ahí solo debes dar click en New GPG key, en el campo key pegar la llave GPG y click en el botón add GPG key. Para confirmar esta acción debes de poner tu contraseña de GitHub.

### Usa la clave para tus commits
Ya tenemos nuestra llave GPG y GitHub la conoce pero, ¿cómo le decimos a Git que use la llave para firmar los commits y tags? Abre la terminal en Linux o Git Bash en Windows, utiliza el comando `gpg --list-secret-keys --keyid-format LONG` para listar las llaves GPG. De la lista de llaves GPG, copia la ID de la llave GPG que deseas utilizar (la misma que agregaste en GitHub). En este ejemplo, el ID de la llave GPG es `3AA5C34371567BD2`.
Para configurar tu llave de firmar GPG en Git, pega el siguiente comando donde debes sustituir el ID de la llave GPG que quieras utilizar: `git config --global user.signingkey 3AA5C34371567BD2`. Este comando lo único que hace es agregar a tu fichero de configuración de Git `.gitconfig` la línea `signingkey = 3AA5C34371567BD2`.
La próxima vez que vallas hacer un commit GPG te va a pedir la contraseña para que puedas acceder a la llave.

## Conclusiones
Como has podido apreciar firmar los commits puede ser algo extenso en un principio pero nada complicado y muy útil se se quiere implementar una mayor seguridad.
Si deseas saber más sobre como trabajar con multifirmas puedes leer [este artículo](https://docs.github.com/es/github/authenticating-to-github/signing-commits).
Si deseas saber como firmar tags puedes leer [este artículo de GitHub](https://docs.github.com/es/github/authenticating-to-github/signing-tags).
