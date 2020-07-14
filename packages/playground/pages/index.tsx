// @generated: @expo/next-adapter@2.1.9
import "./_app.css";
import React, { useState, useRef } from "react";
// import { Animated } from "react-native";
import { tw, Text, View, Animated } from "tw-rn";
import { Button } from "react-native";

export default function App() {
  // const fadeAnim = useRef(new Animated.Value(1)).current;

  // const fadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // console.log({ fadeAnim });

  const [opacityStyle, setOpacityStyle] = useState("opacity-100");

  return (
    <View style={tw`flex items-center justify-center container h-full`}>
      <Text style={tw`text-gray-600 mb-10 p-2 border border-gray-300 rounded-lg`}>
        transition-opacity duration-500 opacity-25 hover:opacity-100
      </Text>
      <View
        style={tw`p-4 bg-green-500 rounded-lg transition-opacity duration-500 opacity-25 hover:opacity-100 cursor-pointer`}
      >
        <Text style={tw`text-lg text-white`}>tw-rn View</Text>
      </View>
      {/* <View style={tw`flex flex-row mt-4`}>
        <Button title="Fade In" onPress={() => setOpacityStyle("opacity-100")} />
        <Button title="Fade Out" onPress={() => setOpacityStyle("opacity-0")} />
      </View> */}
    </View>
  );
}
