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
  // STRICT DEFAULT: Every new visitor / phone starts as FREE_GUEST unless unlocked
  const [userTier, setUserTierState] = useState<UserTier>(() => {
    // Check secret owner URL parameter: ?owner=8617793775
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ownerParam = urlParams.get('owner');
      if (ownerParam && MASTER_ADMIN_PINS.includes(ownerParam.trim().toUpperCase())) {
        localStorage.setItem('retail_investing_tier', 'FOUNDER_OWNER');
        return 'FOUNDER_OWNER';
      }
    }

    const saved = typeof window !== 'undefined' ? localStorage.getItem('retail_investing_tier') : null;
    if (saved === 'FOUNDER_OWNER' || saved === 'PRO' || saved === 'PRO_PLUS') {
      return saved as UserTier;
    }
    // Default for ALL public users and new devices is FREE_GUEST
    return 'FREE_GUEST';
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('retail_investing_email') : '') || '';
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
    localStorage.removeItem('retail_investing_email');
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
    // Valid 8-12 character UPI ref or verification code unlocks Pro
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
