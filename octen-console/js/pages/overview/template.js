// Overview page template.
(function () {
  var ICONS = {
    pulse: '<svg class="h-5 w-5 text-[var(--fg-strong,#0a0a0a)] shrink-0" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M11.9355 3C12.0204 2.75952 12.021 2.49735 11.9373 2.25646C11.8537 2.01557 11.6906 1.81026 11.4749 1.67418C11.2593 1.5381 11.0038 1.47933 10.7503 1.50751C10.4969 1.53568 10.2605 1.64913 10.08 1.82925L3.33 8.57925C3.17261 8.73654 3.0654 8.93697 3.02192 9.1552C2.97845 9.37342 3.00066 9.59964 3.08576 9.80524C3.17086 10.0108 3.31501 10.1866 3.5 10.3103C3.68498 10.4339 3.90249 10.5 4.125 10.5H7.1265C7.18641 10.5001 7.24542 10.5145 7.29861 10.5421C7.3518 10.5696 7.3976 10.6096 7.43219 10.6585C7.46678 10.7074 7.48915 10.7639 7.49743 10.8232C7.5057 10.8825 7.49964 10.943 7.47975 10.9995L6.0645 15C5.97961 15.2406 5.97899 15.5028 6.06276 15.7438C6.14652 15.9847 6.3097 16.1901 6.5255 16.3261C6.74131 16.4621 6.99695 16.5208 7.25047 16.4924C7.50399 16.464 7.74034 16.3504 7.92075 16.17L14.6708 9.42C14.8279 9.26263 14.9349 9.06219 14.9782 8.84402C15.0215 8.62585 14.9992 8.39974 14.914 8.19427C14.8289 7.98879 14.6847 7.81317 14.4998 7.6896C14.3148 7.56603 14.0974 7.50005 13.875 7.5H10.8773C10.8172 7.50009 10.758 7.48574 10.7046 7.45818C10.6513 7.43062 10.6053 7.39064 10.5706 7.34162C10.5359 7.29259 10.5135 7.23595 10.5053 7.17646C10.497 7.11696 10.5032 7.05636 10.5233 6.99975L11.9355 3Z"/>' +
    '</svg>',
    newsSearch: '<svg class="h-5 w-5 text-[var(--fg-strong,#0a0a0a)] shrink-0" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M11.25 13.5H7.5M13.5 10.5H7.5M3 16.5H15C15.3978 16.5 15.7794 16.342 16.0607 16.0607C16.342 15.7794 16.5 15.3978 16.5 15V3C16.5 2.60218 16.342 2.22064 16.0607 1.93934C15.7794 1.65804 15.3978 1.5 15 1.5H6C5.60217 1.5 5.22064 1.65804 4.93934 1.93934C4.65803 2.22064 4.5 2.60218 4.5 3V15C4.5 15.3978 4.34196 15.7794 4.06066 16.0607C3.77936 16.342 3.39782 16.5 3 16.5ZM3 16.5C2.60218 16.5 2.22064 16.342 1.93934 16.0607C1.65804 15.7794 1.5 15.3978 1.5 15V8.25C1.5 7.85217 1.65804 7.47064 1.93934 7.18934C2.22064 6.90804 2.60218 6.75 3 6.75H4.5"/>' +
      '<path d="M12.75 4.5H8.25C7.83579 4.5 7.5 4.83579 7.5 5.25V6.75C7.5 7.16421 7.83579 7.5 8.25 7.5H12.75C13.1642 7.5 13.5 7.16421 13.5 6.75V5.25C13.5 4.83579 13.1642 4.5 12.75 4.5Z"/>' +
    '</svg>',
    search: '<svg class="h-5 w-5 text-[var(--fg-strong,#0a0a0a)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M20.9999 12C20.9999 10.22 20.4721 8.47991 19.4832 6.99987C18.4942 5.51983 17.0886 4.36628 15.4441 3.68509C13.7996 3.0039 11.99 2.82567 10.2441 3.17294C8.4983 3.5202 6.89465 4.37737 5.63598 5.63604C4.37731 6.89472 3.52014 8.49836 3.17288 10.2442C2.82561 11.99 3.00384 13.7996 3.68503 15.4442C4.36622 17.0887 5.51977 18.4943 6.99981 19.4832C8.47985 20.4722 10.2199 21 11.9999 21M3.59994 9H20.3999M3.59994 15H11.4999"/>' +
      '<path d="M11.5 3C9.81532 5.69961 8.92218 8.81787 8.92218 12C8.92218 15.1821 9.81532 18.3004 11.5 21M12.5 3C14.1165 5.59006 15.0056 8.56766 15.074 11.62M20.2 20.2L22 22"/>' +
      '<path d="M15 18C15 18.7956 15.316 19.5587 15.8787 20.1213C16.4413 20.6839 17.2043 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2043 15 16.4413 15.3161 15.8787 15.8787C15.316 16.4413 15 17.2044 15 18Z"/>' +
    '</svg>',
    models: '<svg class="h-5 w-5 text-[var(--fg-strong,#0a0a0a)] shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M9.99935 1.66675L13.541 3.75008L17.0827 5.83341V14.1667L13.541 16.2501L9.99935 18.3334L6.45768 16.2501L2.91602 14.1667V5.83341L6.45768 3.75008L9.99935 1.66675ZM2.91602 5.83341L17.0827 14.1667M2.91602 14.1667L17.0827 5.83341M9.99935 18.3334V1.66675"/>' +
    '</svg>',
    tools: '<svg class="h-5 w-5 text-[var(--fg-strong,#0a0a0a)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>' +
    '</svg>',
    application: '<svg class="h-5 w-5 text-[var(--fg-strong,#0a0a0a)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect width="7" height="7" x="3" y="3" rx="1"/>' +
      '<rect width="7" height="7" x="14" y="3" rx="1"/>' +
      '<rect width="7" height="7" x="14" y="14" rx="1"/>' +
      '<rect width="7" height="7" x="3" y="14" rx="1"/>' +
    '</svg>'
  };

  var GRID_MAP = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 xl:grid-cols-4'
  };

  function esc(s) { return String(s).replace(/'/g, "\\'"); }

  function renderCard(c) {
    var attrs = c.url
      ? (' href="' + c.url + '" target="_blank" rel="noreferrer"')
      : (' href="#" onclick="' + (c.go ? ("go('" + esc(c.go) + "')") : ("openRequestAccess('" + esc(c.req || c.title) + "')")) + ';return false;"');

    var badgeHtml = '';
    if (c.badge === 'New') {
      badgeHtml = '<span class="shrink-0 rounded-[4px] px-1.5 py-0.5 text-xs leading-4 whitespace-nowrap capability-badge-new">New</span>';
    } else if (c.badge === 'Early Access') {
      badgeHtml = '<span class="shrink-0 rounded-[4px] px-1.5 py-0.5 text-xs leading-4 whitespace-nowrap capability-badge-early-access">Early Access</span>';
    } else if (c.badge === 'Docs') {
      badgeHtml = '<span class="shrink-0 rounded-[4px] px-1.5 py-0.5 text-xs leading-4 whitespace-nowrap capability-badge-docs">Docs</span>';
    }

    var bestForHtml = '';
    if (c.bestFor && c.bestFor.length) {
      bestForHtml = '<div class="mt-auto border-t border-[var(--line-subtle,#efefec)] pt-3">' +
        '<p class="text-xs tracking-wider uppercase text-[var(--fg-faint,#a3a3a3)] font-medium">Best for</p>' +
        '<div class="mt-2 flex flex-wrap gap-1.5">' +
        c.bestFor.map(function (item) {
          return '<span class="rounded-[4px] border border-[var(--line,#e5e5e5)] bg-[var(--surface-sunken,#f5f5f3)] px-2 py-0.5 text-xs whitespace-nowrap text-[var(--fg-secondary,#525252)]">' + item + '</span>';
        }).join('') +
        '</div></div>';
    }

    return '<a' + attrs + ' class="capability-card flex flex-col rounded-xl border border-[var(--line-subtle,#efefec)] bg-[var(--surface,#ffffff)] p-4 transition-colors">' +
      '<div class="flex flex-row items-center gap-2">' +
        '<h3 class="font-sans text-base font-semibold text-[var(--fg-strong,#0a0a0a)] whitespace-nowrap">' + c.title + '</h3>' +
        badgeHtml +
      '</div>' +
      '<p class="mt-1.5 mb-4 text-sm text-[var(--fg-muted,#737373)] leading-relaxed">' + c.description + '</p>' +
      bestForHtml +
    '</a>';
  }

  function renderPanel(p) {
    var violetCls = (p.accent === 'violet') ? ' capability-panel-violet' : '';

    // Multi-tier panel (e.g. Search containing Pulse, FAST, Premier in one card)
    if (p.tiers && p.tiers.length > 0) {
      return '<section class="capability-panel' + violetCls + '">' +
        '<div class="glow-dots"></div>' +
        '<div class="relative flex flex-col gap-6">' +
          p.tiers.map(function (t) {
            var gridCls = GRID_MAP[t.columns] || 'grid-cols-1';
            var tierLabel = typeof t.tier === 'string' ? t.tier : (t.tier && t.tier.label);
            var tierHtml = '';
            if (tierLabel) {
              tierHtml = '<span class="subtier-badge">' + tierLabel + '</span>';
            }
            var iconHtml = (t.icon && ICONS[t.icon]) ? ICONS[t.icon] : ICONS[p.icon];
            return '<div class="capability-tier-group flex flex-col gap-2.5">' +
              '<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1.5 pt-0.5 pb-1">' +
                '<div class="flex items-center gap-2">' +
                  iconHtml +
                  '<h3 class="font-sans text-base font-semibold text-[var(--fg-strong,#0a0a0a)] flex items-center gap-1.5">' +
                    '<span>' + p.name + '</span>' +
                    tierHtml +
                  '</h3>' +
                '</div>' +
                (t.tagline ? '<p class="text-sm text-[var(--fg-muted,#737373)]">' + t.tagline + '</p>' : '') +
              '</div>' +
              '<div class="grid gap-3 ' + gridCls + '">' +
                t.cards.map(renderCard).join('') +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</section>';
    }

    // Standard single-tier panel
    var tierLabel = typeof p.tier === 'string' ? p.tier : (p.tier && p.tier.label);
    var tierHtml = '';
    if (tierLabel) {
      tierHtml = '<span class="subtier-badge">' + tierLabel + '</span>';
    }
    var gridCls = GRID_MAP[p.columns] || 'grid-cols-1';

    return '<section class="capability-panel' + violetCls + '">' +
      '<div class="glow-dots"></div>' +
      '<div class="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1.5 pt-0.5 pb-3">' +
        '<div class="flex items-center gap-2">' +
          ICONS[p.icon] +
          '<h3 class="font-sans text-base font-semibold text-[var(--fg-strong,#0a0a0a)] flex items-center gap-1.5">' +
            '<span>' + p.name + '</span>' +
            tierHtml +
          '</h3>' +
        '</div>' +
        (p.tagline ? '<p class="text-sm text-[var(--fg-muted,#737373)]">' + p.tagline + '</p>' : '') +
      '</div>' +
      '<div class="relative grid gap-3 ' + gridCls + '">' +
        p.cards.map(renderCard).join('') +
      '</div>' +
    '</section>';
  }

  var CAPABILITY_PANELS = [
    {
      name: 'Search',
      icon: 'search',
      tiers: [
        {
          tier: 'PULSE',
          icon: 'pulse',
          tagline: 'Fastest, lowest-cost retrieval for common lookups.',
          columns: 1,
          cards: [
            {
              title: 'Pulse Search',
              badge: 'New',
              go: 'pulse-search',
              description: 'Maps a query straight to the most relevant URLs. Fastest and lowest-cost search.',
              bestFor: ['Navigation', 'Entity lookup', 'Official sites', 'Docs lookup']
            }
          ]
        },
        {
          tier: 'FAST',
          icon: 'search',
          tagline: 'Low-latency retrieval from the live web.',
          columns: 4,
          cards: [
            {
              title: 'Web Search',
              go: 'web-search',
              description: 'LLM-native search with ranked results, highlights, and optional full content.',
              bestFor: ['LLM tool calls', 'RAG', 'Agents', 'Fact-checking']
            },
            {
              title: 'Broad Search',
              go: 'broad-search-api',
              description: 'Auto-decomposes one query into parallel subqueries.',
              bestFor: ['Research agents', 'Deep questions', 'Comprehensive lookup']
            },
            {
              title: 'Image Search',
              go: 'image-search',
              description: 'Open-web image retrieval by text or reference image.',
              bestFor: ['Design refs', 'Asset lookup', 'Content creation']
            },
            {
              title: 'Video Search',
              badge: 'Early Access',
              go: 'video-search',
              description: 'Video retrieval across the open web.',
              bestFor: ['Media discovery', 'Tutorials', 'Reference footage']
            }
          ]
        },
        {
          tier: 'PREMIER',
          icon: 'newsSearch',
          tagline: 'Specialized retrieval across verticals.',
          columns: 3,
          cards: [
            {
              title: 'News Search',
              badge: 'New',
              go: 'news-search',
              description: 'Real-time news, grouped by subject',
              bestFor: ['Monitoring', 'Trend tracking', 'Breaking events']
            },
            {
              title: 'Business Search',
              badge: 'New',
              req: 'Business Search',
              description: 'Company and people search, as structured profiles.',
              bestFor: ['Company profiles', 'People research', 'Competitive analysis']
            },
            {
              title: 'Place Search',
              badge: 'New',
              req: 'Place Search',
              description: 'Local places with ratings, hours, and reviews, plus web context.',
              bestFor: ['Local discovery', 'Travel planning', 'Location-aware agents']
            }
          ]
        }
      ]
    },
    {
      name: 'Models',
      icon: 'models',
      tagline: 'Model access and top-ranked embeddings.',
      columns: 3,
      cards: [
        {
          title: 'Model Gateway',
          go: 'model-gateway',
          description: 'One API to call any LLM, with unified billing.',
          bestFor: ['AI agents', 'Chatbots', 'Content generation', 'Multimodal apps']
        },
        {
          title: 'Embedding',
          badge: 'Docs',
          url: 'https://docs.octen.ai/api-reference/embedding',
          description: 'Text embeddings for retrieval, similarity, and ranking.',
          bestFor: ['Semantic search', 'RAG', 'Ranking', 'Recommendations']
        },
        {
          title: 'VL Embedding',
          badge: 'Docs',
          url: 'https://docs.octen.ai/api-reference/vl-embedding',
          description: 'One vector space across text, images, video, and documents.',
          bestFor: ['Cross-modal search', 'Image retrieval', 'Multimodal RAG']
        }
      ]
    },
    {
      name: 'Tools',
      icon: 'tools',
      tagline: 'Clean content from any URL.',
      columns: 1,
      cards: [
        {
          title: 'Extract',
          go: 'extract',
          description: 'Clean Markdown, highlights, and page classification from any URL.',
          bestFor: ['RAG ingestion', 'Content monitoring', 'Data pipelines', 'Page classification']
        }
      ]
    },
    {
      name: 'Application',
      icon: 'application',
      tagline: 'Complete workflows built on the APIs above.',
      columns: 4,
      cards: [
        {
          title: 'Answer',
          go: 'answer',
          description: 'Grounded answer synthesis with inline citations.',
          bestFor: ['Support bots', 'Knowledge Q&A', 'Help center']
        },
        {
          title: 'Deep Research',
          go: 'deep-research',
          description: 'Source-backed research across thousands of pages.',
          bestFor: ['Reports', 'Market analysis', 'Due diligence']
        },
        {
          title: 'Multimodal Chat',
          badge: 'Early Access',
          req: 'Multimodal Chat',
          description: 'Analyze, search, and chat across text, images, and video.',
          bestFor: ['Doc chat', 'Video understanding', 'Visual Q&A']
        },
        {
          title: 'Grounded Generation',
          badge: 'Early Access',
          req: 'Grounded Generation',
          description: 'Images and videos grounded in real-world references.',
          bestFor: ['Cited images', 'Marketing assets', 'Illustrations']
        }
      ]
    }
  ];

  var matrixHtml = '<div class="capability-panels mb-8">' + CAPABILITY_PANELS.map(renderPanel).join('') + '</div>';

  registerPage("page-overview", `<div id="page-overview" class="page active pl-0 pr-[10px] py-[10px] h-full min-h-0 overflow-hidden">
<div class="layout-pane w-full h-full overflow-y-auto relative min-h-0">
  <div class="max-w-[1400px] w-full mx-auto px-6 py-6 md:px-10 md:py-8">

  <!-- Header -->
  <div class="mb-6 flex items-center justify-between gap-6">
    <h1 id="ov-welcome-title" class="text-[#0a0a0a] text-2xl font-semibold">Welcome, Jane Niu</h1>

    <!-- API Key widget -->
    <div class="bg-white border border-[#e7e7e7] rounded-xl flex items-stretch shrink-0 overflow-hidden shadow-sm">
      <div class="flex items-center gap-3 px-4 py-3">
        <svg class="w-3.5 h-3.5 shrink-0" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
        <span class="text-xs text-[#a3a3a3] font-medium">API Key</span>
        <div id="ov-key-display" class="bg-[#f5f5f5] rounded-md px-3 py-1 flex items-center gap-2 border border-[#f5f5f5]">
          <code id="ov-key-val" class="text-xs text-[#737373] font-mono whitespace-nowrap">sk_live_1234••••••••••wxyz</code>
          <button id="ov-key-eye" onclick="toggleOvKeyVis()" class="p-0.5 hover:bg-[#e5e5e5] rounded text-[#a3a3a3] transition-colors">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
          <button onclick="copyOvKey()" class="p-0.5 hover:bg-[#e5e5e5] rounded text-[#a3a3a3] transition-colors">
            <svg id="ov-copy-icon" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>
        </div>
      </div>
      <div class="w-px bg-[#f5f5f5] my-2"></div>
      <a href="#" class="flex items-center gap-2 px-4 hover:bg-[#f5f5f5] transition-colors group">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span class="text-xs text-[#a3a3a3] group-hover:text-[#737373] transition-colors">Operational →</span>
      </a>
    </div>
  </div>

  <!-- Payment Banner (role-aware in org mode) -->
  <div id="ov-payment-banner"></div>

  <!-- Product Matrix (from ov-matrix) -->
  ${matrixHtml}

  <!-- Getting Started -->
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[16px] text-[#000] font-semibold">Getting Started</h2>
      <a href="https://docs.octen.ai/introduction/getting-started/quickstart" target="_blank" rel="noreferrer" class="text-xs font-medium hover:opacity-75 transition-opacity" style="color:#039855">Quickstart guide →</a>
    </div>
    <div class="grid md:grid-cols-3 gap-4">
      <div class="ov-card group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">01</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Get your API key</p><p class="text-xs text-[#737373] leading-relaxed">One API key for all Octen APIs.</p></div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <a href="#" onclick="go('api-keys');return false" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Manage API keys <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="ov-card group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">02</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Make your first call</p><p class="text-xs text-[#737373] leading-relaxed">Fast, structured responses via API, SDK, or the CLI.</p></div>
        <div class="flex flex-row flex-nowrap items-center gap-4 pt-2 border-t border-[#f5f5f5]">
          <a href="https://docs.octen.ai/api-reference/search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">API &amp; SDKs <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/integrations/octen-cli" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">CLI <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="ov-card group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">03</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Integrate into your app</p><p class="text-xs text-[#737373] leading-relaxed">Use as an LLM tool or skill, or integrate into RAG pipelines.</p></div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/connect-llms-to-octen-search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Integration guide <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
    </div>

    <!-- Built with MCP & Skills -->
    <div class="ov-card mt-4 bg-white border border-[#e7e7e7] rounded-xl p-6 grid lg:grid-cols-2 gap-6 hover:shadow-md transition-all">
      <!-- Left: intro -->
      <div class="min-w-0">
        <p class="text-[#0a0a0a] font-semibold mb-2">Built with MCP &amp; Skills</p>
        <p class="text-xs text-[#737373] leading-relaxed">Connect once, and your agent gets Search, Extract, and every tool we ship next — native to Claude Desktop, Cursor, VS Code, and any MCP client.</p>
      </div>
      <!-- Right: tabs + install + actions -->
      <div class="min-w-0 lg:border-l lg:border-[#e7e7e7] lg:pl-6">
        <!-- Tabs -->
        <div class="flex items-center gap-1 mb-3 border-b border-[#e7e7e7]">
          <button data-mcps-tab="mcp" class="mcps-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors" style="color:#039855;border-color:#039855">MCP</button>
          <button data-mcps-tab="skills" class="mcps-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-[#737373] border-transparent hover:text-[#737373]">Skills</button>
        </div>
        <!-- MCP panel -->
        <div data-mcps-panel="mcp" class="mcps-panel">
          <div class="flex items-center gap-2 flex-wrap">
            <select id="mcps-client" onchange="mcpsSetClient(this.value)" class="shrink-0 bg-white border border-[#e7e7e7] rounded-lg px-3 py-2 text-xs font-medium text-[#737373] cursor-pointer">
              <option value="claude-code">Claude Code</option>
              <option value="claude-desktop">Claude Desktop</option>
              <option value="cursor">Cursor</option>
              <option value="vscode">VS Code</option>
            </select>
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-[#f5f5f5] border border-[#e7e7e7] rounded-lg px-3 py-2 font-mono text-xs text-[#0a0a0a]">
              <span id="mcps-cmd-mcp" class="truncate">claude mcp add --scope user octen -- npx -y octen-mcp</span>
              <button onclick="navigator.clipboard.writeText(document.getElementById('mcps-cmd-mcp').textContent)" class="text-[#a3a3a3] hover:text-[#737373] shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team/octen-mcp" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-mcp-server" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">Docs</a>
          </div>
        </div>
        <!-- Skills panel -->
        <div data-mcps-panel="skills" class="mcps-panel hidden">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-[#f5f5f5] border border-[#e7e7e7] rounded-lg px-3 py-2 font-mono text-xs text-[#0a0a0a]">
              <span>git clone https://github.com/Octen-Team/web-search-skills</span>
              <button onclick="navigator.clipboard.writeText('git clone https://github.com/Octen-Team/web-search-skills')" class="text-[#a3a3a3] hover:text-[#737373] shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-skills" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">Docs</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</div>
</div>
`);
})();
