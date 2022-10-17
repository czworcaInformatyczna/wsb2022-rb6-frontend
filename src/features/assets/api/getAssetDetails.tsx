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
      expiration_date: '22.12.2032',
    },
    {
      id: '2',
      name: 'Photoshop',
      key: 'saddasds-as-as-aa-ff',
      expiration_date: '22.12.2032',
    },
  ];
};

export const getAssetComponents = async (id: number): Promise<any> => {
  return [
    {
      id: '1',
      name: 'PNY XLR8 RGB 16GB 3200Mhz',
      serial: 'ba81-874f-3fbe-99b9-30624',
      category: 'RAM',
    },
    {
      id: '2',
      name: 'GOODRAM Irdm X 8GB 3200MHz',
      serial: 'ba81-874f-3fbe-99b9-30624',
      category: 'RAM',
    },
  ];
};

export const getAssetHistory = async (id: number): Promise<any> => {
  return [
    {
      id: '1',
      date: '22/09/2022',
      user: 'Wojtek',
      action: 'Request',
      target: '',
      notes: '',
    },
    {
      id: '2',
      date: '22/10/2022',
      user: 'Admin',
      action: 'Deploy',
      target: 'Wojtek1',
      notes: 'some info',
    },
  ];
};

export const getAssetMaintenance = async (id: number): Promise<any> => {
  return [
    {
      id: '1',
      maintenanceType: 'upgrade',
      title: 'Add ram',
      startDate: '22/10/2022',
      endDate: '30/10/2022',
      notes: '',
      user: 'usr1',
    },
    {
      id: '2',
      maintenanceType: 'repair',
      title: 'broken graphic card',
      startDate: '22/09/2022',
      endDate: '30/09/2022',
      notes: 'GPU stopped working',
      user: 'usr2',
    },
  ];
};

export const getAssetFiles = async (id: number): Promise<any> => {
  return [
    {
      id: '1',
      name: 'file1',
      extension: '.txt',
      size: '5KB',
      upload_date: '22/10/2022',
    },
  ];
};
