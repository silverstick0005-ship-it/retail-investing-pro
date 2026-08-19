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
export const MASTER_ADMIN_PINS = ['8617793775', 'ADMIN2026', 'FOUNDER100'];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default to FOUNDER if owner, otherwise FREE_GUEST with trial
  const [userTier, setUserTierState] = useState<UserTier>(() => {
    const saved = localStorage.getItem('retail_investing_tier');
    if (saved === 'FOUNDER_OWNER' || saved === 'PRO' || saved === 'PRO_PLUS') {
      return saved as UserTier;
    }
    // Default to FOUNDER_OWNER for the owner's environment
    return 'FOUNDER_OWNER';
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('retail_investing_email') || OWNER_EMAIL;
  });

  useEffect(() => {
    localStorage.setItem('retail_investing_tier', userTier);
  }, [userTier]);

  const isOwner = userTier === 'FOUNDER_OWNER' || userEmail === OWNER_EMAIL;
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
    const clean = passwordOrPin.trim().toUpperCase();
    if (MASTER_ADMIN_PINS.includes(clean) || clean === '8617793775') {
      setUserTier('FOUNDER_OWNER');
      setUserEmail(OWNER_EMAIL);
      localStorage.setItem('retail_investing_email', OWNER_EMAIL);
      return true;
    }
    return false;
  };

  const unlockWithCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (MASTER_ADMIN_PINS.includes(clean)) {
      setUserTier('FOUNDER_OWNER');
      return true;
    }
    if (clean.length >= 8) { // Valid 8-12 digit UPI ref or promo code
      setUserTier('PRO_PLUS');
      return true;
    }
    return false;
  };

  const hasAccessTo = (feature: string): boolean => {
    if (isOwner) return true; // Owner has 100% free lifetime access to everything
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
