export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
}

export interface RoomBookingFilters {
  roomNumber?: number | null;
  type?: RoomType;
  maxPrice?: number | null;
  minPrice?: number | null;
  isAvaliable?: boolean;
}
