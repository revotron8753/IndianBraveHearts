import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes.jsx';
import './index.css';

// vite-react-ssg drives both client hydration and the static-site generation
// build from this exported factory.
export const createRoot = ViteReactSSG({ routes });
