import { Component } from "preact";

import { useTheme } from "./themeProvider";

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
    const theme = useTheme();
    console.log(this.props);
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
              document.getElementById("Utils-FloatTips")?.remove();
            }}
          >
            ×
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
