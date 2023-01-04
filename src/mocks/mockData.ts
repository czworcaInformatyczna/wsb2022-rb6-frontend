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
  current_holder: null,
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

export const assetLicenses = {
  data: [
    {
      id: '1',
      name: 'Photoshop',
      product_key: 'ba81-874f-3fbe-99b9-30624',
      expiration_date: '22.12.2032',
    },
  ],
  total: 1,
};

export const assetComponents = {
  data: [
    {
      id: 1,
      created_at: '2022-11-26T11:20:37.000000Z',
      updated_at: '2022-11-26T11:20:37.000000Z',
      asset_id: 2,
      asset_component_category_id: 2,
      manufacturer_id: 2,
      name: 'PNY XLR8 RGB 16GB 3200Mhz',
      serial: 'ba81-874f-3fbe-99b9-30624',
      asset_count: 1,
      asset_component_category: {
        id: 2,
        created_at: null,
        updated_at: null,
        name: 'Pamięć RAM',
      },
      manufacturer: {
        id: 2,
        name: 'Omnis sed',
        created_at: '2022-11-03T19:18:31.000000Z',
        updated_at: '2022-11-03T19:18:31.000000Z',
      },
    },
  ],
  total: 1,
};

export const assetHistory = {
  data: [
    {
      id: '2',
      updated_at: '2022-12-02',
      user_id: 'Admin',
      user: { email: 'asdk@gmail.com' },
      action_type: 'Deploy',
      target: 'test1',
      description: { status: 'abc' },
    },
  ],
  total: 1,
};

export const licenseHistoryMock = {
  data: [
    {
      id: '2',
      created_at: '2022-12-02',
      user_id: 'Admin',
      user: { email: 'asdk@gmail.com' },
      action: 'Deploy',
      target: 'Wojtek1',
      description: { status: 'abc' },
      licencable: { email: 'test@gmail.com' },
    },
    {
      id: '3',
      created_at: '2022-12-02',
      user_id: 'Admin',
      user: { email: 'asdk@gmail.com' },
      action: 'edit',
      target: 'Wojtek1',
      description: { status: 'abc' },
      licencable: { name: 'assetName' },
    },
  ],
  total: 1,
};

export const assetMaintenances = {
  data: [
    {
      id: '1',
      maintenance_type: 'clean',
      title: 'Add ram',
      start_date: '22/10/2022',
      end_date: '30/10/2022',
      notes: 'some info',
      user_id: 'usr1',
      user: {
        id: 1,
        email: 'usr1',
      },
    },
  ],
  total: 1,
};

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

export const licenseFilesMock = {
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

export const licenseCategoryOptions = {
  data: [
    {
      id: 1,
      name: 'Graphic',
    },
    {
      id: 2,
      name: 'Office',
    },
    {
      id: 3,
      name: 'Video edditing',
    },
  ],
  total: 3,
};

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
  slots: 5,
  id: 14,
  name: 'Photoshop',
  product_key: 'ASD-ASD-343-SDF',
  manufacturer: {
    name: 'adobe',
    id: 1,
  },
  expiration_date: '22.10.2033',
  email: 'user@user.com',
  category: {
    name: 'Graphic',
    id: 1,
  },
  category_id: 1,
  manufacturer_id: 1,
  reassignable: true,
};

export const licenseDetailsMock = {
  slots: 5,
  remaining_slots: 30,
  id: 14,
  name: 'Photoshop',
  product_key: 'ASD-ASD-343-SDF',
  manufacturer: {
    name: 'adobe',
    id: 1,
  },
  expiration_date: '2033-10-22T00:00',
  email: 'user@user.com',
  category: {
    name: 'Graphic',
    id: 1,
  },
  category_id: 1,
  manufacturer_id: 1,
  reassignable: true,
};

export const licenseDeploysMock = {
  assets: [
    {
      id: 1,
      name: 'laptop',
      pivot: {
        licencable_id: 1,
      },
    },
  ],
  users: [
    {
      email: 'test@gmail.com',
      id: '1',
      pivot: {
        licencable_id: 1,
      },
    },
  ],
};

export const manufacturerList = {
  data: [
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
  ],
  total: 3,
};

export const categoryList = {
  data: [
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
  ],
  total: 3,
};

export const permissionsList = [
  {
    name: 'permission',
    id: 1,
  },
  {
    name: 'permissionMock',
    id: 2,
  },
  {
    name: 'permissionMock3',
    id: 3,
  },
];

export const Role = {
  role: { id: 1, name: 'MockRole' },
  rolePermissions: [
    {
      id: 1,
      name: 'permission1',
    },
    {
      id: 2,
      name: 'permission3',
    },
  ],
};

export const Roles = {
  total: 2,
  data: [
    {
      id: 1,
      name: 'MockRole',
      permissions: [
        {
          id: 1,
          name: 'permission1',
          pivot: {
            role_id: 9,
            permission_id: 1,
          },
        },
      ],
    },
    {
      id: 2,
      name: 'admin',
      permissions: [
        {
          id: 1,
          name: 'permission1',
          pivot: {
            role_id: 1,
            permission_id: 1,
          },
        },
        {
          id: 2,
          name: 'permission2',
          pivot: {
            role_id: 1,
            permission_id: 2,
          },
        },
      ],
    },
  ],
};

export const usersList = {
  total: 2,
  data: [
    {
      activated: false,
      id: 1,
      name: 'Jan',
      surname: 'Kowalski',
      email: 'Jan@kowalski@gmail.com',
      phone_number: '123123123',
      roles: [],
    },
    {
      activated: true,
      id: 2,
      name: 'Maciej',
      surname: 'Nowak',
      email: 'Maciej.N@wp.pl',
      phone_number: '123123123',
      roles: [],
    },
  ],
};

export const modelList = {
  total: 2,
  data: [
    {
      id: 1,
      name: 'Corrupti amet',
      created_at: '2022-10-17T20:25:38.000000Z',
      updated_at: '2022-10-17T20:25:38.000000Z',
      asset_category_id: 15,
      asset_manufacturer_id: 196,
      category: {
        id: 15,
        name: 'Magni nobis',
        created_at: '2022-10-17T20:24:42.000000Z',
        updated_at: '2022-10-17T20:24:42.000000Z',
      },
      manufacturer: {
        id: 196,
        name: 'atque aut',
        created_at: '2022-10-06T19:08:39.000000Z',
        updated_at: '2022-10-06T19:08:39.000000Z',
      },
    },
    {
      id: 0,
      name: 'Ipsa beatae',
      created_at: '2022-10-19T19:41:03.000000Z',
      updated_at: '2022-10-19T19:41:03.000000Z',
      asset_category_id: 44,
      asset_manufacturer_id: 224,
      category: {
        id: 44,
        name: 'Atque nobis',
        created_at: '2022-10-19T19:41:03.000000Z',
        updated_at: '2022-10-19T19:41:03.000000Z',
      },
      manufacturer: {
        id: 1,
        name: 'Repellendus illum',
        created_at: '2022-10-17T20:24:42.000000Z',
        updated_at: '2022-10-17T20:24:42.000000Z',
      },
    },
  ],
};

export const componentCategoryList = {
  data: [
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
  ],
};

export const allCategoryList = {
  data: [
    {
      name: 'mock1',
      category_id: 1,
      category_type: 'license',
    },
    {
      name: 'mock2',
      category_id: 2,
      category_type: 'license',
    },
    {
      name: 'mock3',
      category_id: 3,
      category_type: 'license',
    },
  ],
  total: 3,
};

export const userPermissionsList = [
  'Manage Roles',
  'Manage Users',
  'Manage Licences',
  'Manage Assets',
  'Manage Manufacturers',
  'Manage Categories',
  'Manage Components',
  'Manage Models',
];
