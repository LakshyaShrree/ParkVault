module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        surface: '#FFFFFF',
        background: '#F8FAFC'
      },
      borderRadius: {
        xl: '16px'
      }
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '430px'
      }
    }
  },
  plugins: []
};
