import { GridSelectionModel } from '@mui/x-data-grid';
import { GridColumns } from '@mui/x-data-grid';
export interface AssetsProps {
  data: IDataProvider;
}

export interface AssetsState {
  loading: boolean;
  assets: Asset[];
  loadingData: boolean;
  pageSize: number;
  rowCountState: number;
  selectionModel: GridSelectionModel;
  contextMenu: {
    mouseX: number;
    mouseY: number;
    elementId: number;
  } | null;
}
export interface Asset {
  id: string | number;
  name: string;
  image: string;
  serial: string;
  model: string;
  manufacturer: string;
  category: string;
  status: string;
}
export interface CustomToolbarProps {
  selectedItems: GridSelectionModel;
}
export interface DataProviderProps {
  link: string;
}
export interface IDataProvider {
  name: string;
  columns: GridColumns;
  //Add APIs object that stores api calls
}
