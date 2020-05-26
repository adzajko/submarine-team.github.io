export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--primary': 'white',
    '--secondary': 'orange',
    '--tertiary': 'pink',
    '--accent': '#212121',
    '--warn': '#dc3545',
    '--shadows': 'rgba(0, 0, 0, 0.4)',
    '--shadowsOpacified': 'rgba(0, 0, 0, 0.8)',
    '--outlines': '#ddddddd2',
    '--font-color': 'black',
    '--reverse-font-color': 'whitesmoke',
    '--gradient-one': 'rgba(52, 88, 128, 1)',
    '--gradient-one-faded': '#516488',
    '--gradient-two': 'rgba(48, 51, 65, 1)'
  }
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--primary': '#2c3e50',
    '--secondary': '#2d3436',
    '--tertiary': '#a489785e',
    '--accent': '#212121',
    '--warn': '#dc3545',
    '--shadows': 'rgba(0, 0, 0, 0.4)',
    '--shadowsOpacified': 'rgba(0, 0, 0, 0.8)',
    '--outlines': '#ddddddd2',
    '--font-color': 'whitesmoke',
    '--reverse-font-color': 'black',
    '--gradient-one': 'rgba(52, 88, 128, 1)',
    '--gradient-one-faded': '#516488',
    '--gradient-two': 'rgba(48, 51, 65, 1)'
  }
};
