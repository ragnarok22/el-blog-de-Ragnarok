---
title: Procesos automáticos en GitHub
description: En este artículo te enseño como automatizar procesos con GitHub actions y ahorrarte tiempo y dinero.
date: 2021-02-17
tags:
  - CD/CI
  - GitHub
layout: layouts/post.njk
draft: false
---
## ¿Qué son los GitHub actions?

Los *actions* es una herramienta de [GitHub](https://github.com/features/actions) que facilita la automatización de todos los flujos de trabajo de software. ¿Esto que quiere decir?
Puedes automatizar prácticamente cualquier cosa, como procesos de compilación de ejecución de pruebas unitarias y de integración.
Para empezar a usar los *GitHub actions* solo debes crear una carpeta en tu repositorio llamada `.github` y dentro de esa carpeta otra carpeta llamada `workflows`. Esta carpeta va a contener todos los *actions* o *workflows* que crees, quedando la siguiente estructura:

<pre>
.
├── .github
│   └── workflows
└── my_script.py
└── .gitignore
└── LICENSE
└── README.md
</pre>
Dentro del directorio `.github/workflows` vamos a crear un fichero llamado `hola.yml`. Dentro de este fichero vamos a copiar este código:

```yml
name: Mi primer action

# Ejecuta este workflow cada vez que se suba un nuevo commit al repositorio
on: push

jobs:
  # Establece la llave de tabajo. Esta llave es mostrada como el
  # nombre del trabajo cuando el nombre del trabajo no se proporciona
  primer-trabajo:
    # Nombre del trabajo
    name: Mi primera Prueba
    # Configura el tipo de máquina en la que se va a ejecutar
    runs-on: ubuntu-latest

    steps:
      # Ejecuta un Hola mundo
      - name: Imprimir un mensaje
        run: echo Hola mundo
```

Todo el código mostrado aquí se puede encontrar en [mi GitHub](https://github.com/ragnarok22/example-actions).

## Estructura de los actions

Cada `workflow` está compuesto por `jobs` y cada `job` está compuesto por `steps`. Ahora veremos que es cada cosa.

En primer lugar tenemos `name` que especifica el nombre que se va a mostrar la action que creaste en GitHub. Si vamos a nuestro repo y le damos click en donde dice Actions veremos lo siguiente:
<div><img src="/img/posts/github-actions/all-actions.png"></img></div>

Después le sigue `on: push` que especifica cuando se va a ejecutar el *workflow*. Aquí hay varias opciones. Puedes especificar un evento en específico (`push`, `pull`) y puedes especificar una o varias ramas, tags, etc. *[Más info aquí](https://docs.github.com/es/actions/reference/events-that-trigger-workflows)*
Después le siguen los `jobs` que son los *trabajos* que va a contener ese `workflow`.
En nuestro caso solo tenemos un `jobs` llamado `primer-trabajo`. A continuación definimos el nombre del `job` `Mi primera Prueba` y le decimos en que máquina virtual queremos que corra este `job`. En nuestro caso queremos que se ejecute en la última versión de ubuntu. Si entramos dentro del [commit](https://github.com/ragnarok22/example-actions/actions/runs/582350118) que ejecutó el `action` veremos lo siguiente:
<div><img src="/img/posts/github-actions/jobs.png"></img></div>

en `steps` se definen los pasos que va a realizar este `jobs`. En nuestro ejemplo solo tenemos un paso llamado `imprimir mensaje` que solo mostrará un texto en pantalla. Para verlo entramos dentro del [job](https://github.com/ragnarok22/example-actions/runs/1937678060?check_suite_focus=true). Una vez dentro podemos ver cada paso realizado y desplegar para ver su salida:
<div><img src="/img/posts/github-actions/steps.png"></img></div>

## Conclusiones

Como podemos apreciar los GitHub actions son una herramienta potente para automatizar procesos. Uno de sus usos principles es el CI/CD (integración continua y entrega continua) donde se pueden crear releases automáticos de tu software. En el caso de [GitLab](https://gitlab.com/) estos se llaman GitLab Runners y tienen una sintaxis muy parecida. Espero que te haya servido y puedas dar tus primeros pasos a un desarrollo más limpio y ágil. Para más info puedes visitar la [documentación de GitHub](https://docs.github.com/es/actions/reference/workflow-syntax-for-github-actions).
