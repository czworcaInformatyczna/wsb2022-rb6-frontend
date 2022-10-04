import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

export const getAssetTag = () => {
  return screen.getByRole('textbox', {
    name: /asset tag/i,
  });
};

export const getSerial = () => {
  return screen.getByRole('textbox', {
    name: /serial/i,
  });
};

export const getSelectModel = () => {
  return screen.getByRole('combobox', {
    name: /select a model/i,
  });
};

export const getSelectStatus = () => {
  return screen.getByRole('combobox', {
    name: /select status/i,
  });
};

export const getAdditionalInformation = () => {
  return screen.getByText(/additional informations/i);
};

export const getOrderInformation = () => {
  return screen.getByText(/order information/i);
};

export const getNotes = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByLabelText(/notes/i);
};

export const getUploadPhoto = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('button', {
    name: /upload photo/i,
  });
};

export const getAssetName = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('textbox', {
    name: /asset name/i,
  });
};

export const getWaranty = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('spinbutton', {
    name: /waranty/i,
  });
};

export const getOrderNumber = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('textbox', {
    name: /order number/i,
  });
};

export const getDateOfPurchase = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('textbox', {
    name: /date of purchase/i,
  });
};

export const getPurchaseCost = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('spinbutton', {
    name: /purchase cost/i,
  });
};

export const getReceiptImage = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('button', {
    name: /upload receipt image/i,
  });
};

export const getAddButtons = () => {
  return screen.getAllByRole('button', { name: /add/i });
};
