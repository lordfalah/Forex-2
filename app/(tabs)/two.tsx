import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { Fragment, useCallback, useEffect, useState } from "react";
import { format_time, kelvinToCelsius } from "@/app/utils/help";
import RefreshApi from "@/components/RefreshApi";

type WeatherItem = {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};

export default function TabTwoScreen() {
  const [weathers, setWeathers] = useState<WeatherItem[] | null>();
  const [refreshing, setRefreshing] = useState(true);

  const getWeatherPontianak = async () => {
    setRefreshing(true);

    try {
      const req = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?id=1630789&appid=1212aee9076dadf304066545ab820b5b"
      );
      const res = await req.json();
      setWeathers(res?.list);
    } catch (error: any) {
      setWeathers(null);
      console.log(error.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getWeatherPontianak();
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: WeatherItem; index: number }) => {
      return (
        <View key={index} style={styles.contentWeather}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              style={{ backgroundColor: "black", borderRadius: 10 }}
              width={55}
              height={55}
              source={{
                uri: `https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`,
              }}
            />
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: styles.text.fontSize }}
              >
                {item?.weather[0]?.main}
              </Text>
              <Text style={styles.text}>{item?.weather[0]?.description}</Text>
            </View>
          </View>

          <View style={{ display: "flex", justifyContent: "center" }}>
            <Text>{format_time(item?.dt)}</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <Text style={styles.text}>
                {kelvinToCelsius(item?.main?.temp_min).toFixed(2)} °C
              </Text>
              <Text style={styles.text}>-</Text>
              <Text style={styles.text}>
                {kelvinToCelsius(item?.main?.temp_max).toFixed(2)} °C
              </Text>
            </View>
          </View>
        </View>
      );
    },
    []
  );

  return (
    <Fragment>
      <View style={styles.container}>
        {refreshing ? (
          <RefreshApi sizeIndicator={25} />
        ) : (
          weathers && (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={getWeatherPontianak}
                />
              }
              removeClippedSubviews
              style={{
                width: "100%",
                paddingHorizontal: 10,
              }}
              data={weathers}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={renderItem}
            />
          )
        )}
      </View>

      <View
        style={{ width: "100%", padding: 20, backgroundColor: "transparent" }}
      >
        <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "500" }}>
          Total Record : {weathers?.length}
        </Text>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#EEEDEB",
  },

  contentWeather: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  text: {
    fontSize: 15,
  },
});
