// @generated: @expo/next-adapter@2.1.9
import "./_app.css";
import React from "react";
import { tw, Text, View, TextInput } from "tw-rn";

export default function App() {
  return (
    <View style={[tw`items-center justify-center bg-gray-200`, { flex: 1 }]}>
      <View style={tw`p-4 bg-white rounded-lg hover:bg-red-300`}>
        <Text style={tw`text-lg font-medium text-gray-700`}>Here</Text>
        <TextInput
          style={tw`bg-blue-100 focus:bg-green-100 border border-blue-500 focus:border-green-500 rounded p-4 mt-8 w-64`}
        />
      </View>
    </View>
  );
}
