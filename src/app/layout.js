import Footer from './component/Footer';
import Navbar from './component/Navbar';
import './globals.css';
import ThemeProvider from './providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SmileCraft Dental — Premium Dental Clinic in Dhaka</title>
        <meta name="description" content="SmileCraft Dental offers world-class dental services in Dhaka, Bangladesh. Book your appointment today." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        
        {/* Theme initialization handled in client-side ThemeProvider to avoid inline scripts in server components */}
      </head>
      <body>
        <ThemeProvider>
          <Toaster />
          <Navbar/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}