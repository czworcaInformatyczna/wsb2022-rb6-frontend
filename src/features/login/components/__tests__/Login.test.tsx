import { render, screen, waitFor } from '@testing-library/react';
import { Login } from 'features/login';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from 'react-query';
import { AuthContext, type IAuth } from 'providers/AuthProvider';
import { getQueryClient } from 'lib/react-query';
import { CustomThemeProvider } from 'providers/CustomTheme';
import { BrowserRouter } from 'react-router-dom';

const mockHandleLogin = jest.fn();

const getProviderValue = () => {
  const auth: IAuth = { email: '', token: '' };
  const handleLogin = mockHandleLogin;
  const setAuth = jest.fn();
  const handleLogout = jest.fn();
  return { auth, handleLogin, setAuth, handleLogout };
};

const renderLogin = () => {
  const user = userEvent.setup();
  render(
    <AuthContext.Provider value={getProviderValue()}>
      <QueryClientProvider client={getQueryClient()}>
        <CustomThemeProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </CustomThemeProvider>
      </QueryClientProvider>
    </AuthContext.Provider>,
  );
  const submitButton = screen.getByRole('button', { name: /Log in/i });
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  return { user, submitButton, emailInput, passwordInput };
};

test('should render form', () => {
  // given
  const { submitButton, emailInput, passwordInput } = renderLogin();

  // then
  expect(submitButton).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('should display required fields error if no values are provided', async () => {
  // given
  const { submitButton, user } = renderLogin();

  // when
  await user.click(submitButton);

  // then
  expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
});

test('should display error if email format is wrong', async () => {
  // given
  const { submitButton, emailInput, user } = renderLogin();

  // when
  await user.click(emailInput);
  await user.keyboard('not Email');
  await user.click(submitButton);

  // then
  expect(await screen.findByText(/Wrong email format/i)).toBeInTheDocument();
});

test('should login sucessfully', async () => {
  // given
  const { submitButton, emailInput, passwordInput, user } = renderLogin();

  // when
  await user.click(emailInput);
  await user.keyboard('test@mail.com');
  await user.click(passwordInput);
  await user.keyboard('123');
  await user.click(submitButton);

  // then
  await waitFor(() => expect(mockHandleLogin).toHaveBeenCalled());
});
