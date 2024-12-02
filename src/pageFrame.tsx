import { type TThemeStyle } from "./entry";

import { Component, ComponentChildren, createContext } from "preact";
import { useContext, useLayoutEffect } from "preact/hooks";
import { PropsWithChildren } from "preact/compat";

import { useTheme } from "./utils/themeProvider";

import { NavigationBar, NavigationBarStyles } from "./components/navigationBar";
import { ETipsLevel, FloatTips } from "./components/floatTips";

type TNavigationItem = {
  id: string;
  isEnabled: boolean;
};

const PageFrameData = {
  itemData: new Array<TNavigationItem>(),
};

interface IPageFrameContext {
  readonly SetPageTitle: (title: string) => void;
  readonly HideNavigationItem: (id: string, enable: boolean) => void;
}

const PageFrameContext = createContext<IPageFrameContext | undefined>(
  undefined
);

export class PageFrame extends Component<PropsWithChildren> {
  public CalculateNavigationItems() {}

  render(props: PropsWithChildren): ComponentChildren {
    const theme = useTheme<TThemeStyle>();

    function SetPageTitle(title: string) {
      document.title = title;
    }

    function HideNavigationItem(id: string, enable: boolean) {
      PageFrameData.itemData.map((data) => {
        if (data.id == id) {
          data.isEnabled = enable;
        }
        return data;
      });
    }

    useLayoutEffect(() => {}, [PageFrameData]);

    return (
      <PageFrameContext.Provider
        value={{
          SetPageTitle,
          HideNavigationItem,
        }}
      >
        <FloatTips
          title="! 本网站正在编写中，敬请期待 !"
          tipslevel={ETipsLevel.Info}
          closable={true}
        />
        <NavigationBar id={"pageFrame"} style={NavigationBarStyles.transparent} fixed={true} items={[
          {name: "home", label:"主页"},
          {name: "article", label:"文章"},
        ]}/>
        {props.children}
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
