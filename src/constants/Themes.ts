import { MD3DarkTheme, MD3LightTheme, MD3Theme, useTheme } from 'react-native-paper'
import { Colors } from './Colors'
import { Theme } from '@react-navigation/native'
import { MD3Colors, MD3Typescale } from 'react-native-paper/lib/typescript/types'

const fonts: MD3Typescale = {
  displayLarge: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: 0
  },
  displayMedium: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0
  },
  displaySmall: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0
  },
  headlineLarge: {
    fontFamily: 'PalanquinDark-Semibold',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 40,
    letterSpacing: 0
  },
  headlineMedium: {
    fontFamily: 'PalanquinDark-Semibold',
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 0
  },
  headlineSmall: {
    fontFamily: 'PalanquinDark-Semibold',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 0
  },
  titleLarge: {
    fontFamily: 'PalanquinDark-SemiBold',
    fontWeight: 'normal',
    fontSize: 32,
    lineHeight: 0,
    letterSpacing: 0
  },
  titleMedium: {
    fontFamily: 'PalanquinDark-Regular',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 0,
    letterSpacing: 0.15
  },
  titleSmall: {
    fontFamily: 'PalanquinDark-SemiBold',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 0,
    letterSpacing: 0.1
  },
  bodyLarge: {
    fontFamily: 'PalanquinDark-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 0,
    letterSpacing: 0
  },
  bodyMedium: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25
  },
  bodySmall: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4
  },
  labelLarge: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1
  },
  labelMedium: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5
  },
  labelSmall: {
    fontFamily: 'PalanquinDark-Regular',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0
  },
  default: {
    fontFamily: 'PalanquinDark-Regular',
    fontWeight: 'normal',
    letterSpacing: 0
  }
}

export const lightTheme: MD3Theme & Theme = {
  ...MD3LightTheme,
  dark: false,
  version: 3,
  mode: 'adaptive',
  roundness: 15,
  colors: {
    ...MD3LightTheme.colors,
    card: Colors.black,
    text: Colors.black,
    border: Colors.black,
    notification: Colors.black,
    primary: Colors.tawny,
    onPrimary: Colors.buttonText,
    primaryContainer: Colors.cocoaBrown,
    onPrimaryContainer: Colors.white,
    secondary: Colors.butterscotch,
    onSecondary: Colors.black,
    secondaryContainer: Colors.buffPeach,
    onSecondaryContainer: Colors.black,
    tertiary: Colors.lime,
    onTertiary: Colors.black,
    tertiaryContainer: Colors.pistachioLime,
    onTertiaryContainer: Colors.black,
    background: Colors.white,
    onBackground: Colors.black,
    surface: Colors.white,
    onSurface: Colors.black,
    surfaceVariant: Colors.placeholder,
    onSurfaceVariant: Colors.placeholder3,
    outline: Colors.placeholder3,
    outlineVariant: Colors.black,
    error: Colors.negative,
    onError: Colors.buttonText,
    errorContainer: Colors.negativeLight,
    onErrorContainer: Colors.negativeDark,
    shadow: Colors.black,
    inverseOnSurface: Colors.buttonText,
    inverseSurface: Colors.black,
    inversePrimary: Colors.tawny,
    backdrop: '#00000040',
    elevation: {
      level0: 'transparent',
      level1: 'rgba(204, 97, 43, 0.05)',
      level2: 'rgba(204, 97, 43, 0.08)',
      level3: 'rgb(238, 232, 244)',
      level4: 'rgba(204, 97, 43, 0.12)',
      level5: 'rgba(204, 97, 43, 0.14)'
    },
    surfaceDisabled: Colors.placeholder2,
    onSurfaceDisabled: Colors.placeholder3
  } as MD3Colors & Theme['colors'],
  fonts: {
    ...fonts
  }
}

export const darkTheme: MD3Theme & Theme = {
  ...MD3DarkTheme,
  dark: true,
  version: 3,
  mode: 'adaptive',
  roundness: 15,
  colors: {
    ...MD3DarkTheme.colors,
    card: Colors.white,
    text: Colors.white,
    border: Colors.white,
    notification: Colors.white,
    primary: Colors.tawny,
    onPrimary: Colors.buttonText,
    primaryContainer: Colors.cocoaBrown,
    onPrimaryContainer: Colors.white,
    secondary: Colors.butterscotch,
    onSecondary: Colors.white,
    secondaryContainer: Colors.buffPeach,
    onSecondaryContainer: Colors.white,
    tertiary: Colors.lime,
    onTertiary: Colors.white,
    tertiaryContainer: Colors.pistachioLime,
    onTertiaryContainer: Colors.white,
    background: Colors.black,
    onBackground: Colors.white,
    surface: Colors.black,
    onSurface: Colors.white,
    surfaceVariant: Colors.placeholder,
    onSurfaceVariant: Colors.placeholder3,
    outline: Colors.placeholder,
    outlineVariant: Colors.white,
    error: Colors.negative,
    onError: Colors.buttonText,
    errorContainer: Colors.negativeLight,
    onErrorContainer: Colors.negativeDark,
    shadow: Colors.white,
    inverseOnSurface: Colors.black,
    inverseSurface: Colors.white,
    inversePrimary: Colors.tawny,
    backdrop: Colors.white,
    elevation: {
      level0: 'transparent',
      level1: 'rgba(204, 97, 43, 0.05)',
      level2: 'rgba(204, 97, 43, 0.08)',
      level3: 'rgba(204, 97, 43, 0.11)',
      level4: 'rgba(204, 97, 43, 0.12)',
      level5: 'rgba(204, 97, 43, 0.14)'
    },
    surfaceDisabled: Colors.placeholder4,
    onSurfaceDisabled: Colors.placeholder
  } as MD3Theme['colors'] & Theme['colors'],
  fonts: {
    ...fonts
  }
}

export type AppTheme = typeof lightTheme
export const useAppTheme = () => useTheme<AppTheme>()
