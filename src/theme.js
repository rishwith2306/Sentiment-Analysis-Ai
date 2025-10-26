/**
 * Design System Theme Configuration
 * EchoJournal-inspired color palette and design tokens
 */

export const theme = {
  colors: {
    // Primary gradients
    primary: {
      peach: '#FFB4A2',
      orange: '#FF8B7B',
      coral: '#E87461',
      gradient: 'linear-gradient(135deg, #FFB4A2 0%, #FF8B7B 100%)',
    },
    
    // Secondary gradients
    secondary: {
      lavender: '#E5DEFF',
      purple: '#C7B8FF',
      violet: '#A89FD9',
      gradient: 'linear-gradient(135deg, #E5DEFF 0%, #C7B8FF 100%)',
    },
    
    // Background colors
    background: {
      cream: '#FFF8F3',
      white: '#FFFFFF',
      lightPeach: '#FFF5F1',
      lightLavender: '#F8F6FF',
      gradient: 'linear-gradient(180deg, #FFF8F3 0%, #FFF5F1 50%, #F8F6FF 100%)',
      glowPeach: 'radial-gradient(circle at 20% 20%, rgba(255, 180, 162, 0.3) 0%, transparent 50%)',
      glowLavender: 'radial-gradient(circle at 80% 80%, rgba(199, 184, 255, 0.3) 0%, transparent 50%)',
    },
    
    // Text colors
    text: {
      primary: '#2D2D2D',
      secondary: '#5A5A5A',
      muted: '#999999',
      light: '#B8B8B8',
      white: '#FFFFFF',
    },
    
    // Glass effect colors
    glass: {
      white: 'rgba(255, 255, 255, 0.7)',
      whiteHover: 'rgba(255, 255, 255, 0.85)',
      border: 'rgba(255, 255, 255, 0.3)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      shadowLarge: '0 16px 64px rgba(0, 0, 0, 0.12)',
    },
    
    // Mood colors for sentiment analysis
    mood: {
      joy: '#FFD93D',
      peace: '#6BCF7F',
      love: '#FF6B9D',
      anxiety: '#FF8B7B',
      sadness: '#7B9BFF',
      neutral: '#C7B8FF',
    },
  },
  
  typography: {
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
    },
    
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '0.5rem',      // 8px
    sm: '0.75rem',     // 12px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '2.5rem',   // 40px
    '3xl': '3rem',     // 48px
    '4xl': '4rem',     // 64px
    '5xl': '5rem',     // 80px
    '6xl': '6rem',     // 96px
  },
  
  radius: {
    sm: '0.5rem',      // 8px
    md: '0.75rem',     // 12px
    lg: '1rem',        // 16px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.25rem',  // 36px
    full: '9999px',
  },
  
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
    wide: '1536px',
  },
  
  animations: {
    // Easing functions
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      soft: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    
    // Duration presets
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    
    // Framer Motion variants
    pageTransition: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    },
    
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  },
  
  // Container sizing
  container: {
    maxWidth: '1280px',
    padding: '2rem',
    paddingMobile: '1rem',
  },
};

export default theme;
