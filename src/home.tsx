import { type TThemeStyle } from "./entry";

import { Component } from "preact";

import { useTheme } from "./utils/themeProvider";
import { usePageFrame } from "./pageFrame";

import logoImagePath from "/assets/logo.jpg";

export class HomePage extends Component {
  render() {
    const frame = usePageFrame(),
      theme = useTheme<TThemeStyle>();
    frame.SetPageTitle("Kamenの小窝");

    return (
      <>
        <div
          id={"homePage-preview"}
          style={{
            backgroundColor: theme.themeValues.HomePage.Preview.BackgroundColor,
          }}
        >
          <div id={"preview-content"} class={"Unselectable"}>
            <img
              id={"content-logo"}
              title={"Logo"}
              src={logoImagePath}
              style={{
                display: "inline-block",
              }}
            />
            <div
              id={"content-context"}
              style={{
                display: "inline-block",
                color: theme.themeValues.DefaultFont.FontColor,
              }}
            >
              <h2>个人页</h2>
              <p>00后，是学生。</p>
              <p>现居 广东</p>
              <p>兴趣爱好：编程、打羽毛球等</p>
              <p>业余前端开发 及 Win32平台程序开发</p>
              <p>会写但未精通的语言: (Java/Type)Script、C++</p>
              <p>开发环境依赖: Bun/Node、Win32</p>
              <hr />
            </div>
          </div>
        </div>
      </>
    );
  }
}
