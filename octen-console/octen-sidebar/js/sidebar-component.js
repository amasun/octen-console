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
    this.currentOrgId = (this.config.workspace && this.config.workspace.currentId) || 'octen-family';
    this.plan = options.plan || localStorage.getItem('octen-sidebar-plan') || 'a';
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

  OctenSidebar.prototype.renderNavItemHtml = function(item) {
    var isActive = item.id === this.activeRoute;
    var badgeHtml = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    var settingsArrow = item.id === 'settings' ? '<svg class="settings-nav-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '';
    var onclickAttr = (!item.external && item.id !== 'settings') ? `onclick="if(typeof go==='function'){go('${item.id}');return false;}"` : '';
    return `
      <a href="${item.href || '#'}" 
         class="nav-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''}" 
         data-route-id="${item.id}"
         ${item.external ? 'target="_blank" rel="noopener noreferrer"' : onclickAttr}>
        ${item.icon || ''}
        <span>${item.title}</span>
        ${badgeHtml}
        ${settingsArrow}
      </a>
    `;
  };

  OctenSidebar.prototype.render = function() {
    var brand = this.config.brand || {};
    var ws = this.config.workspace || { organizations: [] };
    var user = this.config.user || {};
    var currentOrg = ws.organizations.find(function(o) { return o.id === this.currentOrgId; }.bind(this)) || ws.organizations[0] || { name: 'Octen Family' };

    var html = `
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
          ${(this.config.navigation || []).map(function(section, secIdx) {
            var dividerClass = section.divider ? 'with-divider' : '';
            var isSearchSection = section.id === 'section-search';

            var planToggleHtml = isSearchSection
              ? `<div class="plan-toggle-badge" title="Switch Sidebar Plan">
                   <button type="button" class="plan-toggle-btn ${this.plan === 'a' ? 'active' : ''}" data-plan-btn="a" title="Plan A: Dual Bento Cards">A</button>
                   <button type="button" class="plan-toggle-btn ${this.plan === 'b' ? 'active' : ''}" data-plan-btn="b" title="Plan B: Structure Lines Hierarchy">B</button>
                 </div>`
              : '';

            var sectionTitleHtml = section.sectionTitle 
              ? `<div class="nav-section-title ${isSearchSection ? 'search-title-row' : ''}"><span>${section.sectionTitle}</span>${planToggleHtml}</div>` 
              : '';
            var groupHeaderHtml = section.group 
              ? `<div class="nav-section-label">${section.labelHtml || section.group}</div>` 
              : '';

            // 1. If section has explicit cards (e.g. Search: Fast & Premier)
            if (section.cards && section.cards.length > 0) {
              var secId = section.id || ('sec-' + secIdx);

              // Plan B: Tree Structure Lines Hierarchy (Reference image layout)
              if (this.plan === 'b' && isSearchSection) {
                var allSearchItems = [];
                section.cards.forEach(function(c) {
                  allSearchItems = allSearchItems.concat(c.items || []);
                });
                var isSearchActive = allSearchItems.some(function(item) {
                  return item.id === this.activeRoute;
                }.bind(this));

                var fastCard = section.cards.find(function(c) { return c.id === 'card-fast' || (c.title && c.title.toLowerCase().indexOf('fast') !== -1); }) || section.cards[0];
                var premierCard = section.cards.find(function(c) { return c.id === 'card-premier' || (c.title && c.title.toLowerCase().indexOf('premier') !== -1); }) || section.cards[1];

                var fastItems = fastCard ? (fastCard.items || []) : [];
                var premierItems = premierCard ? (premierCard.items || []) : [];

                var renderTreeItem = function(item, isLast) {
                  var isActive = item.id === this.activeRoute;
                  var badgeHtml = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
                  return `
                    <a href="${item.href || '#'}" 
                       class="search-tree-item ${isActive ? 'active' : ''} ${isLast ? 'is-last' : ''}" 
                       data-route-id="${item.id}"
                       onclick="if(typeof go==='function'){go('${item.id}');return false;}">
                      <span class="search-tree-item-text">${item.title}</span>
                      ${badgeHtml}
                    </a>
                  `;
                }.bind(this);

                var fastItemsHtml = fastItems.map(function(item) {
                  return renderTreeItem(item, false);
                }).join('');

                var premierItemsHtml = premierItems.map(function(item, idx) {
                  var isLast = idx === premierItems.length - 1;
                  return renderTreeItem(item, isLast);
                }).join('');

                return `
                  <div class="nav-section ${dividerClass}" id="${secId}">
                    ${sectionTitleHtml}
                    <div class="search-tree-wrapper">
                      <div class="search-tree-card" id="search-tree-parent-card">
                        <div class="search-tree-card-left">
                          <svg class="search-tree-grid-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <rect x="2" y="2" width="4.5" height="4.5" rx="1.2"/>
                            <rect x="9.5" y="2" width="4.5" height="4.5" rx="1.2"/>
                            <rect x="2" y="9.5" width="4.5" height="4.5" rx="1.2"/>
                            <rect x="9.5" y="9.5" width="4.5" height="4.5" rx="1.2"/>
                          </svg>
                          <span class="search-tree-card-title">Search</span>
                        </div>
                        <span class="search-tree-card-dot ${isSearchActive ? 'active' : ''}"></span>
                      </div>

                      <div class="search-tree-list">
                        <div class="search-tree-stem-top"></div>

                        <div class="search-tree-tier-row">
                          <span class="search-tree-tier-tag fast">FAST</span>
                        </div>
                        ${fastItemsHtml}

                        <div class="search-tree-tier-row">
                          <span class="search-tree-tier-tag premier">PREMIER</span>
                        </div>
                        ${premierItemsHtml}
                      </div>
                    </div>
                  </div>
                `;
              }

              // Plan A: Standard Dual Bento Cards
              var cardsHtml = section.cards.map(function(card) {
                var cardLabelHtml = card.title ? `<div class="nav-card-label">${card.title}</div>` : '';
                var cardItemsHtml = (card.items || []).map(function(item) {
                  return this.renderNavItemHtml(item);
                }.bind(this)).join('');
                return `
                  <div class="search-card" id="${card.id || ''}">
                    ${cardLabelHtml}
                    ${cardItemsHtml}
                  </div>
                `;
              }.bind(this)).join('');

              return `
                <div class="nav-section ${dividerClass}" id="${secId}">
                  ${sectionTitleHtml}
                  <div class="search-cards-container">
                    ${cardsHtml}
                  </div>
                </div>
              `;
            }

            // 2. Legacy / single card group
            if (section.card) {
              var cardLabel = groupHeaderHtml || (section.labelHtml ? `<div class="nav-card-label">${section.labelHtml}</div>` : '');
              var cardItems = (section.items || []).map(function(item) {
                return this.renderNavItemHtml(item);
              }.bind(this)).join('');
              return `
                ${sectionTitleHtml}
                <div class="nav-group search-card" id="${section.id || ('sec-' + secIdx)}">
                  ${cardLabel}
                  ${cardItems}
                </div>
              `;
            }

            // 3. Regular group or standalone items
            var regularItemsHtml = (section.items || []).map(function(item) {
              return this.renderNavItemHtml(item);
            }.bind(this)).join('');

            return `
              <div class="nav-section ${dividerClass}" id="${section.id || ('sec-' + secIdx)}">
                ${groupHeaderHtml}
                <div class="nav-items-list">
                  ${regularItemsHtml}
                </div>
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
            <div class="popover-theme-row" id="theme-switch-row">
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
              <div class="theme-segmented-group" id="theme-segmented-group">
                <button type="button" class="theme-segmented-btn" data-theme-btn="light" id="btn-theme-light" title="Light Theme">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                </button>
                <button type="button" class="theme-segmented-btn" data-theme-btn="dark" id="btn-theme-dark" title="Dark Theme">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
                <button type="button" class="theme-segmented-btn" data-theme-btn="system" id="btn-theme-system" title="Follow System">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </button>
              </div>
            </div>

            <!-- Sidebar Plan Switcher -->
            <div class="popover-plan-row" id="plan-switch-row">
              <div class="popover-theme-label">
                <svg class="popover-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                </svg>
                <span>Sidebar Plan</span>
              </div>
              <div class="theme-segmented-group" id="plan-segmented-group">
                <button type="button" class="plan-segmented-btn ${this.plan === 'a' ? 'active' : ''}" data-popover-plan-btn="a" title="Plan A (Dual Bento Cards)">
                  Plan A
                </button>
                <button type="button" class="plan-segmented-btn ${this.plan === 'b' ? 'active' : ''}" data-popover-plan-btn="b" title="Plan B (Structure Lines Hierarchy)">
                  Plan B
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

            <!-- DEV Controls (Payment & Postpaid) -->
            <div class="ws-divider"></div>
            <div class="popover-dev-group">
              <div class="popover-dev-title">[DEV] Payment</div>
              <div class="popover-dev-radios">
                <label class="popover-dev-label">
                  <input type="radio" name="dev-payment-radio" value="paid" onchange="if(typeof setPayment==='function')setPayment(true)" checked id="pay-radio-paid"/>
                  <span>Paid</span>
                </label>
                <label class="popover-dev-label">
                  <input type="radio" name="dev-payment-radio" value="unpaid" onchange="if(typeof setPayment==='function')setPayment(false)" id="pay-radio-unpaid"/>
                  <span>Unpaid</span>
                </label>
              </div>
            </div>

            <div class="popover-dev-group">
              <div class="popover-dev-title">[DEV] Postpaid</div>
              <div class="popover-dev-radios-col">
                <label class="popover-dev-label">
                  <input type="radio" name="dev-postpaid-radio" value="firstMonth" onchange="if(typeof setPostpaidStatus==='function')setPostpaidStatus(this.value)"/>
                  <span>Real data</span>
                </label>
                <label class="popover-dev-label">
                  <input type="radio" name="dev-postpaid-radio" value="prepaid" onchange="if(typeof setBillingMode==='function')setBillingMode('prepaid')"/>
                  <span>Off (prepaid)</span>
                </label>
                <label class="popover-dev-label">
                  <input type="radio" name="dev-postpaid-radio" value="normal" checked onchange="if(typeof setPostpaidStatus==='function')setPostpaidStatus(this.value)"/>
                  <span>Active</span>
                </label>
                <label class="popover-dev-label">
                  <input type="radio" name="dev-postpaid-radio" value="warn80" onchange="if(typeof setPostpaidStatus==='function')setPostpaidStatus(this.value)"/>
                  <span>Due in 3d</span>
                </label>
                <label class="popover-dev-label">
                  <input type="radio" name="dev-postpaid-radio" value="overdue" onchange="if(typeof setPostpaidStatus==='function')setPostpaidStatus(this.value)"/>
                  <span>Overdue 4d</span>
                </label>
                <label class="popover-dev-label">
                  <input type="radio" name="dev-postpaid-radio" value="suspended" onchange="if(typeof setPostpaidStatus==='function')setPostpaidStatus(this.value)"/>
                  <span>Suspended 18d</span>
                </label>
              </div>
            </div>

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
    `;

    if (this.container.tagName === 'ASIDE') {
      this.container.classList.add('octen-sidebar');
      this.container.innerHTML = html;
    } else {
      this.container.innerHTML = `<aside class="octen-sidebar" id="octen-sidebar-root">${html}</aside>`;
    }

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
          if (routeId === 'settings') {
            e.preventDefault();
            self.showSettingsMenu();
            self.trigger('route-select', { routeId: routeId, isExternal: false });
            return;
          }
          if (!isExternal) {
          e.preventDefault();
          self.setActiveRoute(routeId);
        }
        self.trigger('route-select', { routeId: routeId, isExternal: isExternal });
      });
    });

    // Plan B Search Tree Item Click
    this.container.querySelectorAll('.search-tree-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        var routeId = item.getAttribute('data-route-id');
        if (routeId) {
          e.preventDefault();
          self.setActiveRoute(routeId);
          self.trigger('route-select', { routeId: routeId, isExternal: false });
        }
      });
    });

    // Plan Switchers (Search header toggle + popover segmented buttons)
    this.container.querySelectorAll('[data-plan-btn]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var plan = btn.getAttribute('data-plan-btn');
        self.setPlan(plan);
      });
    });

    this.container.querySelectorAll('[data-popover-plan-btn]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var plan = btn.getAttribute('data-popover-plan-btn');
        self.setPlan(plan);
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

  OctenSidebar.prototype.setPlan = function(plan) {
    if (plan !== 'a' && plan !== 'b') return;
    this.plan = plan;
    try {
      localStorage.setItem('octen-sidebar-plan', plan);
    } catch(e) {}
    this.render();
    this.bindEvents();
    this.setActiveRoute(this.activeRoute);
    this.trigger('plan-change', { plan: plan });
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
    if (!this.container) return;

    this.container.querySelectorAll('.nav-item').forEach(function(item) {
      if (item.getAttribute('data-route-id') === routeId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    this.container.querySelectorAll('.search-tree-item').forEach(function(item) {
      if (item.getAttribute('data-route-id') === routeId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    var isSearchRoute = ['web-search', 'broad-search-api', 'image-search', 'video-search', 'news-search', 'business-search', 'place-search'].indexOf(routeId) !== -1;
    var dot = this.container.querySelector('.search-tree-card-dot');
    if (dot) {
      if (isSearchRoute) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    }
  };

  OctenSidebar.prototype.showSettingsMenu = function() {
    var nav = this.container.querySelector('.sidebar-nav');
    var header = this.container.querySelector('.sidebar-header');
    var footer = this.container.querySelector('.sidebar-footer');
    if (!nav) return;
    // Keep the brand and workspace label visible while entering the submenu.
    if (footer) footer.classList.add('settings-hidden');
    nav.classList.add('settings-subnav');
    nav.classList.remove('settings-return');
    void nav.offsetWidth;
    nav.classList.add('settings-enter');
    var management = this.config.settingsNavigation || (this.config.navigation || []).find(function(group) { return group.group === 'MANAGEMENT'; });
    var managementItems = management ? management.items.filter(function(item) { return item.id !== 'settings'; }) : [];
    nav.innerHTML = '<button type="button" class="settings-back" data-settings-back><span aria-hidden="true">‹</span><strong>Settings</strong></button>' +
      '<div class="settings-items">' +
      managementItems.map(function(item, index) {
        return '<button type="button" class="settings-item '+(index === 0 ? 'active' : '')+'" data-settings-route="'+item.id+'">'+(item.icon || '')+'<span>'+item.title+'</span></button>';
      }).join('') + '</div>';
    var self = this;
    nav.querySelector('[data-settings-back]').addEventListener('click', function() { self.restorePrimaryMenu(); });
    nav.querySelectorAll('.settings-item').forEach(function(item) {
      item.addEventListener('click', function() {
        nav.querySelectorAll('.settings-item').forEach(function(other) { other.classList.remove('active'); });
        item.classList.add('active');
        var routeId = item.getAttribute('data-settings-route');
        self.trigger('route-select', { routeId: routeId, isExternal: false });
      });
    });
  };

  OctenSidebar.prototype.restorePrimaryMenu = function() {
    var header = this.container.querySelector('.sidebar-header');
    var footer = this.container.querySelector('.sidebar-footer');
    if (header) header.classList.remove('settings-hidden');
    if (footer) footer.classList.remove('settings-hidden');
    this.render();
    this.bindEvents();
    var nav = this.container.querySelector('.sidebar-nav');
    if (nav) {
      nav.classList.remove('settings-enter');
      void nav.offsetWidth;
      nav.classList.add('settings-return');
    }
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
