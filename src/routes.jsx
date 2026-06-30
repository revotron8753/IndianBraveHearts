import App from './App.jsx';
import { extraProjects } from './App.jsx';

// Every "page" is the same App component; which section it renders is derived
// from the URL. Declaring the routes here gives each project a real endpoint
// that vite-react-ssg pre-renders to its own static HTML file for SEO.
export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
  },
  {
    path: '/projects/:id',
    element: <App />,
    entry: 'src/App.jsx',
    // The concrete project paths that get pre-rendered at build time.
    getStaticPaths: () =>
      ['akshar', ...extraProjects.map((p) => p.id)].map((id) => `/projects/${id}`),
  },
];
