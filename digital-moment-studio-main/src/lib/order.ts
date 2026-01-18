// Order Management for Digital Moment Studio
import { z } from 'zod';

// Validation schema
export const orderSchema = z.object({
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  whatsappNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[\d\s+()-]+$/, 'Please enter a valid phone number'),
});

export type OrderFormData = z.infer<typeof orderSchema>;

export interface OrderData extends OrderFormData {
  productName: string;
  productPrice: number;
  currency: string;
  referralCode: string | null;
  source: 'referral' | 'direct';
  timestamp: string;
  status: 'pending';
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  currency: string;
}

// Product Configuration
export const VALENTINE_ASK_PRODUCT = {
  id: 'valentine-ask',
  name: 'Valentine Ask Experience',
  price: 8000,
  currency: 'NGN',
  description: 'A personalized digital experience to ask your special someone to be your Valentine.',
};

// Bank Details for Payment
export const BANK_DETAILS: BankDetails = {
  bankName: 'Moniepoint',
  accountNumber: '8129744447',
  accountName: 'Peter Tomiwa Adewale',
  amount: VALENTINE_ASK_PRODUCT.price,
  currency: VALENTINE_ASK_PRODUCT.currency,
};

// WhatsApp Configuration
export const WHATSAPP_NUMBER = '2348129744447';

export const WHATSAPP_MESSAGE_TEMPLATE = (orderData: OrderData) => {
  return encodeURIComponent(
    `Hello Digital Moment Studio,\n\n` +
    `I have placed an order for ${orderData.productName}.\n\n` +
    `Name: ${orderData.fullName}\n` +
    `Email: ${orderData.email}\n` +
    `WhatsApp: ${orderData.whatsappNumber}\n\n` +
    `I am attaching my payment receipt. Please confirm my order.\n\n` +
    `Thank you.`
  );
};

/**
 * Formats currency for display
 */
export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Creates an order object with referral attribution
 */
export function createOrder(
  formData: OrderFormData, 
  referralCode: string | null
): OrderData {
  return {
    ...formData,
    productName: VALENTINE_ASK_PRODUCT.name,
    productPrice: VALENTINE_ASK_PRODUCT.price,
    currency: VALENTINE_ASK_PRODUCT.currency,
    referralCode,
    source: referralCode ? 'referral' : 'direct',
    timestamp: new Date().toISOString(),
    status: 'pending',
  };
}

/**
 * Generates WhatsApp link for sending receipt
 */
export function getWhatsAppLink(orderData: OrderData): string {
  const message = WHATSAPP_MESSAGE_TEMPLATE(orderData);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

/**
 * Stores order in localStorage for reference
 */
export function storeOrderLocally(order: OrderData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('dms_last_order', JSON.stringify(order));
  } catch (e) {
    console.warn('Unable to store order locally:', e);
  }
}

/**
 * Retrieves the last order from localStorage
 */
export function getLastOrder(): OrderData | null {
  if (typeof window === 'undefined') return null;

  try {
    const order = localStorage.getItem('dms_last_order');
    return order ? JSON.parse(order) : null;
  } catch (e) {
    console.warn('Unable to retrieve last order:', e);
    return null;
  }
}
