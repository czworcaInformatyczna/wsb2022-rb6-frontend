import { type IManufacturer } from 'features/model/types';

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryList {
  data: [
    {
      id: number;
      name: string;
    },
  ];
  total: number;
}

export interface IComponentForm {
  asset_component_category_id: ICategory | null;
  asset_id: { id: number; name: string } | null;
  manufacturer_id: IManufacturer | null;
  name: string;
  serial: string;
}

export interface IComponent {
  asset_component_category_id: number | null;
  asset_id: number | null;
  manufacturer_id: number | null;
  name: string;
  serial: string;
}

export interface IAssetList {
  data: [{ id: number; name: string }];
  total: number;
}

export interface IComponents {
  data: [
    {
      asset_component_category: {
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
      };
      asset_component_category_id: number;
      asset_count: number;
      asset_id: number;
      created_at: string;
      id: number;
      manufacturer: {
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
      };
      manufacturer_id: number;
      name: string;
      serial: string;
      updated_at: string;
    },
  ];
}
