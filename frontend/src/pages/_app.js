import '../styles/globals.css'; // Correct relative path to globals.css
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Optional: Tailwind dark mode / global setups
  useEffect(() => {
    // Example: Set default theme if needed
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
