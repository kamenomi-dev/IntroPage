import { Component, ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";

import { useTheme } from "./utils/themeProvider";
import { ETipsLevel, FloatTips } from "./utils/floatTips";

interface IPageFrameContext {
  readonly SetPageTitle: (title: string) => void;
}

const PageFrameContext = createContext<IPageFrameContext | undefined>(
  undefined
);

interface IPageFrameProps {
  children?: ComponentChildren;
}

export class PageFrame extends Component<IPageFrameProps> {
  render(props: IPageFrameProps): ComponentChildren {
    const theme = useTheme();
    return (
      <PageFrameContext.Provider
        value={{
          SetPageTitle: (title: string) => {
            document.title = title;
          },
        }}
      >
        {props.children}
        <div
          id={"pageFrame-navigationBar"}
          style={{
            backgroundColor: theme.themeValues.NavigationBar.BackgroundColor,
          }}
        ></div>
        <FloatTips title="! 本网站正在编写中，敬请期待 !" tipslevel={ETipsLevel.Info} closable={true}/>
      </PageFrameContext.Provider>
    );
  }
}

export const usePageFrame = () => {
  console.log(PageFrameContext);
  const context = useContext(PageFrameContext);
  if (typeof context == "undefined") {
    throw new Error(
      'Function "usePageFrameContext" must be used within PageFrame!'
    );
  }

  return context;
};
