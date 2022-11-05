export interface IModelForm {
  asset_category_id: ICategory;
  asset_manufacturer_id: IManufacturer;
  name: string;
}

export interface IModel {
  asset_category_id: number;
  asset_manufacturer_id: number;
  name: string;
}

export interface IManufacturer {
  id: number;
  name: string;
}
export interface ICategory {
  id: number;
  name: string;
}
