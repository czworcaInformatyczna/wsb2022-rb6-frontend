import { type GridSelectionModel, type GridColumns } from '@mui/x-data-grid';

export interface CustomToolbarProps {
  selectedItems: GridSelectionModel;
}

export interface AssetsProps {
  data: IDataProvider;
}

export interface ContextMenu {
  elementId: number;
  mouseX: number;
  mouseY: number;
}

export interface Asset {
  category: string;
  id: number | string;
  image: string;
  manufacturer: string;
  model: string;
  name: string;
  serial: string;
  status: string;
}

export interface DataProviderProps {
  link: string;
}
export interface IDataProvider {
  addNewLink: string;
  columns: GridColumns;
  name: string;
  // Add APIs object that stores api calls
}
export enum Statuses {
  Archived = 'Archived',
  Deployed = 'Deployed',
  Maintenance = 'Maintenance',
  ReadyToDeploy = 'Ready to deploy',
}
