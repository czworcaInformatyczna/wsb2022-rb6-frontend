export interface IFormInput {
  AssetTag: string;
  Model: IModel | null;
  Notes: string;
  Serial: string;
  Status: IStatus | null;
  photo: File;
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
