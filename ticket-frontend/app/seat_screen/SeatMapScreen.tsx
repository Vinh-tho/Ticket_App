import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Svg, { Rect, Text as SvgText, Circle } from "react-native-svg";
import { useRouter } from "expo-router";

const seatBlocks = [
  {
    color: "#F44336",
    price: 2900000,
    rows: [
      { seats: 18, label: "A" },
      { seats: 18, label: "B" },
      { seats: 18, label: "C" },
      { seats: 18, label: "D" },
    ],
  },
  {
    color: "#FFD966",
    price: 2200000,
    rows: [
      { seats: 18, label: "E" },
      { seats: 18, label: "F" },
      { seats: 18, label: "G" },
    ],
  },
  {
    color: "#4FC3F7",
    price: 1500000,
    rows: [
      { seats: 18, label: "H" },
      { seats: 18, label: "I" },
      { seats: 18, label: "J" },
      { seats: 18, label: "K" },
    ],
  },
  {
    color: "#D9D9D9",
    price: 860000,
    rows: [
      { seats: 18, label: "L" },
      { seats: 18, label: "M" },
      { seats: 18, label: "N" },
      { seats: 18, label: "O" },
    ],
  },
];

const SVG_WIDTH = 380;
const seatRadius = 6;
const seatGap = 14;
const seatDiameter = seatRadius * 2;
const blockPadding = 20; // padding trái/phải cho block
const blockVerticalPadding = 18; // padding trên/dưới cho block
const rowGap = 15; // khoảng cách giữa các hàng ghế

export default function SeatMapScreen() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const router = useRouter();

  const handleSeatPress = (blockIdx, rowIdx, seatIdx) => {
    setSelectedSeat({ blockIdx, rowIdx, seatIdx });
  };

  const closeModal = () => setSelectedSeat(null);

  // Tính tổng chiều cao SVG động
  let totalHeight = 80; // bắt đầu sau sân khấu
  seatBlocks.forEach((block) => {
    const blockHeight =
      blockVerticalPadding * 2 +
      block.rows.length * seatDiameter +
      (block.rows.length - 1) * rowGap;
    totalHeight += blockHeight + 10; // 10 là khoảng cách giữa các block
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={{ color: "#fff", fontSize: 22 }}>{"‹"}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}>
        {/* Sân khấu và sơ đồ ghế */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Svg width={SVG_WIDTH} height={totalHeight}>
            {/* Sân khấu */}
            <Rect
              x={40}
              y={20}
              width={300}
              height={40}
              rx={16}
              fill="#C4C4C4"
            />
            <SvgText
              x={190}
              y={46}
              fill="#222"
              fontWeight="bold"
              fontSize="20"
              textAnchor="middle"
            >
              SÂN KHẤU/STAGE
            </SvgText>
            {/* Các block ghế */}
            {(() => {
              let currentY = 80; // bắt đầu render block đầu tiên ở y=80
              return seatBlocks.map((block, blockIdx) => {
                const maxSeats = Math.max(...block.rows.map((r) => r.seats));
                const blockWidth =
                  blockPadding * 2 +
                  (maxSeats - 1) * seatGap +
                  seatDiameter;
                const blockX = (SVG_WIDTH - blockWidth) / 2;
                const blockHeight =
                  blockVerticalPadding * 2 +
                  block.rows.length * seatDiameter +
                  (block.rows.length - 1) * rowGap;
                const y = currentY;
                currentY += blockHeight + 10; // 10 là khoảng cách giữa các block
                return (
                  <React.Fragment key={blockIdx}>
                    <Rect
                      x={blockX}
                      y={y}
                      width={blockWidth}
                      height={blockHeight}
                      rx={18}
                      fill={block.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                    {/* Render ghế */}
                    {block.rows.map((row, rowIdx) =>
                      Array.from({ length: row.seats }).map((_, seatIdx) => {
                        const cx = blockX + blockPadding + seatIdx * seatGap;
                        const cy =
                          y +
                          blockVerticalPadding +
                          rowIdx * (seatDiameter + rowGap) +
                          seatRadius;
                        const isSelected =
                          selectedSeat &&
                          selectedSeat.blockIdx === blockIdx &&
                          selectedSeat.rowIdx === rowIdx &&
                          selectedSeat.seatIdx === seatIdx;
                        return (
                          <Circle
                            key={seatIdx}
                            cx={cx}
                            cy={cy}
                            r={seatRadius}
                            fill={isSelected ? "#00FF99" : "#fff"}
                            stroke="#BDBDBD"
                            strokeWidth={1}
                            onPress={() =>
                              handleSeatPress(blockIdx, rowIdx, seatIdx)
                            }
                          />
                        );
                      })
                    )}
                    {/* Render label hàng ghế bên trái */}
                    {block.rows.map((row, rowIdx) => (
                      <SvgText
                        key={rowIdx}
                        x={blockX + 5}
                        y={
                          y +
                          blockVerticalPadding +
                          rowIdx * (seatDiameter + rowGap) +
                          seatRadius +
                          4
                        }
                        fill="#fff"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {row.label}
                      </SvgText>
                    ))}
                    {/* Render label hàng ghế bên phải */}
                    {block.rows.map((row, rowIdx) => (
                      <SvgText
                        key={rowIdx + "r"}
                        x={blockX + blockWidth - 10}
                        y={
                          y +
                          blockVerticalPadding +
                          rowIdx * (seatDiameter + rowGap) +
                          seatRadius +
                          4
                        }
                        fill="#fff"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="end"
                      >
                        {row.label}
                      </SvgText>
                    ))}
                  </React.Fragment>
                );
              });
            })()}
          </Svg>
        </View>
        {/* Thông tin sự kiện */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>
            18/05 - THANH DUY - QUỐC THIÊN - THANH THIÊN BẠCH NGỌC
          </Text>
          <Text style={styles.eventTime}>20:00, 18 Tháng 05, 2025</Text>
        </View>
      </ScrollView>
      {/* Nút chọn vé và nút thông tin vé cố định đáy màn hình */}
      <View style={styles.fixedBtnContainer}>
        <TouchableOpacity
          style={[
            styles.chooseBtn,
            {
              backgroundColor: selectedSeat ? "#00C471" : "#333",
              marginBottom: 0,
              marginTop: 0,
            },
          ]}
          disabled={!selectedSeat}
        >
          <Text
            style={[
              styles.chooseBtnText,
              { color: selectedSeat ? "#fff" : "#bbb" },
            ]}
          >
            {selectedSeat ? "Tiếp tục chọn vé" : "Vui lòng chọn vé"}
          </Text>
        </TouchableOpacity>
        {!selectedSeat && (
          <TouchableOpacity
            style={[
              styles.chooseBtn,
              { backgroundColor: "#222", marginTop: 12, marginBottom: 0 },
            ]}
            onPress={() => setShowTicketInfo(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chooseBtnText, { color: "#fff" }]}>
              Thông tin vé
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Modal thông tin vé */}
      <Modal
        visible={showTicketInfo}
        animationType="slide"
        transparent
        onRequestClose={() => setShowTicketInfo(false)}
      >
        <View style={styles.ticketInfoModalContainer}>
          <View style={styles.ticketInfoModal}>
            {/* Thanh kéo xuống */}
            <View style={styles.dragBar} />
            <Text style={styles.ticketInfoTitle}>
              18/05 - THANH DUY - QUỐC THIÊN - THANH THIÊN BẠCH NGỌC
            </Text>
            <Text style={styles.ticketInfoTime}>Nhà văn hóa Thanh Niên</Text>
            <Text style={styles.ticketInfoTime}>
              20:00 - 23:00, 18 Tháng 05, 2025
            </Text>
            <View style={{ height: 12 }} />
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Trạng thái ghế
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 8,
              }}
            >
              <View style={styles.statusDot} />
              <Text style={styles.statusLabel}>Đang trống</Text>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: "#00FF99", marginLeft: 16 },
                ]}
              />
              <Text style={styles.statusLabel}>Đang chọn</Text>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: "#F44336", marginLeft: 16 },
                ]}
              />
              <Text style={styles.statusLabel}>Không chọn được</Text>
            </View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 8,
              }}
            >
              Giá Vé
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <View style={[styles.priceDot, { backgroundColor: "#F44336" }]} />
              <Text style={styles.priceLabel}>PREMIUM</Text>
              <Text style={styles.priceValue}>2.900.000 đ</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View style={[styles.priceDot, { backgroundColor: "#FFD966" }]} />
              <Text style={styles.priceLabel}>VIP</Text>
              <Text style={styles.priceValue}>2.200.000 đ</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View style={[styles.priceDot, { backgroundColor: "#4FC3F7" }]} />
              <Text style={styles.priceLabel}>STANDARD 1</Text>
              <Text style={styles.priceValue}>1.500.000 đ</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View style={[styles.priceDot, { backgroundColor: "#A389F4" }]} />
              <Text style={styles.priceLabel}>STANDARD 2</Text>
              <Text style={styles.priceValue}>860.000 đ</Text>
            </View>
            <TouchableOpacity
              style={styles.closeTicketInfoBtn}
              onPress={() => setShowTicketInfo(false)}
            >
              <Text
                style={{ color: "#00FF99", fontWeight: "bold", fontSize: 16 }}
              >
                Đóng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal chi tiết ghế */}
      <Modal visible={!!selectedSeat} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.zoneTitle}>Thông tin ghế</Text>
            <Text style={styles.zonePrice}>
              Block: {selectedSeat ? seatBlocks[selectedSeat.blockIdx].color : ""} - 
              Hàng: {selectedSeat ? seatBlocks[selectedSeat.blockIdx].rows[selectedSeat.rowIdx].label : ""} - 
              Số: {selectedSeat ? selectedSeat.seatIdx + 1 : ""}
            </Text>
            <Text style={[styles.zonePrice, { color: "#00FF99", marginBottom: 16 }]}>
              Giá vé: {selectedSeat ? seatBlocks[selectedSeat.blockIdx].price.toLocaleString("vi-VN") + " đ" : ""}
            </Text>
            <TouchableOpacity style={styles.continueBtn} onPress={() => {/* Xử lý thanh toán */}}>
              <Text style={styles.continueText}>Thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                {
                  backgroundColor: "#39393b",
                  borderWidth: 1,
                  borderColor: "#00FF99",
                  marginTop: 12,
                },
              ]}
              onPress={closeModal}
            >
              <Text style={[styles.continueText, { color: "#00FF99" }]}>
                Chọn khu vực khác
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: 36,
    left: 16,
    zIndex: 20,
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 6,
  },
  eventInfo: {
    marginTop: 24,
    alignItems: "center",
  },
  eventTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  eventTime: {
    color: "#bbb",
    fontSize: 15,
    marginBottom: 12,
  },
  chooseBtn: {
    marginHorizontal: 16,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 0,
    marginTop: 0,
  },
  chooseBtnText: {
    color: "#bbb",
    fontSize: 16,
    fontWeight: "bold",
  },
  fixedBtnContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "#111",
    zIndex: 20,
  },
  ticketInfoModalContainer: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "flex-end",
  },
  ticketInfoModal: {
    backgroundColor: "#39393b",
    padding: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: "100%",
    alignItems: "flex-start",
  },
  dragBar: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#888",
    marginBottom: 12,
  },
  ticketInfoTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    textAlign: "left",
  },
  ticketInfoTime: {
    color: "#bbb",
    fontSize: 15,
    marginBottom: 2,
    textAlign: "left",
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#888",
  },
  statusLabel: {
    color: "#fff",
    marginRight: 8,
    fontSize: 14,
  },
  priceDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  priceLabel: {
    color: "#fff",
    fontSize: 15,
    width: 110,
  },
  priceValue: {
    color: "#00FF99",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },
  closeTicketInfoBtn: {
    alignSelf: "center",
    marginTop: 18,
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#39393b",
    padding: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: "100%",
    alignItems: "center",
  },
  zoneTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00FF99",
    marginBottom: 4,
    textAlign: "center",
  },
  zonePrice: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  continueBtn: {
    backgroundColor: "#00C471",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});