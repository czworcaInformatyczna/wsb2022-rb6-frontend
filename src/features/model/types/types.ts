export interface IModelForm {
  asset_category_id: ICategory;
  manufacturer_id: IManufacturer;
  name: string;
}

export interface IModel {
  asset_category_id: number;
  manufacturer_id: number;
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
