import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID : ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number): void {
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    const id: number =
      this.movies.length !== 0 ? this.movies[this.movies.length - 1].id + 1 : 1;

    this.movies.push(
      new Movie(id, movieData.title, movieData.year, movieData.genres),
    );
  }

  update(id: number, updateData: UpdateMovieDto): void {
    const movie = this.getOne(id);
    Object.assign(movie, updateData);
  }
}
