export type PageId = 'home' | 'rooms' | 'facilities' | 'gallery' | 'contact';

export interface Room {
  id: 'standard' | 'deluxe' | 'family';
  name: string;
  tagline: string;
  capacity: number;
  capacityDescription: string;
  pricePHP: number;
  sampleRateNote: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  bedConfig: string;
  sizeSqM: number;
  amenities: string[];
  features: string[];
}

export interface Facility {
  id: string;
  name: string;
  title: string;
  caption: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  hours: string;
  highlights: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'grounds' | 'rooms' | 'facilities' | 'scenery';
  categoryLabel: string;
  imageUrl: string;
  imageAlt: string;
  caption: string;
  credit: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  roomType: 'standard' | 'deluxe' | 'family';
  checkIn: string;
  checkOut: string;
  guestCount: number;
  specialRequests: string;
}

export interface ReservationSubmission extends ReservationFormData {
  referenceNumber: string;
  submittedAt: string;
  totalNights: number;
  estimatedTotalPHP: number;
  roomName: string;
}
