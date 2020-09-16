export class Movie {
  public id: number;
  public title: string;
  public year: number;
  public genres: string[];

  constructor(id: number, title: string, year: number, genres: string[]) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.genres = genres;
  }
}
