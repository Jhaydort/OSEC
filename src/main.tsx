import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The application root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Shared layout rules follow component styles so all sections use one grid.
import './styles/layout.css';

// Typography follows component rules so mobile categories have one source.
import './styles/typography.css';
