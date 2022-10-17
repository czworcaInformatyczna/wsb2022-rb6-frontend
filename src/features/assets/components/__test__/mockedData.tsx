export const AssetInfoData = {
  idMock: 'idValue',
  nameMock: 'nameValue',
  SerialMock: 'serialValue',
  ModelMock: 'modelValue',
  ManufacturerMock: 'ManufacturerValue',
  CategoryMock: 'categoryValue',
  StatusMock: 'Ready to deploy',
  AssetTagMock: 'assetTagValue',
  NotesMock: 'notesValue',
  WarantyMock: 'warantValue',
};

export const AssetLicensesMock = [
  {
    id: '1',
    name: 'license1',
    key: '123',
  },
  {
    id: '2',
    name: 'license2',
    key: 'abc',
  },
];

export const AssetComponentsMock = [
  {
    id: 'idMock1',
    name: 'namMock1',
    serial: 'serMock1',
    category: 'catMock1',
  },
  {
    id: 'idMock2',
    name: 'namMock2',
    serial: 'serMock2',
    category: 'catMock2',
  },
];
export const AssetHistoryMock = [
  {
    id: '1',
    date: '10 10 2022',
    user: 'Usr1',
    action: 'Request',
    target: '',
    notes: '',
  },
  {
    id: '2',
    date: '11 10 2022',
    user: 'Admin',
    action: 'Deploy',
    target: 'Usr2',
    notes: 'some info',
  },
];

export const AssetMaintenanceMock = [
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

export const AssetFilesMock = [
  {
    id: '1',
    name: 'file1',
    extension: '.txt',
    size: '5KB',
    upload_date: '22/10/2022',
  },
];
