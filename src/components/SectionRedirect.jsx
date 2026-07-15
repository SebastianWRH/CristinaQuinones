import { Navigate } from 'react-router-dom';

function SectionRedirect({ sectionId }) {
  return <Navigate to={`/#${sectionId}`} replace />;
}

export default SectionRedirect;
