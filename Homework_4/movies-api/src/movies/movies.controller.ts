import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieFiltersDto } from './dto/movie-filters.dto';
import {
  ApiQuery,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ description: 'endpoint that creates a new movie' })
  @ApiOkResponse({ type: CreateMovieDto, isArray: false })
  @ApiInternalServerErrorResponse({
    description: "the server can't create a movie",
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiQuery({
    name: 'genre',
    required: false,
  })
  @ApiQuery({
    name: 'minRating',
    required: false,
  })
  @ApiQuery({
    name: 'maxRating',
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
  })
  @ApiQuery({
    name: 'title',
    required: false,
  })
  @ApiOperation({ summary: 'endpoint that fetches all movies' })
  @ApiOkResponse({
    type: CreateMovieDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't fetch the movies",
  })
  async findAll(@Query() query: MovieFiltersDto) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'endpoint that fetches one movie by id' })
  @ApiOkResponse({ type: CreateMovieDto, isArray: false })
  @ApiInternalServerErrorResponse({
    description: "the servser couldn't fetch the movie",
  })
  findOne(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  @HttpCode(204)
  @Patch(':id')
  @ApiOperation({ summary: 'endpoint that updates a movie' })
  @ApiOkResponse({ type: UpdateMovieDto, isArray: false })
  @ApiInternalServerErrorResponse({
    description: "the server can't update the movie",
  })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'endpoint that deletes a movie' })
  @ApiOkResponse({ description: 'Movie deleted' })
  @ApiInternalServerErrorResponse({ description: "Movie can't be deleted" })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
