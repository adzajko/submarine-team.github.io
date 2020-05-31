export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
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
    '--reverse-font-color': '#212121',
    '--gradient-one': 'rgba(52, 88, 128, 1)',
    '--gradient-one-faded': '#516488',
    '--gradient-two': 'rgba(48, 51, 65, 1)',
    '--opacity1': 'none',
    '--opacity2': '0.4',
    '--tos-border': '#1d2141',
    '--tos-bg-color': '#2E2D2D',
    '--test': '#1d2141',
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
    '--font-color': 'black',
    '--reverse-font-color': 'whitesmoke',
    '--gradient-one': 'rgba(52, 88, 128, 1)',
    '--gradient-one-faded': '#516488',
    '--gradient-two': 'rgba(48, 51, 65, 1)',
    '--opacity1': '0.4',
    '--opacity2': 'none',
    '--tos-border': '#1d2141',
    '--tos-bg-color': '#A0A0A0',
    '--test': '#1d2141',
  }
};
