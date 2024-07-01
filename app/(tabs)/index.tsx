import {
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { useEffect, useState } from "react";
import { currenciesForex, ratesForex } from "@/app/utils/data";
import RefreshApi from "@/components/RefreshApi";
import { timeConverter } from "@/app/utils/help";

type Rate = [string, number];
type Currencies = [string, string];

export default function TabOneScreen() {
  const [dataCurrencies, setDataCurrencies] = useState<Currencies[] | null>(
    null
  );
  const [dataRates, setDataRates] = useState<Rate[] | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [date, setDate] = useState("");

  const forexAPI = async () => {
    setRefreshing(true);
    try {
      const [rates, currencies] = await Promise.all([
        ratesForex(),
        currenciesForex(),
      ]);

      // Set state with the first 10 / 100 entries
      const entriesCurrencies = Object.entries(currencies) as Currencies[];
      setDataCurrencies(entriesCurrencies.slice(0, 100));

      setDate(timeConverter(rates?.timestamp || 0));
      const entriesRates = Object.entries(rates?.rates) as Rate[];
      setDataRates(entriesRates.slice(0, 100));
    } catch (error) {
      console.log({ error });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    forexAPI();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("@/assets/images/background.jpg")}
      resizeMode="cover"
    >
      <Text lightColor="white" style={styles.title}>
        Forex 2
      </Text>

      {refreshing ? (
        <RefreshApi sizeIndicator={25} />
      ) : (
        dataCurrencies &&
        dataRates && (
          <View style={styles.contentForex}>
            <Text lightColor="white">{date}</Text>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={forexAPI} />
              }
              style={{ width: "100%" }}
              keyExtractor={([key, value], idx) => `${value + key + idx}`}
              data={dataRates}
              renderItem={({ item: [key, value], index }) => (
                <View style={styles.listForex}>
                  <Text lightColor="white">{index + 1}. </Text>
                  <Text lightColor="white">{key}</Text>
                  <Text lightColor="white">{value}</Text>
                </View>
              )}
            />
          </View>
        )
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    padding: 10,
    paddingVertical: 25,
    position: "relative",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    alignSelf: "center",
    right: 0,
    transform: [{ rotate: "90deg" }],
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "white",
  },

  contentForex: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  listForex: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
  },
});
