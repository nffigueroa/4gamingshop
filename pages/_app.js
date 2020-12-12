import { Provider } from "react-redux";
import "../styles/globals.css";
import withReduxStore from "../state/with-redux-store";
import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { useMemo } from "react";

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
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default withReduxStore(MyApp);
