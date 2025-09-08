(function () {
  const grid = document.getElementById("blog-grid");
  const cards = grid ? Array.from(grid.querySelectorAll(".post-card")) : [];
  const bar = document.getElementById("tag-filter");
  if (!bar || cards.length === 0) return;

  function applyFilter(tag) {
    const wanted = (tag || "__all").toLowerCase();
    cards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase().split(/\s+/);
      const show = wanted === "__all" || tags.includes(wanted);
      card.style.display = show ? "" : "none";
    });
    // highlight active
    bar.querySelectorAll("[data-tag]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tag") === wanted);
    });
  }

  // Hook up clicks
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tag]");
    if (!btn) return;
    e.preventDefault(); // keep it SPA-like; tag chips also link for SEO when clicked in cards
    const tag = btn.getAttribute("data-tag");
    const url = new URL(window.location);
    if (tag === "__all") url.searchParams.delete("tag");
    else url.searchParams.set("tag", tag);
    history.replaceState(null, "", url);
    applyFilter(tag);
  });

  // Deep-link: /blogs/?tag=foo
  const params = new URLSearchParams(window.location.search);
  applyFilter(params.get("tag"));
})();
