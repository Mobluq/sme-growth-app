/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the SME-GROWTH-APP prototype: warm coral-orange, warm
        // charcoal ink, white screens, peach accents.
        gt: { DEFAULT:'#E85C2A', 600:'#CF4A1C', 700:'#AD3D15', 50:'#FDF0EA', 100:'#F9D7C7' },
        ink: { DEFAULT:'#221C19', soft:'#5A534E', mute:'#938B84' },
        paper: '#FDFDFD',
        card: '#FFFFFF',
        line: '#EEEDEB',
        money: '#171311',
        good: '#16A06B',
        warn: '#E8A33D',
        bad: '#E5533A'
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
