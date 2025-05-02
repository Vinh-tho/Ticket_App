import * as qs from 'qs';
import * as crypto from 'crypto';

interface VNPayParams {
  orderId: number;
  amount: number;
  ipAddr?: string;
  orderInfo?: string;
  language?: string;
  bankCode?: string;
}

export function generateHMAC(data: Record<string, string>, secret: string): string {
  const sortedParams = Object.fromEntries(
    Object.entries(data).sort(([a], [b]) => a.localeCompare(b)),
  );
  const signData = qs.stringify(sortedParams, { encode: false });
  return crypto
    .createHmac('sha512', secret)
    .update(signData)
    .digest('hex');
}

export function createVNPayUrl({
  orderId,
  amount,
  ipAddr = '127.0.0.1',
  orderInfo = `Thanh toan don hang #${orderId}`,
  language = 'vn',
  bankCode = '',
}: VNPayParams): string {
  const vnp_TmnCode = process.env.VNPAY_TMN_CODE;
  const vnp_HashSecret = process.env.VNPAY_HASH_SECRET;
  const vnp_Url = process.env.VNPAY_PAYMENT_URL;
  const vnp_ReturnUrl = process.env.VNPAY_RETURN_URL;

  if (!vnp_TmnCode || !vnp_HashSecret || !vnp_Url || !vnp_ReturnUrl) {
    throw new Error('Missing VNPAY configuration');
  }

  const date = new Date();
  const createDate = date
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14);

  const vnp_Params: Record<string, string> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode,
    vnp_Locale: language,
    vnp_CurrCode: 'VND',
    vnp_TxnRef: String(orderId),
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'billpayment',
    vnp_Amount: String(amount * 100),
    vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  // Add bank code if provided
  if (bankCode) {
    vnp_Params.vnp_BankCode = bankCode;
  }

  // Generate HMAC signature
  const hmac = generateHMAC(vnp_Params, vnp_HashSecret);

  // Create final query string
  const queryString = qs.stringify({
    ...vnp_Params,
    vnp_SecureHash: hmac
  }, { encode: false });

  return `${vnp_Url}?${queryString}`;
}

export function verifyReturnUrl(query: Record<string, string>): boolean {
  try {
    const vnp_HashSecret = process.env.VNPAY_HASH_SECRET;
    if (!vnp_HashSecret) {
      throw new Error('Missing VNPAY_HASH_SECRET');
    }

    const vnp_SecureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;
    delete query.vnp_SecureHashType;

    const hmac = generateHMAC(query, vnp_HashSecret);
    return hmac === vnp_SecureHash;
  } catch (error) {
    console.error('Error verifying return URL:', error);
    return false;
  }
}

export function getReturnUrlStatus(query: Record<string, string>): {
  success: boolean;
  message: string;
  orderId: number;
  amount: number;
} {
  const isValidSignature = verifyReturnUrl(query);
  if (!isValidSignature) {
    throw new Error('Invalid signature');
  }

  const vnp_ResponseCode = query.vnp_ResponseCode;
  const orderId = parseInt(query.vnp_TxnRef);
  const amount = parseInt(query.vnp_Amount) / 100;

  return {
    success: vnp_ResponseCode === '00',
    message: vnp_ResponseCode === '00' ? 'Success' : 'Failed',
    orderId,
    amount,
  };
}