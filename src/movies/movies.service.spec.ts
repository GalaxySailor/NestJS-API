import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an Movie typed array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should retrun a movie', () => {
      const movieData = {
        title: 'matrix',
        year: 2000,
        genres: ['hm'],
      };
      service.create(movieData);
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(11111);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID : 11111 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('should deletes a movie', () => {
      const movieData = {
        title: 'matrix',
        year: 2000,
        genres: ['hm'],
      };
      service.create(movieData);
      const beforeDelete = service.getAll().length;

      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw an error with invalid id', () => {
      try {
        service.deleteOne(11111);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'matrix',
        year: 2000,
        genres: ['hm'],
      });

      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });

    it('should throw an error with invalid attributes', () => {
      try {
        service.create({
          title: 'matrix',
          hacker: 2000,
          genres: ['hm'],
        });
      } catch (e) {
        expect(e.statusCode).toEqual(400);
      }
    });
  });

  describe('update', () => {
    it('should update a movie title', () => {
      service.create({
        title: 'matrix',
        year: 2000,
        genres: ['hm'],
      });
      service.update(1, { title: 'instinct' });
      const movie = service.getOne(1);

      expect(movie.title).toEqual('instinct');
    });
    it('should throw an error with invalid id', () => {
      try {
        service.update(11111, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
