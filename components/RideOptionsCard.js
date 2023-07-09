import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-123",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-123",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          className="absolute top-3 left-5 p-3 z-50 rounded-full"
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-backgroundRides"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View className="-ml-6">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
            </View>
            <Text className="text-xl">
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="mt-auto border-t border-gray-200"> 
        <TouchableOpacity
          className={`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text className="text-xl text-center text-white">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
