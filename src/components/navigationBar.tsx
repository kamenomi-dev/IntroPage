import { type TThemeStyle } from "../entry";

import { Component, createContext } from "preact";
import { useContext } from "preact/hooks";

import { useTheme } from "../utils/themeProvider";

type TItem = {
  name: string;
  label: string;
  callback: MouseEvent;
};

interface IContext {
  RemoveItem: (name: string) => void;
}

interface IProp {
  items?: Array<TItem>;
  fixed: boolean;
  transparent: boolean;
}

interface IState {
  items: Array<TItem>;
}

const NavigationBarContext = createContext<IContext | undefined>(undefined);

export class NavigationBar extends Component<Partial<IProp>, IState> {
  public constructor(props: IProp) {
    super(props);

    this.state = {
      items: props.items || new Array<TItem>(),
    };
  }

  render(props: IProp) {
    props = {
      fixed: Boolean(props.fixed),
      transparent: Boolean(props.transparent),
    };

    const currTheme = useTheme<TThemeStyle>().themeValues;

    const RemoveItem = (targetName: string) => {
      this.setState({
        items: this.state.items.filter(({ name }) => name != targetName),
      });
    };

    return (
      <NavigationBarContext.Provider value={{ RemoveItem }}>
        <div
          id={"NavigationBar"}
          style={{
            position: props.fixed ? "fixed" : "relative",
            backgroundColor: currTheme.NavigationBar.BackgroundColor,
          }}
        ></div>
      </NavigationBarContext.Provider>
    );
  }
}


export function useNavigationBar() {
  const context = useContext(NavigationBarContext);
  if (typeof context == "undefined") {
    throw new Error('Function "useNavigationBar" must be used within a navigationBar!');
  }

  return context;
}