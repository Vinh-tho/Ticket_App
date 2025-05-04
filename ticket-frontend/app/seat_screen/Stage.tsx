import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";

const SVG_WIDTH = 380;

export default function Stage() {
  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={80}>
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
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
});