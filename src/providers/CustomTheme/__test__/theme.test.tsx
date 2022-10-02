import {
  CustomTheme,
  GetColorMode,
  GetColorModeFromLocalStorage,
  ThemeMode,
} from '@/providers/CustomTheme';

describe('CustomTheme', () => {
  it('should be light mode', () => {
    const mode = CustomTheme(ThemeMode.LIGHT);
    expect(mode.palette.mode).toBe('light');
  });

  it('should be dark mode', () => {
    const mode = CustomTheme(ThemeMode.DARK);
    expect(mode.palette.mode).toBe('dark');
  });
});

describe('colorMode', () => {
  it('should return light mode', () => {
    const mode = GetColorMode(ThemeMode.DARK);
    expect(mode).toBe(ThemeMode.LIGHT);
  });

  it('should return dark mode', () => {
    const mode = GetColorMode(ThemeMode.LIGHT);
    expect(mode).toBe(ThemeMode.DARK);
  });
});

describe('colorMode from localStorage', () => {
  it('should return light mode', () => {
    const mode = GetColorModeFromLocalStorage();
    expect(mode).not.toBeFalsy();
  });
});
