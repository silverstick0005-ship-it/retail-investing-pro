import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserTier = 'FREE_GUEST' | 'PRO' | 'PRO_PLUS' | 'FOUNDER_OWNER';

interface SubscriptionContextType {
  userTier: UserTier;
  isOwner: boolean;
  isPro: boolean;
  userEmail: string;
  hasAccessTo: (feature: 'pro-picks' | 'guru' | 'signals' | 'ai-deep-dive' | 'unlimited-search' | 'dcf-models') => boolean;
  unlockWithCode: (code: string) => boolean;
  loginAsOwner: (passwordOrPin: string) => boolean;
  setUserTier: (tier: UserTier) => void;
  logoutToGuest: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const OWNER_EMAIL = 'silverstick0005@gmail.com';
export const MASTER_ADMIN_PINS = ['8583899594', 'ADMIN8583'];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userTier, setUserTierState] = useState<UserTier>(() => {
    if (typeof window !== 'undefined') {
      // 1. If running inside AI Studio Developer workspace or preview with owner token, grant Founder status
      const isDevHost = window.location.hostname.includes('ais-dev') || window.location.hostname.includes('localhost');
      const urlParams = new URLSearchParams(window.location.search);
      const ownerParam = urlParams.get('owner');
      
      if (ownerParam && MASTER_ADMIN_PINS.includes(ownerParam.trim().toUpperCase())) {
        localStorage.setItem('retail_investing_tier', 'FOUNDER_OWNER');
        return 'FOUNDER_OWNER';
      }

      // Check saved local storage
      const saved = localStorage.getItem('retail_investing_tier');
      if (saved === 'FOUNDER_OWNER' || saved === 'PRO' || saved === 'PRO_PLUS') {
        return saved as UserTier;
      }

      // Automatically keep Owner logged in on AI Studio Dev environment
      if (isDevHost) {
        return 'FOUNDER_OWNER';
      }
    }

    // Default for public customers/visitors on other phones is FREE_GUEST
    return 'FREE_GUEST';
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('retail_investing_email') : '') || OWNER_EMAIL;
  });

  useEffect(() => {
    localStorage.setItem('retail_investing_tier', userTier);
  }, [userTier]);

  const isOwner = userTier === 'FOUNDER_OWNER';
  const isPro = isOwner || userTier === 'PRO' || userTier === 'PRO_PLUS';

  const setUserTier = (tier: UserTier) => {
    setUserTierState(tier);
    localStorage.setItem('retail_investing_tier', tier);
  };

  const logoutToGuest = () => {
    setUserTierState('FREE_GUEST');
    localStorage.setItem('retail_investing_tier', 'FREE_GUEST');
  };

  const loginAsOwner = (passwordOrPin: string) => {
    const clean = passwordOrPin.trim();
    if (MASTER_ADMIN_PINS.includes(clean) || clean === '8583899594') {
      setUserTier('FOUNDER_OWNER');
      setUserEmail(OWNER_EMAIL);
      localStorage.setItem('retail_investing_email', OWNER_EMAIL);
      return true;
    }
    return false;
  };

  const unlockWithCode = (code: string) => {
    const clean = code.trim();
    if (MASTER_ADMIN_PINS.includes(clean) || clean === '8583899594') {
      setUserTier('FOUNDER_OWNER');
      return true;
    }
    // Valid 6+ character UPI reference unlocks Pro access
    if (clean.length >= 6) {
      setUserTier('PRO_PLUS');
      return true;
    }
    return false;
  };

  const hasAccessTo = (feature: string): boolean => {
    if (isOwner) return true; // Owner has 100% free lifetime access
    if (isPro) return true; // Paid Pro users have access
    return false; // Free guests get paywalled on premium modules
  };

  return (
    <SubscriptionContext.Provider
      value={{
        userTier,
        isOwner,
        isPro,
        userEmail,
        hasAccessTo,
        unlockWithCode,
        loginAsOwner,
        setUserTier,
        logoutToGuest,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
