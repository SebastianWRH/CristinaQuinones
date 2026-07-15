import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RouteScrollManager from '../components/RouteScrollManager';
import { useTranslation } from '../i18n/useTranslation';

function MainLayout() {
  const { language } = useTranslation();

  return (
    <>
      <RouteScrollManager />
      <a href="#main-content" className="skip-link">
        {language === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <Header />

      <main id="main-content">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
