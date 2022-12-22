export interface IModelForm {
  asset_category_id: ICategory | null;
  manufacturer_id: { id: number; name: string } | null;
  name: string;
}

export interface IModel {
  asset_category_id: number | null;
  manufacturer_id: number | null;
  name: string;
}

export interface IManufacturer {
  data: [{ id: number; name: string }];
  total: number;
}
export interface ICategory {
  id: number;
  name: string;
}

export interface IAssetCategory {
  data: [{ id: number; name: string }];
  total: number;
}

export interface IModelList {
  data: [
    {
      category: { id: number; name: string };
      created_at: string;
      id: number;
      manufacturer: { id: number; name: string };
      name: string;
    },
  ];
  total: number;
}
