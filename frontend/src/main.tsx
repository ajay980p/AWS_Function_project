import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const domain = import.meta.env.VITE_API_ALLOWED_DOMAIN
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin + "/tasklist",
            }}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Auth0Provider>
    </StrictMode>,
)
