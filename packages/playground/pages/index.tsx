// @generated: @expo/next-adapter@2.1.9
import "./_app.css";
import React, { useState, useRef } from "react";
// import { Animated } from "react-native";
import { tw, Text, View, Animated } from "tw-rn";
import { Button } from "react-native";

export default function App() {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // console.log({ fadeAnim });

  // const [opacityStyle, setOpacityStyle] = useState("opacity-100");

  return (
    <View style={tw`flex items-center justify-center container h-full`}>
      {/* <View style={tw`flex flex-row mb-6`}>
        <Text
          style={tw`text-xs text-gray-600 p-2 border border-gray-300 rounded-lg`}
        >
          transition-opacity
        </Text>
        <Text
          style={tw`text-xs text-gray-600 p-2 border border-gray-300 rounded-lg ml-2`}
        >
          ease-in-out
        </Text>
        <Text
          style={tw`text-xs text-gray-600 p-2 border border-gray-300 rounded-lg ml-2`}
        >
          duration-1000
        </Text>
        <Text
          style={tw`text-xs text-gray-600 p-2 border border-gray-300 rounded-lg ml-2`}
        >
          delay-100
        </Text>
      </View> */}
      <Animated.View
        style={[
          tw`p-4 bg-green-500 rounded-lg hover:bg-red-500 cursor-pointer`,
          { opacity: fadeAnim },
        ]}
      >
        <Text style={tw`text-lg text-white`}>tw-rn View</Text>
      </Animated.View>
      <View style={tw`flex flex-row mt-4`}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
      </View>
    </View>
  );
}
