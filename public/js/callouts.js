// Convert Obsidian callouts both in blockquotes ("> [!TYPE]")
// and in plain paragraphs ("[!TYPE]") without editing your notes.
document.addEventListener("DOMContentLoaded", () => {
  const TYPE_MAP = {
    NOTE: "note", INFO: "info", TIP: "tip", IDEA: "idea",
    WARNING: "warning", CAUTION: "warning", IMPORTANT: "warning",
    SUCCESS: "success", ERROR: "danger", BUG: "danger", QUOTE: "quote",
  };
  const titleFor = (raw) => raw[0] + raw.slice(1).toLowerCase();

  // Work inside common post containers (robust across themes/template tweaks)
  const roots = document.querySelectorAll(".content, article, main, .post-content");

  roots.forEach((root) => {
    // -------- 1) REAL BLOCKQUOTES: > [!TYPE] ...
    root.querySelectorAll("blockquote").forEach((bq) => {
      const first = bq.firstElementChild;
      if (!first) return;
      const txt = (first.textContent || "").trim();
      const m = txt.match(/^\[!(\w+)\]\s*(.*)$/); // [!NOTE] Optional title
      if (!m) return;

      const raw = m[1].toUpperCase();
      const nice = TYPE_MAP[raw] || "note";
      const titleText = m[2] || titleFor(raw);

      // Remove marker text from the first paragraph
      first.textContent = txt.replace(/^\[!\w+\]\s*/, "");

      // Wrap children into a .callout-body and prepend a title
      const body = document.createElement("div");
      body.className = "callout-body";
      while (bq.firstChild) body.appendChild(bq.firstChild);

      const titleEl = document.createElement("div");
      titleEl.className = "callout-title";
      titleEl.textContent = titleText;

      bq.classList.add("callout", `callout-${nice}`);
      bq.appendChild(titleEl);
      bq.appendChild(body);
    });

    // -------- 2) PARAGRAPH FORM: [!TYPE] ... (no ">")
    const BREAKERS = new Set(["H1","H2","H3","H4","H5","H6","HR","UL","OL","TABLE","PRE","BLOCKQUOTE","FIGURE"]);
    const ps = Array.from(root.querySelectorAll("p"));

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (!p.isConnected) continue;                 // may have been moved already
      if (p.closest(".callout")) continue;          // already inside a callout

      const txt = (p.textContent || "").trim();
      const m = txt.match(/^\[!(\w+)\]\s*(.*)$/);
      if (!m) continue;

      const raw = m[1].toUpperCase();
      const nice = TYPE_MAP[raw] || "note";
      const titleText = m[2] || titleFor(raw);

      // Create callout wrapper (use blockquote for semantics/consistency)
      const wrapper = document.createElement("blockquote");
      wrapper.className = `callout callout-${nice}`;

      const titleEl = document.createElement("div");
      titleEl.className = "callout-title";
      titleEl.textContent = titleText;

      const body = document.createElement("div");
      body.className = "callout-body";

      // Insert wrapper where the first paragraph was
      p.parentNode.insertBefore(wrapper, p);
      wrapper.appendChild(titleEl);
      wrapper.appendChild(body);

      // First body paragraph (without the marker)
      const firstBody = document.createElement("p");
      firstBody.textContent = txt.replace(/^\[!\w+\]\s*/, "");
      if (firstBody.textContent.length) body.appendChild(firstBody);
      p.remove(); // remove the original paragraph

      // Pull subsequent paragraphs into the callout until a breaker
      let sib = wrapper.nextElementSibling;
      while (sib && sib.tagName === "P" && !/^\[!(\w+)\]/.test((sib.textContent || "").trim())) {
        const next = sib.nextElementSibling;
        body.appendChild(sib); // moves the node
        sib = next;
      }

      // Skip moved paragraphs in the outer loop
      while (i + 1 < ps.length && !ps[i + 1].isConnected) i++;
    }
  });
});
