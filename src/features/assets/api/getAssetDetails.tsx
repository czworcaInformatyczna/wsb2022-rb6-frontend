/* eslint-disable @typescript-eslint/no-unused-vars */

export const getAssetDetails = async (id: number): Promise<any> => {
  return {
    id: 1,
    name: 'AssetName',
    Serial: 'AssetName',
    Model: 'YYEz64GgdQ3M',
    Manufacturer: 'Manufacturer',
    Category: 'category',
    Status: 'Ready to deploy',
    AssetTag: 'assetTag',
    Notes: 'some notes',
    Waranty: 6,
    Order_number: '123',
    Date_of_purchase: '22/02/2022',
    Purchase_cost: 200,
    Created_at: '22/02/2022',
    Checkouts: 2,
    Checkins: 2,
    Requests: 1,
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

export const getAssetLicenses = async (id: number): Promise<any> => {
  return [
    {
      id: '1',
      name: 'Photoshop',
      key: 'ba81-874f-3fbe-99b9-30624',
    },
    {
      id: '2',
      name: 'Photoshop',
      key: 'saddasds-as-as-aa-ff',
    },
  ];
};
