import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

export const getName = () => {
  return screen.getByRole('textbox', {
    name: /name/i,
  });
};

export const getKey = () => {
  return screen.getByRole('textbox', {
    name: /key/i,
  });
};

export const getQuantity = () => {
  return screen.getByRole('spinbutton', {
    name: /number of uses/i,
  });
};

export const getSelectCategory = () => {
  return screen.getByRole('combobox', {
    name: /category/i,
  });
};

export const getSelectManufacturer = () => {
  return screen.getByRole('combobox', {
    name: /manufacturer/i,
  });
};

export const getAdditionalInformation = () => {
  return screen.getByText(/additional informations/i);
};

export const getNotes = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByLabelText(/notes/i);
};

export const getDateOfPurchase = async () => {
  return screen.getByRole('textbox', {
    name: /date of purchase/i,
  });
};

export const getExpirationDate = () => {
  return screen.getByRole('textbox', {
    name: /expiration date/i,
  });
};

export const getLicensedTo = () => {
  return screen.getByRole('textbox', {
    name: /email/i,
  });
};

export const getOrderNumber = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('textbox', {
    name: /order number/i,
  });
};

export const getPurchaseCost = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('spinbutton', {
    name: /purchase cost/i,
  });
};

export const getAddButtons = () => {
  return screen.getAllByRole('button', { name: /add/i });
};
