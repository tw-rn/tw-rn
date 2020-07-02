// @generated: @expo/next-adapter@2.1.9
import "./_app.css";
import React from "react";
import { tw, Text, View } from "tw-rn";

export default function App() {
  return (
    // landscape: & portrait: pseudo selectors
    <View style={tw`flex items-center justify-center container h-full`}>
      <View style={tw`p-4 bg-green-500 landscape:bg-blue-500 rounded-lg`}>
        <Text style={tw`text-lg font-medium text-white portrait:hidden`}>Landscape</Text>
        <Text style={tw`text-lg font-medium text-white landscape:hidden`}>Portrait</Text>
      </View>
    </View>
  );
}
