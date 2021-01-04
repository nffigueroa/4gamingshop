import { Provider } from "react-redux";
import "../styles/globals.css";
import withReduxStore from "../state/with-redux-store";
import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function MyApp({ Component, pageProps, reduxStore }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      }),
    [prefersDarkMode]
  );
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:3001/graphql",
    }),
  });
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default withReduxStore(MyApp);
