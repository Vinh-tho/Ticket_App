import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Rect, Circle } from "react-native-svg";

const SVG_WIDTH = 380;
const seatRadius = 6;
const seatGap = 14;
const seatDiameter = seatRadius * 2;
const blockPadding = 20;
const blockVerticalPadding = 18;
const rowGap = 15;

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

export default function SeatBlocks({ selectedSeat, setSelectedSeat }) {
  // Tính tổng chiều cao SVG động
  let totalHeight = 0;
  seatBlocks.forEach((block) => {
    const blockHeight =
      blockVerticalPadding * 2 +
      block.rows.length * seatDiameter +
      (block.rows.length - 1) * rowGap;
    totalHeight += blockHeight + 10;
  });

  let currentY = 0;
  return (
    <Svg width={SVG_WIDTH} height={totalHeight} style={styles.svg}>
      {seatBlocks.map((block, blockIdx) => {
        const maxSeats = Math.max(...block.rows.map((r) => r.seats));
        const blockWidth =
          blockPadding * 2 + (maxSeats - 1) * seatGap + seatDiameter;
        const blockX = (SVG_WIDTH - blockWidth) / 2;
        const blockHeight =
          blockVerticalPadding * 2 +
          block.rows.length * seatDiameter +
          (block.rows.length - 1) * rowGap;
        const y = currentY;
        currentY += blockHeight + 10;
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
                      setSelectedSeat({ blockIdx, rowIdx, seatIdx })
                    }
                  />
                );
              })
            )}
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    alignSelf: "center",
    marginTop: 0,
  },
});