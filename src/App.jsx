import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import SectionRedirect from './components/SectionRedirect';

const BookDetail = lazy(() => import('./pages/BookDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="biografia" element={<SectionRedirect sectionId="sobre-mi" />} />
        <Route path="metodo" element={<SectionRedirect sectionId="consumer-truth" />} />
        <Route path="conferencias" element={<SectionRedirect sectionId="conferencias" />} />
        <Route path="libros" element={<SectionRedirect sectionId="libros" />} />
        <Route
          path="libros/:slug"
          element={
            <Suspense fallback={null}>
              <BookDetail />
            </Suspense>
          }
        />
        <Route path="recursos" element={<SectionRedirect sectionId="videoteca" />} />
        <Route path="consumer-truth" element={<SectionRedirect sectionId="consumer-truth" />} />
        <Route path="contacto" element={<SectionRedirect sectionId="contacto" />} />

        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
