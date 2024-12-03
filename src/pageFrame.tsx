import { Component, ComponentChildren, createContext } from "preact";
import { useContext, useLayoutEffect } from "preact/hooks";
import { PropsWithChildren } from "preact/compat";

import { NavigationBar, NavigationBarStyles } from "./components/navigationBar";
import { ETipsLevel, FloatTips } from "./components/floatTips";

import LogoPicturePath from "./assets/logo.jpg";

type TNavigationItem = {
  id: string;
  isEnabled: boolean;
};

const PageFrameData = {
  itemData: new Array<TNavigationItem>(),
};

interface IPageFrameContext {
  readonly SetPageTitle: (title: string) => void;
}

const PageFrameContext = createContext<IPageFrameContext | undefined>(
  undefined
);

export class PageFrame extends Component<PropsWithChildren> {
  render(props: PropsWithChildren): ComponentChildren {
    function SetPageTitle(title: string) {
      document.title = title;
    }

    useLayoutEffect(() => {}, [PageFrameData]);

    return (
      <PageFrameContext.Provider
        value={{
          SetPageTitle,
        }}
      >
        <FloatTips
          title="! 本网站正在编写中，敬请期待 !"
          tipslevel={ETipsLevel.Info}
          closable={true}
        />
        <NavigationBar id={"pageFrame"} style={NavigationBarStyles.transparent} sticky={true}
        headPicture={LogoPicturePath} items={[
          {name: "home", label:"主页", callback: () => alert("Jmp /home")},
          {name: "article", label:"文章", callback: () => alert("Jmp /article")},
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
