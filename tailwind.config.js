/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gt: { DEFAULT:'#F55820', 600:'#DE460F', 700:'#BA380B', 50:'#FEF1EB', 100:'#FBDCCE' },
        ink: { DEFAULT:'#17120E', soft:'#413A33', mute:'#8C847B' },
        paper: '#FBFAF7',
        card: '#FFFFFF',
        line: '#ECE8E1',
        money: '#171311',
        good: '#1E9E6A',
        warn: '#E8A33D'
      },
      fontFamily: { sans: ['Geist','Inter','ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','sans-serif'] },
      boxShadow: {
        card: '0 1px 2px rgba(23,18,14,.04), 0 8px 24px rgba(23,18,14,.06)',
        pop: '0 12px 40px rgba(23,18,14,.16)',
        money: '0 18px 50px rgba(23,19,17,.45)'
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      keyframes: {
        rise: { '0%':{opacity:'0',transform:'translateY(8px)'},'100%':{opacity:'1',transform:'translateY(0)'} }
      },
      animation: { rise: 'rise .4s ease both' }
    }
  },
  plugins: []
}
