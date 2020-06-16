export interface Theme {
  name: string;
  properties: any;
}

export const dark: Theme = {
  name: 'dark',
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
    '--gradient-one': '#000617',
    '--gradient-one-faded': '#1c2541',
    '--gradient-two': '#303341',
    '--opacity1': 'none',
    '--opacity2': '0.4',
    '--tos-border': '#1d2141',
    '--tos-bg-color': '#212121',
    '--test': '#1d2141',
    '--header': '#00657e',
    '--home-cards': '#1C2541',
    '--footer': '#000617',
    '--login-background': '#f5f5f5'
  }
};

export const light: Theme = {
  name: 'light',
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
    '--gradient-one': '#D4E4E8',
    '--gradient-one-faded': 'rgba(245, 245, 245, 1)',
    '--gradient-two': '#f5f5f5',
    '--opacity1': '0.4',
    '--opacity2': 'none',
    '--tos-border': '#1d2141',
    '--tos-bg-color': '#f5f5f5',
    '--test': '#1d2141',
    '--header': '#f5f5f5',
    '--home-cards': '#f5f5f5',
    '--footer': '#f5f5f5',
    '--login-background': '#D4E4E8'
  }
};
