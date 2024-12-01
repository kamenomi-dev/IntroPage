import { Component, ComponentChildren, createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import cookieManager from "./cookieManager";

type TTheme = Record<string, any>;

interface IThemeContext {
  readonly themeMode: string;
  readonly themeValues: TTheme;
  readonly saveInCookie: boolean;
  readonly SetThemeMode: (newTheme: string) => void;
  readonly GetThemeMode: () => string;
};

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface IThemeProviderProp {
  themes: TTheme;
  initialTheme?: string;
  saveInCookie?: boolean;
  children?: ComponentChildren;
}

interface IThemeProviderState {
  readonly themeMode: string;
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
    };

    this.props.saveInCookie ||= cookieManager.isSaveThemeMode;
  }

  public static AutoSelectTheme(): string {
    try {
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "Lightness";
      }
    } catch {
      console.warn(
        "Warn! You may be using an outdated web browser and failed to get the browser theme!"
      );
    }

    return "Darkness";
  }

  render(props: IThemeProviderProp): ComponentChildren {
    const GetCurrentThemeMode = () => this.state.themeMode;
    const SetCurrentThemeMode = (newTheme: string) => {
      if (!Object.hasOwn(props!.themes, newTheme)) {
        console.warn(`Warn! Theme "${newTheme}" is not defined in themes.`);
        return;
      }

      this.setState({
        themeMode: newTheme,
      });
    };

    useEffect(() => {
      const themeListener = window.matchMedia("(prefers-color-scheme: light)");
      const listener = ({ matches }: { matches: boolean }) => {
        SetCurrentThemeMode(matches ? "Lightness" : "Darkness");
      };

      themeListener.addEventListener("change", listener);
      return () => {
        themeListener.removeEventListener("change", listener);
      };
    }, []);

    const currentThemeValues = props.themes[this.state.themeMode] || {};

    return (
      <ThemeContext.Provider
        value={{
          themeMode: this.state.themeMode,
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (typeof context == "undefined") {
    throw new Error('Function "useTheme" must be used within a ThemeProvider!');
  }

  return context;
};
