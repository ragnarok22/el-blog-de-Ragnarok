# El blog de Ragnarok

Un blog sobre mis experiencias y tropezones en el mundo de desarrollo de software.
Esta plantilla está basada en [Eleventy](https://github.com/11ty/eleventy). En su repositorio muestran como construir un blog con el generador estático de Eleventy.

[![Build Status](https://travis-ci.org/11ty/eleventy-base-blog.svg?branch=master)](https://travis-ci.org/11ty/eleventy-base-blog)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b355f6f7-d037-465e-8444-ca7d30561efe/deploy-status)](https://app.netlify.com/sites/ragnarok22-blog/deploys)

### Notas de implementación

* `posts/` contiene las publicaciones del blog
* El contenido puede ser cualquier formato de plantilla (por ejemplo, las publicaciones no necesitan ser markdown). Puedes configurar las plantillas soportadas en `.eleventy.js` -> `templateFormats`.
	* Los `css` y `png` están listados en `templateFormats` pero no soportan tipos de plantillas, cualquier fichero con esas extensiones serán copiados sin modificación a la salida (mientras mantiene la misma estructura de directorio).
* La plantilla de los feed de los posts están en `feed/feed.njk`. Esto también es un buen ejemplo de usar ficheros de datos globales en ellos, este usa `_data/metadata.json`.
* Este blog usa 3 layouts:
  * `_includes/layouts/base.njk`: El primer nivel de la estructura HTML
  * `_includes/layouts/home.njk`: La plantilla de la página de inicio (contenida dentro de `base.njk`)
  * `_includes/layouts/post.njk`: La plantilla de los post del blog (contenida dentro de `base.njk`)
* `_includes/postlist.njk` Esto es una plantilla inclusiva Nunjucks y es un componente reusable usado para mostrar un listado de todos los posts. `index.njk` es un ejemplo de como usarlo.
