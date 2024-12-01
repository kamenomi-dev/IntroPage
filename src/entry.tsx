import { render } from "preact";

import { LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { ThemeProvider } from "./utils/themeProvider.tsx";

import { PageFrame } from "./pageFrame.tsx";
import { HomePage } from "./home.tsx";
import { ErrorPage } from "./error.tsx";

import "./styles/layout.less";

const themeStyles = {
  Lightness: {
    FloatTips: {
      Info: "#74C0FC",
      Advice: "#66D9E8",
      Important: "#FFC078",
      Fatal: "#ffA8A8"
    },
    DefaultFont: {
      FontColor: "black"
    },
    NavigationBar: {
      BackgroundColor: "#DEE2E6"
    },
    HomePage: {
      Preview: {
        BackgroundColor: "#F8F9FA"
      }
    }
  },
  Darkness: {
    FloatTips: {
      Info: "#1971C2",
      Advice: "#0C8599",
      Important: "#E8590C",
      Fatal: "#E03131"
    },
    DefaultFont: {
      FontColor: "white"
    },
    NavigationBar: {
      BackgroundColor: "transparent"
    },
    HomePage: {
      Preview: {
        BackgroundColor: "#212529"
      }
    }
  },
};

const Main = () => (
  <>
    <ThemeProvider themes={themeStyles}>
      <PageFrame>
        <LocationProvider>
          <ErrorBoundary>
            <Router>
              <Route path="/" component={HomePage} />
              <Route default={true} component={ErrorPage} />
            </Router>
          </ErrorBoundary>
        </LocationProvider>
      </PageFrame>
    </ThemeProvider>
  </>
);

render(<Main />, document.getElementById("app")!);
