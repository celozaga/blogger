document.addEventListener("DOMContentLoaded", function () {
  const originalIframes = document.querySelectorAll("iframe.BLOG_video_class");

  // Pega título e descrição da postagem do Blogger
  const pageTitle = document.querySelector("title")?.innerText || document.title || "Vídeo incorporado";
  const metaDescription = document.querySelector("meta[name='description']")?.content || "Vídeo incorporado do YouTube";

  originalIframes.forEach(original => {
    const videoId = original.getAttribute("youtube-src-id");
    if (!videoId) return;

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const wrapper = document.createElement("div");
    wrapper.className = "youtube-lazy";
    wrapper.setAttribute("data-id", videoId);

    const thumb = document.createElement("div");
    thumb.className = "youtube-thumb";
    thumb.style.backgroundImage = `url(${thumbUrl})`;

    const button = document.createElement("button");
    button.className = "play-btn";
    button.setAttribute("aria-label", "Assistir vídeo");

    thumb.appendChild(button);
    wrapper.appendChild(thumb);

    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe 
        src="${embedUrl}" 
        loading="lazy"
        allowfullscreen 
        width="560" height="315"
        frameborder="0">
      </iframe>
    `;
    wrapper.appendChild(noscript);

    original.parentNode.replaceChild(wrapper, original);

    wrapper.addEventListener("click", function () {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", `${embedUrl}?autoplay=1`);
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("loading", "lazy");
      wrapper.innerHTML = "";
      wrapper.appendChild(iframe);
    });

    // JSON-LD com título e descrição da postagem
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": pageTitle,
      "description": metaDescription,
      "thumbnailUrl": thumbUrl,
      "uploadDate": new Date().toISOString(),
      "embedUrl": embedUrl,
      "contentUrl": videoUrl,
      "publisher": {
        "@type": "Organization",
        "name": "Seu Blog",
        "logo": {
          "@type": "ImageObject",
          "url": "https://URL-do-seu-logo.png"
        }
      }
    };

    const jsonScript = document.createElement("script");
    jsonScript.type = "application/ld+json";
    jsonScript.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(jsonScript);
  });
});
