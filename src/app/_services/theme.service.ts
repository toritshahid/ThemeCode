import { Injectable, Inject, EventEmitter } from '@angular/core';
import { darkTheme } from '../themes/dark-theme';
import { THEMES, ACTIVE_THEME, Theme } from '../themes/symbols';

@Injectable()
export class ThemeService {

  themeChange = new EventEmitter<Theme>();

  constructor(@Inject(THEMES) public themes: Theme[], @Inject(ACTIVE_THEME) public theme: string) {
    const darkModeOn =window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if(darkModeOn){
        this.setTheme('dark');
      }
  }


  getActiveTheme() {
      const theme = this.themes.find(t => t.name === this.theme);
      if (!theme) {
        throw new Error(`Theme not found: '${this.theme}'`);
      }
      return theme;
  }

  setTheme(name: string) {
    this.theme = name;
    this.themeChange.emit(this.getActiveTheme());
  }

}
