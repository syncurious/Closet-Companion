export interface Gradient {
  colors: string[];
}

export interface ThemeColorsType {
  primaryColors: {
    mainColor: string;
    bgColor: string;
    black1: string;
  };
  grays: {
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
    darkGrey: string;
  };
  accentColors: {
    yellow: string;
    red: string;
    mainDark: string;
    fillColor: string;
  };
  primaryAccents: {
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
  };
  backgroundShades: {
    surface1: string;
    surface2: string;
    surface3: string;
  };
  textColors: {
    textPrimary: string;
    textSecondary: string;
    textDisabled: string;
  };
  statusColors: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    accentGradient: Gradient;
    darkGradient: Gradient;
  };
  palette1: {
    [key: string]: string;
  };
}

const ThemeColors: ThemeColorsType = {
  primaryColors: {
    mainColor: '#F0A215',
    bgColor: '#121212',
    black1: '#000000',
  },
  grays: {
    grey1: '#999999',
    grey2: '#85898C',
    grey3: '#2A2A2A',
    grey4: '#393640',
    grey5: '#1E1E1E',
    darkGrey: '#1A1A1A',
  },
  accentColors: {
    yellow: '#F0A215',
    red: '#EA0000',
    mainDark: '#121212',
    fillColor: '#2A2A2A',
  },
  primaryAccents: {
    accent1: '#F0A215',
    accent2: '#4ECDC4',
    accent3: '#FF6B6B',
    accent4: '#7E57C2',
  },
  backgroundShades: {
    surface1: '#1E1E1E',
    surface2: '#252525',
    surface3: '#2A2A2A',
  },
  textColors: {
    textPrimary: '#FFFFFF',
    textSecondary: '#BBBBBB',
    textDisabled: '#666666',
  },
  statusColors: {
    success: '#4CAF50',
    warning: '#FFCA28',
    error: '#EF5350',
    info: '#2196F3',
  },
  gradients: {
    accentGradient: {
      colors: ['#F0A215', '#FF9800'],
    },
    darkGradient: {
      colors: ['#1A1A1A', '#212121'],
    },
  },
  palette1: {
    '50': '#FFF8E1',
    '100': '#FFECB3',
    '200': '#FFE082',
    '300': '#FFD54F',
    '400': '#FFCA28',
    '500': '#F0A215',
    '600': '#FFB300',
    '700': '#FFA000',
    '800': '#FF8F00',
    '900': '#FF6F00',
  },
};

export default ThemeColors;
