const container = document.querySelector("[data-webmentions]");

if (container) {
    renderWebmentions(container);
}

// Render todas las webmentions en el innerHTML del container
async function renderWebmentions(container) {
  const target = container.dataset.webmentions;
  const url = `https://webmention.io/api/mentions.jf2?target=${target}`;
  const { children: webmentions } = await fetch(url).then( res => res.json() )

  if (webmentions.length === 0) return;

  let view = webmentions.map( webmention => renderWebmention(webmention) );
  container.innerHTML = view.join('');
}

// render una webmetion individual
function renderWebmention(webmention) {

  const action = {
    "in-reply-to": "respondió",
    "like-of": "le gustó",
    "repost-of": " retwiteó",
    "mention-of": "mencionó"
  }[webmention["wm-property"]];

  const receivedAt = new Date(webmention["wm-received"]).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return  `
    <div class="flex items-center mb-6">
      <div class="flex-shrink-0 mr-4">
          <img class="h-8 w-8 rounded-full" loading="lazy" src="${ webmention.author.photo }">
      </div>
      <div class="">
        <div class="space-x-2">
          <a class="font-semibold" href="${ webmention.author.url }">${ webmention.author.name }</a>
          <span class="text-gray-700 dark:text-gray-300">
            <a class="underline" href="${ webmention.url }">${ action }</a>
          </span>
          <span class="text-gray-600 dark:text-gray-400">
            ${ receivedAt }
          </span>
        </div>
        <div class="mt-1">
            ${ webmention.content ? webmention.content.text : '' }
        </div>
      </div>
  </div>`;
}
