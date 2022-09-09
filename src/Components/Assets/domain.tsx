export interface AssetsProps {
   
}
 
export interface AssetsState {
    loading: boolean,
    assets:Asset[]
}
export interface Asset {
    id: string|number,
    name:string,
    image: string,
    serial: string,
    model: string ,
    manufacturer: string,
    category:string,
    status:string
}
