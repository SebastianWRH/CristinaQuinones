import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Biography from './pages/Biography';
import Method from './pages/Method';
import Conferences from './pages/Conferences';
import Books from './pages/Books';
import Resources from './pages/Resources';
import ConsumerTruth from './pages/ConsumerTruth';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="biografia" element={<Biography />} />
        <Route path="metodo" element={<Method />} />
        <Route path="conferencias" element={<Conferences />} />
        <Route path="libros" element={<Books />} />
        <Route path="recursos" element={<Resources />} />
        <Route path="consumer-truth" element={<ConsumerTruth />} />
        <Route path="contacto" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;