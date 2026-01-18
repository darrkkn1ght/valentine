// Referral System for Digital Moment Studio
// Handles referral code detection, storage, and retrieval

const REFERRAL_STORAGE_KEY = 'dms_referral_code';
const REFERRAL_TIMESTAMP_KEY = 'dms_referral_timestamp';
const REFERRAL_EXPIRY_DAYS = 30;

/**
 * Detects and stores referral code from URL parameters
 * Call this on pages that can receive referral traffic
 */
export function detectAndStoreReferral(): string | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');

  if (refCode && refCode.trim()) {
    storeReferralCode(refCode.trim());
    return refCode.trim();
  }

  return getStoredReferralCode();
}

/**
 * Stores referral code in localStorage with timestamp
 */
export function storeReferralCode(code: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(REFERRAL_STORAGE_KEY, code);
    localStorage.setItem(REFERRAL_TIMESTAMP_KEY, Date.now().toString());
  } catch (e) {
    console.warn('Unable to store referral code:', e);
  }
}

/**
 * Retrieves stored referral code if valid (not expired)
 */
export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const code = localStorage.getItem(REFERRAL_STORAGE_KEY);
    const timestamp = localStorage.getItem(REFERRAL_TIMESTAMP_KEY);

    if (!code || !timestamp) return null;

    // Check if referral has expired
    const storedDate = parseInt(timestamp, 10);
    const expiryMs = REFERRAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    if (Date.now() - storedDate > expiryMs) {
      clearReferralCode();
      return null;
    }

    return code;
  } catch (e) {
    console.warn('Unable to retrieve referral code:', e);
    return null;
  }
}

/**
 * Clears stored referral code
 */
export function clearReferralCode(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(REFERRAL_STORAGE_KEY);
    localStorage.removeItem(REFERRAL_TIMESTAMP_KEY);
  } catch (e) {
    console.warn('Unable to clear referral code:', e);
  }
}

/**
 * Returns referral attribution info for order submission
 */
export function getReferralAttribution(): { 
  referralCode: string | null; 
  source: 'referral' | 'direct';
} {
  const code = getStoredReferralCode();
  return {
    referralCode: code,
    source: code ? 'referral' : 'direct',
  };
}
