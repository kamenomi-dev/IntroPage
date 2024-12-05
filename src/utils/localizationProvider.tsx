import { Component, createContext } from "preact";
import { PropsWithChildren } from "preact/compat";

interface IContext {
  currLanguage: string;
  SelectLanguage: (locale: string) => void;
}

const LocalizationContext = createContext<IContext | undefined>(undefined);

interface IProps extends PropsWithChildren {
  languagePath: string;
  defaultLanguage?: string;
  transformLanguage?: (currLocale: string) => string | undefined;
}

export class LocalizationProvider extends Component<IProps> {
  public static KnownLanguages = new Array<string>();

  public constructor(props: IProps) {
    super(props);
  }

  public ProcessLanguage() {
    const { transformLanguage } = this.props;

    LocalizationProvider.KnownLanguages = new Array<string>(
      ...navigator.languages.map(
        (locale) => transformLanguage?.(locale) || locale
      )
    );
  }

  public SelectLanguage(locale: string) {}

  render(props: IProps) {
    this.ProcessLanguage();
    
    return (
      <LocalizationContext.Provider value={{}}>
        current: {LocalizationProvider.KnownLanguages.join(" ")}
      </LocalizationContext.Provider>
    );
  }
}
