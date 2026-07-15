import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import NotFound from './pages/NotFound';
import SectionRedirect from './components/SectionRedirect';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="biografia" element={<SectionRedirect sectionId="sobre-mi" />} />
        <Route path="metodo" element={<SectionRedirect sectionId="consumer-truth" />} />
        <Route path="conferencias" element={<SectionRedirect sectionId="conferencias" />} />
        <Route path="libros" element={<SectionRedirect sectionId="libros" />} />
        <Route path="libros/:slug" element={<BookDetail />} />
        <Route path="recursos" element={<SectionRedirect sectionId="videoteca" />} />
        <Route path="consumer-truth" element={<SectionRedirect sectionId="consumer-truth" />} />
        <Route path="contacto" element={<SectionRedirect sectionId="contacto" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
