import { type GridSelectionModel } from '@mui/x-data-grid';
import { type GridColumns } from '@mui/x-data-grid';
export interface AssetsProps {
  data: IDataProvider;
}

export interface AssetsState {
  assets: Asset[];
  contextMenu: {
    elementId: number;
    mouseX: number;
    mouseY: number;
  } | null;
  loading: boolean;
  loadingData: boolean;
  pageSize: number;
  rowCountState: number;
  selectionModel: GridSelectionModel;
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
export interface CustomToolbarProps {
  selectedItems: GridSelectionModel;
}
export interface DataProviderProps {
  link: string;
}
export interface IDataProvider {
  columns: GridColumns;
  name: string;
  // Add APIs object that stores api calls
}
