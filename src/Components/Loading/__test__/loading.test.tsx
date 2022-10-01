import { render, screen } from '@testing-library/react';
import LoadingScreen from '../loading';
import { TextSize } from '../domain';

describe('LoadingScreen', () => {
  it('should display LoadingScreen', () => {
    render(<LoadingScreen />);
    const loadingBox = screen.getByTestId('loadingBox');
    expect(loadingBox).toBeVisible();
  });

  it('should display text under circle', () => {
    render(<LoadingScreen displayText />);
    const headerText = screen.getByText('Loading... Please wait...');
    expect(headerText).toBeVisible();
  });

  it('should change text size', () => {
    render(<LoadingScreen displayText textSize={TextSize.H6} />);
    const headerText = screen.getByRole('heading', { level: 6 });

    expect(headerText).toBeInTheDocument();
  });
});
