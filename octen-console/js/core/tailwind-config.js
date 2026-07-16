tailwind.config = {
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
      extend: {
        colors: {
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
  }
