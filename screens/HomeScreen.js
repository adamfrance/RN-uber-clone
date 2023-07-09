import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { setStatusBarTranslucent } from "expo-status-bar";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";



const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setStatusBarTranslucent(false);
  }, []);
  return (
    <View className="bg-white h-full">
      <View className="p-5">
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))
            dispatch(setDestination(null))
          }}
          returnKeyType={"search"}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: "fr",
          }}
          placeholder="Where From?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </View>
  );
};

export default HomeScreen;
