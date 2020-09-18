import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly year?: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres?: string[];
}
