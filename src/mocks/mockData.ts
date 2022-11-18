export const assetStatusOptions = [
  {
    id: '1',
    name: 'Ready to deploy',
  },
  {
    id: '2',
    name: 'Maintance',
  },
  {
    id: '3',
    name: 'Deployed',
  },
  {
    id: '4',
    name: 'Archived',
  },
];

export const assetModelOptions = {
  total: 5,
  data: [
    {
      id: 1,
      name: 'laptop',
      img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
    },
    {
      id: 2,
      name: 'zmywarki',
      img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
    },
    {
      id: 3,
      name: 'wiertarka',
      img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
    },
    {
      id: 0,
      name: 'złom',
      img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
    },
    {
      id: 4,
      name: 'Model',
      img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
    },
  ],
};

export const assetDetailsEdit = {
  id: 1,
  name: 'AssetName',
  serial: 'YYEz64GgdQ3M',
  model: 'Model',
  manufacturer: 'Manufacturer',
  category: 'category',
  status: 'Ready to deploy',
  assetTag: 'assetTag',
  notes: 'some notes',
  waranty: 6,
  orderNumber: '123',
  dateOfPurchase: '22/02/2022',
  purchaseCost: 200,
};

export const assetDetails = {
  asset_model: {
    asset_category_id: 1,
    asset_manufacturer_id: 1,
    category: {
      id: 1,
      name: 'PC',
    },
    id: 1,
    manufacturer: {
      id: 1,
      name: 'Dell',
    },
    name: 'YYEz64GgdQ3M',
  },
  asset_model_id: 1,
  created_at: '2022-10-27T18:09',
  current_holder: '',
  current_holder_id: 1,
  id: 16,
  image: 'path',
  name: 'asset1',
  notes: 'some info',
  order_number: '123',
  price: 200,
  purchase_date: '2022-10-27T17:09',
  serial: '1234',
  status: 50,
  tag: '4234',
  warranty: 61,
};
export const assetImage = {
  image: 'http://cdn.eso.org/images/screen/eso1907a.jpg',
};

export const assetQRCode = {
  qrCode: 'http://cdn.eso.org/images/screen/eso1907a.jpg',
};

export const assetLicenses = [
  {
    id: '1',
    name: 'Photoshop',
    key: 'ba81-874f-3fbe-99b9-30624',
    expiration_date: '22.12.2032',
  },
];

export const assetComponents = [
  {
    id: '1',
    name: 'PNY XLR8 RGB 16GB 3200Mhz',
    serial: 'ba81-874f-3fbe-99b9-30624',
    category: 'RAM',
  },
];

export const assetHistory = [
  {
    id: '2',
    date: '22/10/2022',
    user: 'Admin',
    action: 'Deploy',
    target: 'Wojtek1',
    notes: 'some info',
  },
];

export const assetMaintenances = [
  {
    id: '1',
    maintenanceType: 'upgrade',
    title: 'Add ram',
    startDate: '22/10/2022',
    endDate: '30/10/2022',
    notes: 'some info',
    user: 'usr1',
  },
];

export const assetFiles = {
  data: [
    {
      id: '1',
      name: 'file1',
      extension: '.txt',
      size: '5KB',
      created_at: '2022-11-27T18:09',
      uploader: { email: 'email@email.com' },
    },
  ],
  total: 1,
};

export const licenseCategoryOptions = [
  {
    id: '1',
    name: 'Graphic',
  },
  {
    id: '2',
    name: 'Office',
  },
  {
    id: '3',
    name: 'Video edditing',
  },
];

export const licenseManufacturerOptions = [
  {
    id: '1',
    name: 'Adobe',
  },
  {
    id: '2',
    name: 'Microsoft',
  },
];

export const licenseEditMock = {
  id: 14,
  name: 'Photoshop',
  key: 'ASD-ASD-343-SDF',
  manufacturer: 'Adobe',
  expiration_date: '22/10/2033',
  licensed_to: 'user@user.com',
  quantity: 8,
  notes: 'some info',
  category: 'Graphic',
  dateOfPurchase: '22//09/2019',
  purchaseCost: 200,
  order_number: '12312sad',
};

export const licenseDetailsMock = {
  available: 5,
  deployed: 30,
  id: 14,
  name: 'Photoshop',
  key: 'ASD-ASD-343-SDF',
  manufacturer: 'Adobe',
  expiration_date: '22/10/2033',
  licensed_to: 'user@user.com',
  quantity: 8,
  notes: 'some info',
  category: 'Graphic',
  dateOfPurchase: '22//09/2019',
  purchaseCost: 200,
  order_number: '12312sad',
};

export const licenseDeploysMock = [
  {
    id: 1,
    deployed_to: {
      type: '',
      name: '',
    },
    notes: '',
    is_deployed: false,
  },
  {
    id: 2,
    deployed_to: {
      type: '',
      name: '',
    },
    notes: '',
    is_deployed: false,
  },
  {
    id: 3,
    deployed_to: {
      type: 'user',
      name: 'user67',
    },
    notes: 'some info76',
    is_deployed: true,
  },
  {
    id: 4,
    deployed_to: {
      type: 'user',
      name: 'user98',
    },
    notes: 'some info89',
    is_deployed: true,
  },
];

export const manufacturerList = [
  {
    name: 'mock1',
    id: 1,
  },
  {
    name: 'mock2',
    id: 2,
  },
  {
    name: 'mock3',
    id: 3,
  },
];
export const categoryList = [
  {
    name: 'mock1',
    id: 1,
  },
  {
    name: 'mock2',
    id: 2,
  },
  {
    name: 'mock3',
    id: 3,
  },
];
