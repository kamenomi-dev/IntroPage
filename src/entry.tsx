import "preact/debug";
import { render } from "preact";

import { IntlProvider as LocalizationProvider } from "preact-i18n";

import { LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { ThemeProvider } from "./utils/themeProvider.tsx";

import { PageFrame } from "./pageFrame.tsx";
import { HomePage } from "./home.tsx";
import { ErrorPage } from "./error.tsx";

import "./styles/layout.less";
import axios from "axios";

export type TThemeStyle = {
  FloatTips: Record<string, string>;
  DefaultFont: {
    FontColor: string;
  };
  HomePage: {
    Preview: {
      BackgroundColor: string;
    };
  };
};

// Convert to JSON first.
axios.defaults.transformResponse = (data) => {
  try {
    return JSON.parse(data?.toString() || data);
  } catch {
    return data;
  }
};

const Main = () => (
  <>
    <ThemeProvider themePath={"/assets/themes/"}>
      <LocalizationProvider path={"/assets/languages/"}>
        <PageFrame>
          <LocationProvider>
            <ErrorBoundary>
              <Router>
                <Route path="/" component={HomePage} />
                <Route path="/error" component={HomePage} />
                <Route default={true} component={ErrorPage} />
              </Router>
            </ErrorBoundary>
          </LocationProvider>
        </PageFrame>
      </LocalizationProvider>
    </ThemeProvider>
  </>
);

render(<Main />, document.getElementById("app")!);
