export const Colors = {
  primary: '#F0A215', // from primaryColors.mainColor
  secondary: '#121212', // from primaryColors.bgColor or accentColors.mainDark
  lightBackground: '#1E1E1E', // closest from backgroundShades.surface1
  darkBackground: '#121212', // same as secondary
  lightCard: '#2A2A2A', // from grays.grey3 / accentColors.fillColor
  darkCard: '#1A1A1A', // from grays.darkGrey
  textSub: '#BBBBBB', // from textColors.textSecondary
  actionRed: '#EA0000', // from accentColors.red
  actionBlue: '#2196F3', // from statusColors.info
  actionyellow: '#F0A215', // same as primary, reused
  accent: '#4ECDC4', // from primaryAccents.accent2
  white: '#FFFFFF', // from textColors.textPrimary
  black: '#000000', // from primaryColors.black1
  border: '#2A2A2A', // reused from grey3 / fillColor
  darkGreen: '#121212', // reused for consistency with darkBackground
  textSubOne: '#85898C', // from grays.grey2
  textButtonColor: '#666666', // from textColors.textDisabled
  tabColor: '#393640', // from grays.grey4
  subHeading: '#999999', // from grays.grey1
};

export type ColorTypes = keyof typeof Colors;
