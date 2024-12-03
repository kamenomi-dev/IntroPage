import { type TThemeStyle } from "../entry";

import { Component } from "preact";

import { useTheme } from "../utils/themeProvider";

export enum ETipsLevel {
  Info,
  Advice,
  Important,
  Fatal,
}

interface IFloatTipsProp {
  title: string;
  closable?: boolean;
  tipslevel: ETipsLevel;
}

export class FloatTips extends Component<IFloatTipsProp> {
  public constructor(props: IFloatTipsProp) {
    super({
      ...props,
      closable: Boolean(props.closable),
      tipslevel: props.tipslevel || ETipsLevel.Info,
    });
  }

  render(props: IFloatTipsProp) {
    const theme = useTheme<TThemeStyle>();

    return (
      <div
        id={"Utils-FloatTips"}
        class={"Unselectable"}
        style={{
          color: theme.themeValues.DefaultFont.FontColor,
          backgroundColor:
            theme.themeValues.FloatTips[ETipsLevel[props.tipslevel]],
        }}
      >
        {props.title}
        {props.closable ? (
          <div
            id={"FloatTips-CloseBtn"}
            onClick={() => {
              const self = document.getElementById("Utils-FloatTips");
              self?.classList.add("slideOut");
              setTimeout(() => {
                self?.remove();
              }, 1000);
            }}
          >
            {"\u00D7"}
          </div>
        ) : (
          []
        )}
      </div>
    );
  }
}
