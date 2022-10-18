import { type HTMLInputTypeAttribute } from 'react';

import { type GridSelectionModel, type GridColumns } from '@mui/x-data-grid';
import { type FieldValues } from 'react-hook-form';

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

export interface IAsset {
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
  detailsLink: string;
  editLink: string;
  getDataHook: () => any;
  name: string;
  // Add APIs object that stores api calls
}
export enum Statuses {
  Archived = 'Archived',
  Deployed = 'Deployed',
  Maintenance = 'Maintenance',
  ReadyToDeploy = 'Ready to deploy',
}

export interface IFormInput extends FieldValues {
  AssetName: string;
  AssetTag: string;
  DateOfPurchase: string;
  Model: IModel | null;
  Notes: string;
  OrderNumber: number | string;
  Photo: File;
  PurchaseCost: number;
  Receipt: File;
  Serial: string;
  Status: IStatus | null;
  Waranty: number;
}

export interface IModel {
  id: string;
  img: string;
  name: string;
}
export interface IStatus {
  id: string;
  name: string;
}

export interface IInputProps {
  helperText?: string;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
}
