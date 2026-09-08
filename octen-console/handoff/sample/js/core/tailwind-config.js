tailwind.config = {
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
        },
        colors: {
          // --- 核心品牌色 Brand Tokens (严格遵循 theme-color.html) ---
          primary: {
            DEFAULT: 'var(--primary)',
            lite: 'var(--primary-lite)',
            dark: 'var(--primary-dark)',
            bright: 'var(--primary-bright)',
            muted: 'var(--primary-muted)',
            'tint-soft': 'var(--primary-tint-soft)',
          },

          // --- 背景与表面 Background & Surfaces ---
          shell: 'var(--shell)',
          background: {
            DEFAULT: 'var(--background)',
            inverse: 'var(--background-inverse)',
          },
          surface: {
            DEFAULT: 'var(--surface)',
            subtle: 'var(--surface-subtle)',
            muted: 'var(--surface-muted)',
            strong: 'var(--surface-strong)',
            inverse: 'var(--surface-inverse)',
          },
          card: 'var(--card)',
          popover: 'var(--popover)',

          // --- 前景与文字 Foregrounds ---
          foreground: {
            DEFAULT: 'var(--foreground)',
            inverse: 'var(--foreground-inverse)',
          },
          fg: {
            strong: 'var(--fg-strong)',
            body: 'var(--fg-body)',
            secondary: 'var(--fg-secondary)',
            tertiary: 'var(--fg-tertiary)',
            muted: 'var(--fg-muted)',
            faint: 'var(--fg-faint)',
          },

          // --- 边框与线条 Borders & Lines ---
          border: 'var(--border)',
          line: {
            DEFAULT: 'var(--line)',
            subtle: 'var(--line-subtle)',
          },
          input: 'var(--input)',
          ring: 'var(--ring)',
          'panel-border': 'var(--panel-border)',
          'neutral-border': 'var(--neutral-border)',

          // --- 中性色 Neutrals ---
          neutral: {
            50: 'var(--neutral-50)',
            100: 'var(--neutral-100)',
            200: 'var(--neutral-200)',
            300: 'var(--neutral-300)',
            muted: 'var(--neutral-muted)',
            foreground: 'var(--neutral-foreground)',
            overlay: 'var(--neutral-overlay)',
          },

          // --- 状态语义色 Status ---
          success: {
            DEFAULT: 'var(--success)',
            surface: 'var(--success-surface)',
            border: 'var(--success-border)',
            muted: 'var(--success-muted)',
            foreground: 'var(--success-foreground)',
            heavy: 'var(--success-heavy)',
          },
          warning: {
            DEFAULT: 'var(--warning)',
            surface: 'var(--warning-surface)',
            border: 'var(--warning-border)',
            muted: 'var(--warning-muted)',
            foreground: 'var(--warning-foreground)',
            heavy: 'var(--warning-heavy)',
          },
          danger: {
            DEFAULT: 'var(--danger)',
            surface: 'var(--danger-surface)',
            border: 'var(--danger-border)',
            muted: 'var(--danger-muted)',
            foreground: 'var(--danger-foreground)',
            heavy: 'var(--danger-heavy)',
          },
          info: {
            DEFAULT: 'var(--info)',
            surface: 'var(--info-surface)',
            border: 'var(--info-border)',
            muted: 'var(--info-muted)',
            foreground: 'var(--info-foreground)',
            heavy: 'var(--info-heavy)',
          },

          // --- 强调色 Accents ---
          accent: {
            green: 'var(--accent-green)',
            teal: 'var(--accent-teal)',
            cyan: 'var(--accent-cyan)',
            sky: 'var(--accent-sky)',
            indigo: 'var(--accent-indigo)',
            violet: 'var(--accent-violet)',
            pink: 'var(--accent-pink)',
            rose: 'var(--accent-rose)',
            orange: 'var(--accent-orange)',
            yellow: 'var(--accent-yellow)',
            lime: 'var(--accent-lime)',
          },

          // --- 图表色 Charts ---
          chart: {
            'broad-search': 'var(--chart-broad-search)',
            'search-calls': 'var(--chart-search-calls)',
            'content-tokens': 'var(--chart-content-tokens)',
            'chat-tokens': 'var(--chart-chat-tokens)',
            embeddings: 'var(--chart-embeddings)',
            'vl-embeddings': 'var(--chart-vl-embeddings)',
            extract: 'var(--chart-extract)',
            application: 'var(--chart-application)',
            'image-search': 'var(--chart-image-search)',
            'video-search': 'var(--chart-video-search)',
            model: 'var(--chart-model)',
            collect: 'var(--chart-collect)',
            total: 'var(--chart-total)',
            grid: 'var(--chart-grid)',
            axis: 'var(--chart-axis)',
            cursor: 'var(--chart-cursor)',
            'tooltip-bg': 'var(--chart-tooltip-bg)',
            'tooltip-border': 'var(--chart-tooltip-border)',
            'tooltip-label': 'var(--chart-tooltip-label)',
          },

          // --- 原有向后兼容映射 (Backward Compatibility) ---
          slate: {
            50: 'var(--trans-faint-10)',
            100: 'var(--color-base-10)',
            200: 'var(--color-base-20)',
            300: 'var(--color-base-30)',
            400: 'var(--color-base-40)',
            500: 'var(--color-base-50)',
            600: 'var(--color-base-60)',
            700: 'var(--color-base-70)',
            800: 'var(--color-base-80)',
            900: 'var(--color-base-90)',
            950: 'var(--color-base-100)',
          },
          white: 'var(--background-secondary)',
          black: 'var(--text-normal)',
          blue: {
            50: 'var(--trans-faint-10)',
            100: 'var(--color-accent-1)',
            500: 'var(--color-accent)',
            600: 'var(--color-accent)',
            700: 'var(--color-accent)',
          },
          green: {
            50: 'var(--trans-faint-10)',
            500: 'var(--color-green)',
            600: 'var(--color-green)',
            700: 'var(--color-green)',
          },
          red: {
            50: 'var(--trans-faint-10)',
            500: 'var(--color-red)',
            600: 'var(--color-red)',
            700: 'var(--color-red)',
          },
          purple: {
            50: 'var(--trans-faint-10)',
            500: 'var(--color-purple)',
            600: 'var(--color-purple)',
            700: 'var(--color-purple)',
          }
        }
      }
    }
  };
