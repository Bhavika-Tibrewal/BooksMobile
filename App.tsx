import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const API_KEY =
  "santiagodecuba::stepzen.net+1000::6962a48871cad50350afe9ed5ac9ffbcc52374bab1a8fa799570fb3f2aa80827";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const client = new ApolloClient({
    uri: "https://santiagodecuba.stepzen.net/api/singing-toucan/__graphq",
    headers: {
      Authorization: `Apikey ${API_KEY}`,
    },
    cache: new InMemoryCache(),
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
