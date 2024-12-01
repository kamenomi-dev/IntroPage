import Cookies from "js-cookie";

export default new (class CookieManager {
  public set isSaveThemeMode(enable: boolean) {
    this.Set("is_save_theme_mode", String(enable));
  }

  public get isSaveThemeMode(): boolean {
    return Boolean(this.Get("is_save_theme_mode"));
  }

  public set themeMode(themeMode: string) {
    this.Set("theme_mode", themeMode);
  }

  public get themeMode(): string | undefined {
    return this.Get("theme_mode");
  }

  public Set(key: string, value: string) {
    return Cookies.set(key, value);
  }

  public SetEx(key: string, value: string, options: Cookies.CookieAttributes) {
    return Cookies.set(key, value, options);
  }

  public Get(key: string) {
    return Cookies.get(key);
  }
})();
