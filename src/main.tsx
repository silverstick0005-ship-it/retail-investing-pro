import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SubscriptionProvider } from './context/SubscriptionContext.tsx';
import { LiveMarketProvider } from './context/LiveMarketContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SubscriptionProvider>
      <LiveMarketProvider>
        <App />
      </LiveMarketProvider>
    </SubscriptionProvider>
  </StrictMode>,
);
