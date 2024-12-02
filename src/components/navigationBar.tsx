import { type TThemeStyle } from "../entry";

import { Component, Context, createContext, JSX } from "preact";
import { useContext } from "preact/hooks";

import { useTheme } from "../utils/themeProvider";

interface IContext {
  RemoveItem: (name: string) => void;
}

export enum NavigationBarStyles {
  default,
  transparent,
}

type TItem = {
  name: string;
  label: string;
  callback?: JSX.MouseEventHandler<HTMLButtonElement>;
};

interface IProp {
  id: string;
  items?: Array<TItem>;

  style?: NavigationBarStyles;
  fixed?: boolean;
}

interface IState {
  items: Array<TItem>;
}

const contextList = new Map<string, Context<IContext | undefined>>();

export class NavigationBar extends Component<IProp, IState> {
  public constructor(props: IProp) {
    super(props);

    const { items, id } = props;

    if (typeof id != "string") {
      throw new Error("NavigationBar component id is not set! ");
    }

    this.state = {
      items: items || new Array<TItem>(),
    };

    if (contextList.has(id)) {
      console.warn(
        `Using the same id ${id} in NavigationBar may lead to unknown error. `
      );
    }
    contextList.set(id, createContext<IContext | undefined>(undefined));
  }

  render(props: IProp) {
    const { id, style, fixed } = {
      ...props,
      style: props.style || NavigationBarStyles.default,
      fixed: Boolean(props.fixed),
    };

    const currTheme = useTheme<TThemeStyle>().themeValues;
    const currContext = contextList.get(id)!;

    const RemoveItem = (targetName: string) => {
      this.setState({
        items: this.state.items.filter(({ name }) => name != targetName),
      });
    };

    return (
      <currContext.Provider value={{ RemoveItem }}>
        <div
          id={"NavigationBar"}
          class={`style-${NavigationBarStyles[style!]}`}
          style={{
            position: fixed ? "fixed" : "relative",
          }}
        >
          {this.state.items.map((val) => {
            return (
              <button
                x-itemId={val.name}
                type={"button"}
                onClick={val.callback}
                style={{
                  color: currTheme.DefaultFont.FontColor,
                }}
              >
                {val.label}
              </button>
            );
          })}
        </div>
      </currContext.Provider>
    );
  }
}

export function useNavigationBar(id: string) {
  const context = contextList.get(id);
  if (context == undefined) {
    throw new Error(
      'Function "useNavigationBar" must be used within a navigationBar!'
    );
  }

  const contextValue = useContext(context);
  if (contextValue == undefined) {
    throw new Error(
      'Function "useNavigationBar" must be used within a navigationBar!'
    );
  }

  return contextValue;
}
