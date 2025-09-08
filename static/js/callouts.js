// Turn Obsidian-style callouts into styled boxes without changing your notes.
// Matches lines like: > [!NOTE] Optional title
document.addEventListener("DOMContentLoaded", function () {
  // Map Obsidian types to CSS variant classes
  const map = {
    NOTE: "note",
    INFO: "info",
    TIP: "tip",
    IDEA: "idea",
    WARNING: "warning",
    CAUTION: "caution",
    IMPORTANT: "important",
    SUCCESS: "success",
    ERROR: "danger",
    BUG: "bug",
    QUOTE: "quote",
  };

  // Work inside the main content area so nav/footer blockquotes aren’t touched
  document.querySelectorAll(".content blockquote").forEach((bq) => {
    // Find first <p> inside the blockquote
    const firstP = bq.querySelector("p") || bq.firstElementChild;
    if (!firstP) return;

    const text = firstP.textContent || "";
    const m = text.match(/^\s*\[\!([A-Z]+)\]\s*(.*)$/); // [!NOTE] Optional title
    if (!m) return; // plain blockquote

    const rawType = m[1];                      // e.g., NOTE
    const titleText = m[2].trim();             // optional custom title after the marker
    const variant = map[rawType] || "note";    // default to 'note'

    // Remove the marker from the first paragraph
    firstP.textContent = text.replace(/^\s*\[\![A-Z]+\]\s*/, "");

    // Build callout structure
    bq.classList.add("callout", `callout-${variant}`);
    const wrapper = document.createElement("div");
    wrapper.className = "callout-body";

    // Move all existing children into the body
    while (bq.firstChild) wrapper.appendChild(bq.firstChild);
    bq.appendChild(wrapper);

    // Title (use explicit title if provided; otherwise use the type)
    const titleEl = document.createElement("div");
    titleEl.className = "callout-title";
    titleEl.textContent = titleText || rawType[0] + rawType.slice(1).toLowerCase();
    bq.insertBefore(titleEl, wrapper);
  });
});
