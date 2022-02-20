export class BookDto {
  id: string;
  book_name: string;
  image: string;
  author: string;
  down_count: number;
  description: string;
  price: number;
  page: number;
  download_link: string;
  audio_link: string;
  audio_duration: string;
  type: string;
  category?: any[];
  review?: any[];
  fovarite?: any[];
  update_at: Date;
  create_at: Date;
}
