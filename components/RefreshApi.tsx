import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "@/components/Themed";

const RefreshApi = ({ sizeIndicator }: { sizeIndicator: number }) => {
  return (
    <View
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={40} />
      <Text
        style={{ fontSize: sizeIndicator, fontWeight: "bold" }}
        lightColor="white"
      >
        Loading...
      </Text>
    </View>
  );
};

export default RefreshApi;
