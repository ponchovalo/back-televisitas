import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TelevisitasService } from './televisitas.service';
import { CreateTelevisitaDto } from './dto/create-televisita.dto';
import { UpdateTelevisitaDto } from './dto/update-televisita.dto';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('televisitas')
export class TelevisitasController {
  constructor(private readonly televisitasService: TelevisitasService) {}

  @Post()
  create(@Body() createTelevisitaDto: CreateTelevisitaDto) {
    return this.televisitasService.create(createTelevisitaDto);
  }

  @Get()
  findAll() {
    return this.televisitasService.findAll();
  }

  @Get(':terminalNumber')
  findOne(@Param('terminalNumber') terminalNumber: string) {
    return this.televisitasService.findOne(terminalNumber);
  }

  @Patch(':id')
  update(@Param('id') id: ParseIntPipe, @Body() updateTelevisitaDto: UpdateTelevisitaDto) {
    return this.televisitasService.update(+id, updateTelevisitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ParseIntPipe) {
    return this.televisitasService.remove(+id);
  }

  @Post('f/location')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.televisitasService.createLocation(createLocationDto);
  }

  @Get('f/location')
  findAllLocation() {
    return this.televisitasService.findAllLocation();
  }
}
