// Tag Filter System with Dropdown Support
document.addEventListener('DOMContentLoaded', function() {
    const tagFilter = document.getElementById('tag-filter');
    if (!tagFilter) return;

    const filterButtons = tagFilter.querySelectorAll('.filter-tag-btn');
    const posts = document.querySelectorAll('.post-card, .project-card, .experience-card');
    
    // Add click event listeners to all filter buttons (including dropdown items)
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedTag = this.getAttribute('data-tag');
            
            // Update active states for all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            filterPosts(selectedTag);
            
            // Close dropdown if this was a dropdown item
            const dropdown = this.closest('.dropdown');
            if (dropdown) {
                const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle && dropdownToggle.classList.contains('show')) {
                    // Use Bootstrap's dropdown API to hide
                    if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
                        const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                        if (bsDropdown) {
                            bsDropdown.hide();
                        }
                    } else {
                        // Fallback if Bootstrap is not available
                        dropdownToggle.classList.remove('show');
                        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                            dropdownMenu.classList.remove('show');
                        }
                    }
                }
            }
        });
    });

    // Handle Bootstrap dropdown events if available
    const dropdownToggles = tagFilter.querySelectorAll('.filter-dropdown-btn');
    dropdownToggles.forEach(toggle => {
        if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
            toggle.addEventListener('show.bs.dropdown', function() {
                this.classList.add('show');
            });
            
            toggle.addEventListener('hide.bs.dropdown', function() {
                this.classList.remove('show');
            });
        }
    });

    function filterPosts(selectedTag) {
        posts.forEach(post => {
            if (selectedTag === '__all') {
                post.style.display = 'block';
                return;
            }
            
            // Get tags from the post
            const postTags = getPostTags(post);
            const shouldShow = postTags.some(tag => 
                tag.toLowerCase().replace(/\s+/g, '-') === selectedTag.toLowerCase()
            );
            
            post.style.display = shouldShow ? 'block' : 'none';
        });
    }

    function getPostTags(post) {
        const tags = [];
        
        // Try different tag selectors
        const tagElements = post.querySelectorAll('.tag-chip, .badge[data-tag], [data-project-tag], [data-experience-tag]');
        
        tagElements.forEach(tagEl => {
            const tagText = tagEl.textContent.trim();
            if (tagText) {
                tags.push(tagText);
            }
        });
        
        return tags;
    }

    // Handle click outside dropdown to close
    document.addEventListener('click', function(e) {
        const dropdowns = tagFilter.querySelectorAll('.filter-dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle && dropdownToggle.classList.contains('show')) {
                    if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
                        const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                        if (bsDropdown) {
                            bsDropdown.hide();
                        }
                    } else {
                        // Fallback if Bootstrap is not available
                        dropdownToggle.classList.remove('show');
                        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                            dropdownMenu.classList.remove('show');
                        }
                    }
                }
            }
        });
    });

    // Initialize tag dropdowns in cards (existing functionality)
    initializeTagDropdowns();
});

// Initialize tag dropdowns in cards
function initializeTagDropdowns() {
    const cards = document.querySelectorAll('.post-card, .project-card, .experience-card');
    
    cards.forEach((card, cardIndex) => {
        const tagContainer = card.querySelector('.tag-container');
        if (!tagContainer) return;

        const tagList = tagContainer.querySelector('.tag-list');
        if (!tagList) return;
        
        const tagChips = Array.from(tagList.querySelectorAll('.badge'));
        
        // Get max visible tags from data attribute or default to 5
        const maxVisibleTags = parseInt(tagContainer.dataset.maxVisibleTags) || 5;
        
        if (tagChips.length <= maxVisibleTags) {
            return; // No need for dropdown if within limit
        }

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
