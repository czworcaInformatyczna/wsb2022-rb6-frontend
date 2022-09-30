export interface IFormInput {
  AssetName: string;
  AssetTag: string;
  Model: IModel | null;
  Notes: string;
  Photo: File;
  Serial: string;
  Status: IStatus | null;
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
