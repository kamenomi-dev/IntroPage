import { Component, ComponentChildren, createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";

import axios from "axios";
import cookieManager from "./cookieManager";

type TTheme = Record<string, any>;

interface IThemeContext {
  readonly themeMode: string;
  readonly themeValues: TTheme;
  readonly saveInCookie: boolean;
  readonly SetThemeMode: (newTheme: string) => void;
  readonly GetThemeMode: () => string;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface IThemeProviderProp {
  themePath: string;
  initialTheme?: string;
  saveInCookie?: boolean;
  children?: ComponentChildren;
}

interface IThemeProviderState {
  readonly themeMode: string;
  readonly loadedThemes: Map<string, object>;
}

export class ThemeProvider extends Component<
  IThemeProviderProp,
  IThemeProviderState
> {
  public constructor(props: IThemeProviderProp) {
    super(props);

    this.state = {
      themeMode:
        props.initialTheme ||
        cookieManager.themeMode ||
        ThemeProvider.AutoSelectTheme(),
      loadedThemes: new Map<string, object>(),
    };

    this.props.saveInCookie ||= cookieManager.isSaveThemeMode;
  }

  public static AutoSelectTheme(): string {
    try {
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "lightness";
      }
    } catch {
      console.warn(
        "Warn! You may be using an outdated web browser and failed to get the browser theme!"
      );
    }

    return "darkness";
  }

  public LoadThemeFile(theme: string) {
    return new Promise<IThemeProviderState>((resolve, reject) => {
      if (this.state.loadedThemes.get(theme) != undefined) {
        return reject("Has been loaded");
      }

      const props = this.props;

      axios
        .get(props.themePath + theme + ".json")
        .then(({ data: styleSheet, status, statusText }) => {
          if (status != axios.HttpStatusCode.Ok) {
            return console.warn(
              `Request theme file failed! \n${status}: ${statusText}`
            );
          }
          if (typeof styleSheet == "object") {
            const themes = new Map(this.state.loadedThemes); // I hope I could improve this?
            themes.set(theme, styleSheet);

            resolve({
              themeMode: theme,
              loadedThemes: themes,
            });
          }
        });
    });
  }

  render(props: IThemeProviderProp): ComponentChildren {
    const { themeMode, loadedThemes } = this.state;

    const GetCurrentThemeMode = () => themeMode;
    const SetCurrentThemeMode = (theme: string): void => {
      theme = theme.toLowerCase();

      if (loadedThemes.get(theme) != undefined) {
        return this.setState({
          themeMode: theme,
        });
      }
    };

    this.LoadThemeFile(themeMode).then((theme) => {
      this.setState(theme);
    }).catch(() => {});

    useEffect(() => {
      const themeListener = window.matchMedia("(prefers-color-scheme: light)");
      const listener = ({ matches }: { matches: boolean }) => {
        SetCurrentThemeMode(matches ? "lightness" : "darkness");
      };

      themeListener.addEventListener("change", listener);
      return () => {
        themeListener.removeEventListener("change", listener);
      };
    }, []);

    const currentThemeValues = loadedThemes.get(themeMode)!;

    return (
      <ThemeContext.Provider
        value={{
          themeMode: themeMode,
          themeValues: currentThemeValues,
          saveInCookie: props.saveInCookie!,
          SetThemeMode: SetCurrentThemeMode,
          GetThemeMode: GetCurrentThemeMode,
        }}
      >
        {props.children}
      </ThemeContext.Provider>
    );
  }
}

export function useTheme<Theme>() {
  const context = useContext(ThemeContext);
  if (typeof context == "undefined") {
    throw new Error('Function "useTheme" must be used within a ThemeProvider!');
  }

  // Bad convert
  return context as Omit<IThemeContext, "themeValues"> & { themeValues: Theme };
}
