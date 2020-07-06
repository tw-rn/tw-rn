import React from "react";
import { Platform, Dimensions } from "react-native";
import { render, fireEvent, NativeTestEvent, wait } from "@testing-library/react-native";
import { tw } from "../../tw";
import { View, TextInput, FlatList } from "../..";

// TODO copy tests from View and TextInput here as the coverage needs to be in the hooks tests instead
describe.skip("withTwrn", () => {
  it("should pass", () => {
    expect(true).toEqual(true);
  });
});
