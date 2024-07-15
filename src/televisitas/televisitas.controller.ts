import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { TelevisitasService } from './televisitas.service';
import { CreateTelevisitaDto } from './dto/create-televisita.dto';
import { UpdateTelevisitaDto } from './dto/update-televisita.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { TerminalNumber } from './dto/terminal-number.dto';

@Controller('televisitas')
export class TelevisitasController {
  constructor(private readonly televisitasService: TelevisitasService) {}

  //! Endpoints para Televisitas ------------------------------------------
  @Get()
  findAll() {
    return this.televisitasService.findAll();
  }

  @Get(':terminalNumber')
  findOne(@Param('terminalNumber') terminalNumber: string) {
    return this.televisitasService.findOne(terminalNumber);
  }

  @Post()
  create(@Body() createTelevisitaDto: CreateTelevisitaDto) {
    return this.televisitasService.create(createTelevisitaDto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTelevisitaDto: UpdateTelevisitaDto) {
    return this.televisitasService.update(id, updateTelevisitaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.televisitasService.remove(id);
  }

  //! Endpoints para Ubicaciones ------------------------------------------
  @Get('f/location')
  findAllLocation() {
    return this.televisitasService.findAllLocation();
  }

  @Get('f/location/:id')
  findOneLocation(@Param('id', ParseUUIDPipe) id: string) {
    return this.televisitasService.findOneLocation(id);
  }

  @Post('f/location')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.televisitasService.createLocation(createLocationDto);
  }

  @Patch('f/location/:id')
  updateLocation(@Param('id', ParseUUIDPipe) id: string, @Body('terminalNumber') terminalNumber: string){
    return this.televisitasService.asingTerminal(id, terminalNumber);
  }

  
}
