export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--primary': '#000617',
    '--secondary': '#2d3436',
    '--tertiary': '#a489785e',
    '--accent': '#212121',
    '--warn': '#dc3545',
    '--shadows': 'rgba(0, 0, 0, 0.4)',
    '--shadowsOpacified': 'rgba(0, 0, 0, 0.8)',
    '--outlines': '#ddddddd2',
    '--font-color': 'whitesmoke',
    '--reverse-font-color': 'whitesmoke',
    '--gradient-one': 'rgba(52, 88, 128, 1)',
    '--gradient-one-faded': '#516488',
    '--gradient-two': 'rgba(48, 51, 65, 1)',
    '--opacity1': 'none',
    '--opacity2': '0.4',
    '--tos-border': '#1d2141',
    '--tos-bg-color': '#2E2D2D',
    '--test': '#1d2141',
    '--header': '#00657e',
    '--home-cards': '#1C2541',
    '--footer': '#000617'
  }
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--primary': '#D4E4E8',
    '--secondary': '#2d3436',
    '--tertiary': '#a489785e',
    '--accent': '#212121',
    '--warn': '#dc3545',
    '--shadows': 'rgba(0, 0, 0, 0.4)',
    '--shadowsOpacified': 'rgba(0, 0, 0, 0.8)',
    '--outlines': '#ddddddd2',
    '--font-color': 'black',
    '--reverse-font-color': '#212121',
    '--gradient-one': 'rgba(52, 88, 128, 1)',
    '--gradient-one-faded': '#516488',
    '--gradient-two': 'rgba(48, 51, 65, 1)',
    '--opacity1': '0.4',
    '--opacity2': 'none',
    '--tos-border': '#1d2141',
    '--tos-bg-color': '#A0A0A0',
    '--test': '#1d2141',
    '--header': '#f5f5f5',
    '--home-cards': '#f5f5f5',
    '--footer': '#f5f5f5'
  }
};
