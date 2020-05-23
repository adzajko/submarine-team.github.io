export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--navColor': '#2c3e50'
  }
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--navColor': 'white'
  }
};
