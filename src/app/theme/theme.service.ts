import { Injectable } from '@angular/core';
import { Theme, light, dark } from './theme';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  emitCurrentActiveTheme: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.getLocalStorageTheme().name
  );

  private active: Theme = this.getLocalStorageTheme()
    ? this.getLocalStorageTheme()
    : light;
  private themes: Theme[] = [light, dark];

  getThemes(): Theme[] {
    return this.themes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  getLocalStorageTheme() {
    if (!localStorage.getItem('activeTheme')) {
      return light;
    }
    if (localStorage.getItem('activeTheme') === 'dark') {
      return dark;
    } else if (localStorage.getItem('activeTheme') === 'light') {
      return light;
    }
  }

  isDarkTheme() {
    return this.active.name === dark.name;
  }

  setDarkTheme() {
    localStorage.setItem('activeTheme', 'dark');
    this.checkCurrentActiveTheme('dark');
    this.setActiveTheme(dark);
  }

  setLightTheme() {
    localStorage.setItem('activeTheme', 'light');
    this.checkCurrentActiveTheme('light');
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme) {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  checkCurrentActiveTheme(name: string) {
    this.emitCurrentActiveTheme.next(name);
  }
}
