export interface Doctor {
  id: string;
  name: string;
  fullName: string;
  specialization: string;
  specialistTitle: any;
  address: any;
  price: any;
  distance: any;
  imgUrl?: string;
  img?: string;

  hospital?: string;
  rating?: number;

  latitude: number;
  longitude: number;
}
