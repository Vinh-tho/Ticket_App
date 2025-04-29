import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaymentMethodsProps {
  selectedMethod: string | null;
  onSelectMethod: (method: string) => void;
}

export default function PaymentMethods({ selectedMethod, onSelectMethod }: PaymentMethodsProps) {
  const paymentMethods = [
    "VNPAY/Ví ứng dụng ngân hàng",
    "VietQR",
    "ShopeePay",
    "MoMo",
    "ZaloPay",
    "Thẻ ghi nợ/Thẻ tín dụng",
  ];

  return (
    <View style={styles.paymentMethods}>
      <Text style={styles.sectionSubtitle}>Phương thức thanh toán</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method}
          style={styles.paymentOption}
          onPress={() => onSelectMethod(method)}
        >
          <View style={styles.paymentOptionContent}>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === method && styles.radioCircleSelected,
              ]}
            />
            <Text style={styles.paymentOptionText}>{method}</Text>
            {method === "ShopeePay" && (
              <>
              </>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  paymentMethods: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  paymentOption: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
  },
  radioCircleSelected: {
    backgroundColor: "#2196F3", // Màu xanh dương khi được chọn
    borderColor: "#2196F3",
  },
  paymentOptionText: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  discountText: {
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#D81B60",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
  },
  discountNote: {
    fontSize: 12,
    color: "#B0BEC5",
  },
});