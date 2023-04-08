import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux';
import userEvent from '@testing-library/user-event';

test('renders registration dialog on load with the page loaded in the background', async () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  const registrationWelcomePrompt = screen.getByText(/Tell me about your family/i);
  expect(registrationWelcomePrompt).toBeInTheDocument();


  const backgroundHeadertitle = screen.getByText(/CANADA FOOD GUIDE/i);
  expect(backgroundHeadertitle).toBeInTheDocument();
});


test('single vs family toggle works and updates view', async () => {

  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  const familyButton = screen.getByTestId("isFamilyBtn");
  expect(familyButton).toBeInTheDocument();

  await act(async () => {
    await userEvent.click(familyButton)
  });
  const familyNameTextField = screen.getByTestId("familyNameTxf");

  await act(async () => {
    await userEvent.click(familyNameTextField)
  });
  userEvent.keyboard('Maconi')

});
