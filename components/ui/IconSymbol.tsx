// This file is a fallback for using MaterialIcons on Android and web.

import { MaterialIcons } from '@expo/vector-icons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'ticket': 'confirmation-number',  // <-- Thêm mapping cho ticket
  'person': 'person',              // <-- Thêm mapping cho person
  'language': 'language',
  "delete": "delete", // 🗑️ Xoá tài khoản
  "help-outline": "help-outline", // ❓ Câu hỏi thường gặp
  "call": "call", // 📞 Liên hệ
  "description": "description", // 📄 Quy chế hoạt động
  "lock": "lock", // 🔒 Chính sách bảo mật thông tin
  "gavel": "gavel", // ⚖️ Cơ chế giải quyết tranh chấp/khiếu nại
  "security": "security", // 🛡️ Chính sách bảo mật thanh toán
  "cached": "cached", // 🔄 Chính sách đổi trả và kiểm hàng
  "local-shipping": "local-shipping", // 🚚 Điều kiện vận chuyển và giao nhận
  "people": "people", // 👥 Điều khoản sử dụng cho khách hàng
  "business": "business", // 🏢 Điều khoản sử dụng cho ban tổ chức
  "credit-card": "credit-card", // 💳 Phương thức thanh toán
  "close": "close",
  "logout": "logout",
  "arrow-back": "arrow-back"
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;


export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name] || "help-outline"; // Thêm fallback icon nếu `name` không hợp lệ

  return <MaterialIcons color={color} size={size} name={iconName} />;
}

