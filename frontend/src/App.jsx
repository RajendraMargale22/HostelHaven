import { BrowserRouter } from 'react-router-dom';
import { AuthProvider }  from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar      from './components/layout/Navbar';
import Footer      from './components/layout/Footer';
import ScrollToTop from './components/layout/Scrolltotop';
import AppRoutes   from './router';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ScrollToTop />
          <div className="page-wrapper">
            <Navbar />
            <AppRoutes />
          </div>
          <Footer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}