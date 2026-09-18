/**
 * OctenSidebar Component
 * Modular DOM Renderer and State Controller for Octen Sidebar.
 */

(function(window) {
  function OctenSidebar(options) {
    this.container = typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

    this.config = options.config || window.OCTEN_SIDEBAR_CONFIG || {};
    this.activeRoute = options.activeRoute || 'overview';
    this.currentOrgId = this.config.workspace ? this.config.workspace.currentId : 'org';
    this.isWsDropdownOpen = false;
    this.isAccountPopoverOpen = false;
    this.eventListeners = {};

    this.init();
  }

  OctenSidebar.prototype.init = function() {
    if (!this.container) {
      console.error('[OctenSidebar] Target container not found.');
      return;
    }

    this.render();
    this.bindEvents();
  };

  OctenSidebar.prototype.render = function() {
    var brand = this.config.brand || {};
    var ws = this.config.workspace || { organizations: [] };
    var user = this.config.user || {};
    var currentOrg = ws.organizations.find(function(o) { return o.id === this.currentOrgId; }.bind(this)) || ws.organizations[0] || { name: 'Acme Inc' };

    var html = `
      <aside class="octen-sidebar" id="octen-sidebar-root">
        <!-- 1. Header: Logo & Workspace Switcher -->
        <div class="sidebar-header">
          <a href="${brand.href || '#'}" class="sidebar-logo-link" title="${brand.title || 'Octen'}">
            ${brand.logoSvg || ''}
          </a>

          <div class="ws-wrap" id="ws-wrap">
            <button type="button" class="ws-btn" id="ws-toggle-btn" aria-expanded="false" aria-label="Switch organization">
              <span class="ws-name" id="ws-current-name">${currentOrg.name}</span>
              <svg class="ws-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="ws-dropdown" id="ws-dropdown">
              ${(ws.organizations || []).map(function(org) {
                var isSelected = org.id === this.currentOrgId;
                return `
                  <button type="button" class="ws-item ${isSelected ? 'active' : ''}" data-org-id="${org.id}">
                    <span>${org.name}</span>
                    ${isSelected ? `<svg class="ws-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>` : ''}
                  </button>
                `;
              }.bind(this)).join('')}

              <div class="ws-divider"></div>
              <button type="button" class="ws-create-btn" id="ws-create-btn">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
                <span>${ws.createActionText || 'Create Organization'}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. Navigation Area -->
        <nav class="sidebar-nav" id="sidebar-nav">
          ${(this.config.navigation || []).map(function(groupBlock) {
            var groupHeader = groupBlock.group ? `<div class="nav-section-label">${groupBlock.group}</div>` : '';
            var itemsHtml = (groupBlock.items || []).map(function(item) {
              var isActive = item.id === this.activeRoute;
              var badgeHtml = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
              return `
                <a href="${item.href || '#'}" 
                   class="nav-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''}" 
                   data-route-id="${item.id}"
                   ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                  ${item.icon || ''}
                  <span>${item.title}</span>
                  ${badgeHtml}
                </a>
              `;
            }.bind(this)).join('');

            return `
              <div class="nav-group">
                ${groupHeader}
                ${itemsHtml}
              </div>
            `;
          }.bind(this)).join('')}
        </nav>

        <!-- 3. Bottom Footer & Account Popover -->
        <div class="sidebar-footer" id="sidebar-footer">
          <button type="button" class="user-profile-toggle" id="user-profile-btn" aria-expanded="false" aria-label="User account menu">
            <div class="user-profile-left">
              <div class="user-avatar">${user.avatar || 'U'}</div>
              <div class="user-meta">
                <div class="user-name">${user.name || 'User'}</div>
                <div class="user-email">${user.email || ''}</div>
              </div>
            </div>
            <svg class="user-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Account Popover -->
          <div class="account-popover" id="account-popover">
            <!-- User info header -->
            <div class="popover-user-info">
              <div class="popover-user-name">${user.name || 'User'}</div>
              <div class="popover-user-email">${user.email || ''}</div>
            </div>

            <!-- Standard Theme Switcher -->
            <div class="popover-theme-row">
              <div class="popover-theme-label">
                <svg class="popover-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
                <span>Theme</span>
              </div>
              <div class="theme-segmented-group">
                <button type="button" class="theme-segmented-btn" data-theme-btn="light" title="Light Theme">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                </button>
                <button type="button" class="theme-segmented-btn" data-theme-btn="dark" title="Dark Theme">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
                <button type="button" class="theme-segmented-btn" data-theme-btn="system" title="Follow System">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </button>
              </div>
            </div>

            <!-- Quick Links -->
            ${(user.popoverLinks || []).map(function(link) {
              return `
                <a href="${link.href || '#'}" class="popover-link" data-link-id="${link.id}">
                  ${link.icon || ''}
                  <span>${link.title}</span>
                </a>
              `;
            }).join('')}

            <div class="ws-divider"></div>

            <!-- Logout -->
            <a href="#" class="popover-link logout" id="user-logout-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>
    `;

    this.container.innerHTML = html;

    // Synchronize current theme state
    if (window.OctenTheme) {
      var currentMode = window.OctenTheme.getTheme();
      this.container.querySelectorAll('[data-theme-btn]').forEach(function(btn) {
        if (btn.getAttribute('data-theme-btn') === currentMode) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  };

  OctenSidebar.prototype.bindEvents = function() {
    var self = this;

    // 1. Organization Dropdown Toggle
    var wsWrap = this.container.querySelector('#ws-wrap');
    var wsBtn = this.container.querySelector('#ws-toggle-btn');
    if (wsBtn) {
      wsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        self.setWsDropdownOpen(!self.isWsDropdownOpen);
        if (self.isWsDropdownOpen && self.isAccountPopoverOpen) {
          self.setAccountPopoverOpen(false);
        }
      });
    }

    // Organization Selection
    this.container.querySelectorAll('.ws-item').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var orgId = btn.getAttribute('data-org-id');
        self.setOrganization(orgId);
      });
    });

    // Create Organization Action
    var createBtn = this.container.querySelector('#ws-create-btn');
    if (createBtn) {
      createBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        self.setWsDropdownOpen(false);
        self.trigger('create-org');
      });
    }

    // 2. Navigation Item Click
    this.container.querySelectorAll('.nav-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        var isExternal = item.hasAttribute('target');
        var routeId = item.getAttribute('data-route-id');
        if (!isExternal) {
          e.preventDefault();
          self.setActiveRoute(routeId);
        }
        self.trigger('route-select', { routeId: routeId, isExternal: isExternal });
      });
    });

    // 3. User Profile Popover Toggle
    var footer = this.container.querySelector('#sidebar-footer');
    var userBtn = this.container.querySelector('#user-profile-btn');
    if (userBtn) {
      userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        self.setAccountPopoverOpen(!self.isAccountPopoverOpen);
        if (self.isAccountPopoverOpen && self.isWsDropdownOpen) {
          self.setWsDropdownOpen(false);
        }
      });
    }

    // Theme Segmented Controls
    this.container.querySelectorAll('[data-theme-btn]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var mode = btn.getAttribute('data-theme-btn');
        if (window.OctenTheme) {
          window.OctenTheme.setTheme(mode);
        }
        self.trigger('theme-change', { mode: mode });
      });
    });

    // Popover Links
    this.container.querySelectorAll('.popover-link:not(.logout)').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var linkId = link.getAttribute('data-link-id');
        var href = link.getAttribute('href');
        if (!href || href === '#') {
          e.preventDefault();
        }
        self.setAccountPopoverOpen(false);
        self.trigger('popover-link-click', { linkId: linkId });
      });
    });

    // Logout
    var logoutBtn = this.container.querySelector('#user-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        self.setAccountPopoverOpen(false);
        self.trigger('logout');
      });
    }

    // Global Click Outside & Escape
    this._onDocumentClick = function(e) {
      if (!self.container.contains(e.target)) {
        if (self.isWsDropdownOpen) self.setWsDropdownOpen(false);
        if (self.isAccountPopoverOpen) self.setAccountPopoverOpen(false);
      }
    };
    document.addEventListener('click', this._onDocumentClick);

    this._onDocumentKeyDown = function(e) {
      if (e.key === 'Escape') {
        if (self.isWsDropdownOpen) self.setWsDropdownOpen(false);
        if (self.isAccountPopoverOpen) self.setAccountPopoverOpen(false);
      }
    };
    document.addEventListener('keydown', this._onDocumentKeyDown);
  };

  OctenSidebar.prototype.setWsDropdownOpen = function(open) {
    this.isWsDropdownOpen = open;
    var wsWrap = this.container.querySelector('#ws-wrap');
    if (wsWrap) {
      if (open) {
        wsWrap.classList.add('open');
      } else {
        wsWrap.classList.remove('open');
      }
    }
  };

  OctenSidebar.prototype.setAccountPopoverOpen = function(open) {
    this.isAccountPopoverOpen = open;
    var footer = this.container.querySelector('#sidebar-footer');
    if (footer) {
      if (open) {
        footer.classList.add('open');
      } else {
        footer.classList.remove('open');
      }
    }
  };

  OctenSidebar.prototype.setActiveRoute = function(routeId) {
    this.activeRoute = routeId;
    this.container.querySelectorAll('.nav-item').forEach(function(item) {
      if (item.getAttribute('data-route-id') === routeId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  OctenSidebar.prototype.setOrganization = function(orgId) {
    this.currentOrgId = orgId;
    var orgs = (this.config.workspace && this.config.workspace.organizations) || [];
    var org = orgs.find(function(o) { return o.id === orgId; });
    var nameEl = this.container.querySelector('#ws-current-name');
    if (nameEl && org) {
      nameEl.textContent = org.name;
    }

    this.container.querySelectorAll('.ws-item').forEach(function(btn) {
      var isSelected = btn.getAttribute('data-org-id') === orgId;
      if (isSelected) {
        btn.classList.add('active');
        if (!btn.querySelector('.ws-check-icon')) {
          btn.insertAdjacentHTML('beforeend', '<svg class="ws-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>');
        }
      } else {
        btn.classList.remove('active');
        var chk = btn.querySelector('.ws-check-icon');
        if (chk) chk.remove();
      }
    });

    this.setWsDropdownOpen(false);
    this.trigger('org-change', { orgId: orgId, organization: org });
  };

  OctenSidebar.prototype.on = function(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  };

  OctenSidebar.prototype.trigger = function(event, payload) {
    var listeners = this.eventListeners[event] || [];
    listeners.forEach(function(cb) {
      try {
        cb(payload);
      } catch (err) {
        console.error('[OctenSidebar] Event callback error:', err);
      }
    });
  };

  OctenSidebar.prototype.destroy = function() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
    if (this.container) {
      this.container.innerHTML = '';
    }
  };

  window.OctenSidebar = OctenSidebar;
})(window);
