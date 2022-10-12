/* eslint-disable @typescript-eslint/no-unused-vars */

export const getAssetDetails = async (id: number) => {
  return {
    keys: [
      'Id',
      'Name',
      'Serial',
      'Model',
      'Manufacturer',
      'Category',
      'Status',
      'AssetTag',
      'Notes',
      'Waranty',
      'Order number',
      'Date of purchase',
      'Purchase cost',
      'Created at',
      'Checkouts',
      'Checkins',
      'Requests',
    ],
    values: [
      1,
      'AssetName',
      'YYEz64GgdQ3M',
      'Model',
      'Manufacturer',
      'category',
      'Ready to deploy',
      'assetTag',
      'some notes',
      6,
      '123',
      '22/02/2022',
      200,
      '22/02/2022',
      2,
      2,
      1,
    ],
  };
};

export const getAssetPhoto = async (id: number) => {
  return {
    image: 'http://cdn.eso.org/images/screen/eso1907a.jpg',
  };
};

export const getAssetQRCode = async (id: number) => {
  return {
    QRCode:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Qr-witaj-w-wikiped.svg/1024px-Qr-witaj-w-wikiped.svg.png',
  };
};
