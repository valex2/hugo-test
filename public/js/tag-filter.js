// Use a unique namespace to avoid conflicts
window.TagFilterSystem = (function () {
  console.log('Tag filter script loaded');
  
  // Wait for DOM to be fully loaded and ensure no conflicts
  function safeInitialize() {
    // Add a small delay to ensure all other scripts have loaded
    setTimeout(() => {
      console.log('Initializing tag system after delay');
      initializeTagSystem();
    }, 100);
  }
  
  if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting...');
    document.addEventListener('DOMContentLoaded', safeInitialize);
  } else {
    console.log('DOM ready, initializing with delay');
    safeInitialize();
  }

  function initializeTagSystem() {
    console.log('initializeTagSystem called');
    const grid = document.getElementById("blog-grid");
    console.log('Grid element:', grid);
    const cards = grid ? Array.from(grid.querySelectorAll(".post-card")) : [];
    console.log('Found cards:', cards.length);
    const bar = document.getElementById("tag-filter");
    console.log('Filter bar:', bar);
    
    if (!bar) {
      console.log('No filter bar found, exiting');
      return;
    }
    if (cards.length === 0) {
      console.log('No cards found, exiting');
      return;
    }
    
    console.log('Starting tag system initialization with', cards.length, 'cards');

  // Initialize tag dropdowns in cards
  function initializeTagDropdowns() {
    console.log('Initializing tag dropdowns for', cards.length, 'cards');
    cards.forEach((card, cardIndex) => {
      const tagContainer = card.querySelector('.tag-container');
      if (!tagContainer) {
        console.log(`Card ${cardIndex}: No tag container found`);
        return;
      }

      const tagList = tagContainer.querySelector('.tag-list');
      if (!tagList) {
        console.log(`Card ${cardIndex}: No tag list found`);
        return;
      }
      
      const tagChips = Array.from(tagList.querySelectorAll('.badge'));
      console.log(`Card ${cardIndex}: Found ${tagChips.length} tag chips`);
      
      // Get max visible tags from data attribute or default to 3
      const maxVisibleTags = parseInt(tagContainer.dataset.maxVisibleTags) || 3;
      console.log(`Card ${cardIndex}: Max visible tags: ${maxVisibleTags}`);
      
      if (tagChips.length <= maxVisibleTags) {
        console.log(`Card ${cardIndex}: No dropdown needed (${tagChips.length} <= ${maxVisibleTags})`);
        return; // No need for dropdown if within limit
      }
      
      console.log(`Card ${cardIndex}: Creating dropdown for ${tagChips.length - maxVisibleTags} hidden tags`);

      // Hide tags beyond the configured limit
      const visibleTags = tagChips.slice(0, maxVisibleTags);
      const hiddenTags = tagChips.slice(maxVisibleTags);
      
      hiddenTags.forEach(tag => {
        tag.style.display = 'none';
      });

      // Create dropdown for hidden tags
      const dropdown = document.createElement('div');
      dropdown.className = 'tag-dropdown';
      
      const toggle = document.createElement('button');
      toggle.className = 'tag-dropdown-toggle';
      toggle.textContent = `+${hiddenTags.length} more`;
      toggle.type = 'button';
      
      const menu = document.createElement('div');
      menu.className = 'tag-dropdown-menu';
      
      hiddenTags.forEach(tag => {
        const clonedTag = tag.cloneNode(true);
        clonedTag.style.display = '';
        menu.appendChild(clonedTag);
      });
      
      dropdown.appendChild(toggle);
      dropdown.appendChild(menu);
      tagList.appendChild(dropdown);
      
      // Toggle dropdown
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove('show');
        }
      });
    });
  }

  // Initialize filter dropdown for overflow tags
  function initializeFilterDropdown() {
    const filterButtons = Array.from(bar.querySelectorAll('[data-tag]:not([data-tag="__all"])'));
    console.log('Filter buttons found:', filterButtons.length);
    console.log('Filter buttons:', filterButtons.map(btn => btn.getAttribute('data-tag')));
    
    // Get max visible tags from filter bar data attribute or default to 3
    const maxVisibleTags = parseInt(bar.dataset.maxVisibleTags) || 3;
    console.log('Max visible tags for filter bar:', maxVisibleTags);
    console.log('Bar dataset:', bar.dataset);
    
    if (filterButtons.length <= maxVisibleTags) {
      console.log('No filter dropdown needed:', filterButtons.length, '<=', maxVisibleTags);
      return; // No need for dropdown if within limit
    }

    console.log('Creating filter dropdown for', filterButtons.length - maxVisibleTags, 'hidden buttons');
    const visibleButtons = filterButtons.slice(0, maxVisibleTags);
    const hiddenButtons = filterButtons.slice(maxVisibleTags);
    
    console.log('Visible buttons:', visibleButtons.map(btn => btn.getAttribute('data-tag')));
    console.log('Hidden buttons:', hiddenButtons.map(btn => btn.getAttribute('data-tag')));
    
    // Hide overflow buttons
    hiddenButtons.forEach((btn, index) => {
      console.log(`Hiding button ${index}:`, btn.getAttribute('data-tag'));
      btn.style.display = 'none';
    });
    
    // Create filter dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'filter-dropdown';
    console.log('Created dropdown element:', dropdown);
    
    const toggle = document.createElement('button');
    toggle.className = 'filter-dropdown-toggle';
    toggle.textContent = `+${hiddenButtons.length} more tags`;
    toggle.type = 'button';
    console.log('Created toggle button:', toggle);
    
    const menu = document.createElement('div');
    menu.className = 'filter-dropdown-menu';
    console.log('Created menu element:', menu);
    
    hiddenButtons.forEach((btn, index) => {
      const clonedBtn = btn.cloneNode(true);
      clonedBtn.style.display = '';
      menu.appendChild(clonedBtn);
      console.log(`Added cloned button ${index} to menu:`, clonedBtn.getAttribute('data-tag'));
    });
    
    dropdown.appendChild(toggle);
    dropdown.appendChild(menu);
    bar.appendChild(dropdown);
    console.log('Appended dropdown to bar. Bar children count:', bar.children.length);
    
    // Toggle dropdown
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  }

  function applyFilter(tag) {
    const wanted = (tag || "__all").toLowerCase();
    cards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase().split(/\s+/);
      const show = wanted === "__all" || tags.includes(wanted);
      card.style.display = show ? "" : "none";
    });
    
    // Highlight active buttons in both main bar and dropdown
    const allFilterButtons = bar.querySelectorAll("[data-tag]");
    allFilterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tag") === wanted);
    });
    
    // Also check dropdown menu buttons
    const dropdownMenu = bar.querySelector('.filter-dropdown-menu');
    if (dropdownMenu) {
      const dropdownButtons = dropdownMenu.querySelectorAll("[data-tag]");
      dropdownButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-tag") === wanted);
      });
    }
  }

  // Hook up clicks for both main buttons and dropdown buttons
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tag]");
    if (!btn) return;
    e.preventDefault();
    
    const tag = btn.getAttribute("data-tag");
    const url = new URL(window.location);
    if (tag === "__all") url.searchParams.delete("tag");
    else url.searchParams.set("tag", tag);
    history.replaceState(null, "", url);
    applyFilter(tag);
    
    // Close dropdown after selection
    const dropdownMenu = bar.querySelector('.filter-dropdown-menu');
    if (dropdownMenu) {
      dropdownMenu.classList.remove('show');
    }
  });

    // Initialize dropdowns
    initializeTagDropdowns();
    initializeFilterDropdown();

    // Deep-link: /blogs/?tag=foo
    const params = new URLSearchParams(window.location.search);
    applyFilter(params.get("tag"));
  }

  // Return public interface
  return {
    initialize: initializeTagSystem
  };
})();

// Also try immediate execution as fallback
console.log('Attempting immediate execution as fallback');
if (window.TagFilterSystem) {
  window.TagFilterSystem.initialize();
}
