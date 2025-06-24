import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Accueil from './pages/Accueil.jsx'
import Inscription from './components/Inscription.jsx'
import Entreprise from './pages/Entreprise.jsx'
import Layout from './layout.jsx'        
import RechercheCV from './pages/recherche-cv.jsx'
import Messages from './pages/Messages.jsx'
import Profil from './pages/profil.jsx'
import Autour from './pages/Autour.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <Accueil/>
      },
      
      {
        path: '/entreprise',
        element: <Entreprise/>
      },
      {
        path: '/recherche-cv',
        element: <RechercheCV/>
      },
      {
        path: '/messages',
        element: <Messages/>
      },
      {
        path: '/profil',
        element: <Profil/>
      },
      {
        path: '/autour-de-vous',
        element: <Autour/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
