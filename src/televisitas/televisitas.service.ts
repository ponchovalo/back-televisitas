import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTelevisitaDto } from './dto/create-televisita.dto';
import { UpdateTelevisitaDto } from './dto/update-televisita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Televisita } from './entities/televisita.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';
import { UUID } from 'crypto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { TerminalNumber } from './dto/terminal-number.dto';

@Injectable()
export class TelevisitasService {
  logger: any;

  constructor(
    @InjectRepository(Televisita)
    private readonly televisitaRepository: Repository<Televisita>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ){}

  

  //! ----TELEVISITAS----
  //! Listado de todas las televisitas TODO: Realizar la paginacion
  async findAll() {
    return await this.televisitaRepository.find({ order: {'ip':'ASC'}});
  }

  //! Encontrar por numero de terminal
  async findOne(terminalNumber: string) {
    let televisita: Televisita;
    televisita = await this.televisitaRepository.findOneBy({terminalNumber})
    if(!televisita) throw new NotFoundException(`No se encontro terminal ${terminalNumber}`)
    return televisita;
  }

  //! Creacion de Televisitas TODO: controlar el error
  async create(createTelevisitaDto: CreateTelevisitaDto) {
    try {
      const televisita = this.televisitaRepository.create(createTelevisitaDto)
      await this.televisitaRepository.save(televisita)
      return televisita;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Help')
    }
  }

  //! Actualizar Televisita
  async update(id: string, updateTelevisitaDto: UpdateTelevisitaDto) {
    const televisita = await this.televisitaRepository.preload({
      id,
      ...updateTelevisitaDto
    });
    if(!televisita) throw new NotFoundException(`No se encontro terminal ${id}`)
    try {
      await this.televisitaRepository.save(televisita)
      return
    } catch (error) {
      this.handleException(error)
    }
  }

  //! Eliminar Televisita por id
  remove(id: string) {
    return `This action removes a #${id} televisita`;
  }

  //! ----UBICACIONES----
  //! Listar Ubicaciones con Terminlaes asignadas
  async findAllLocation() {
    return await this.locationRepository.find({
      relations:['televisita'],
      order: {'description': 'ASC'}
    });
  }

  //! Crear Ubicacion
  async createLocation(createLocationDto: CreateLocationDto) {
    try {
      const location: Location = new Location();
      location.dormitory = createLocationDto.dormitory;
      location.module = createLocationDto.module;
      location.description = createLocationDto.description;

      if(!createLocationDto.televisita){
        location.televisita = null;
        const newLocation = this.locationRepository.create(location)
        await this.locationRepository.save(newLocation)
        return newLocation;
      }else{
        location.televisita = await this.findOne(createLocationDto.televisita);
        const newLocation = this.locationRepository.create(location)
        await this.locationRepository.save(newLocation)
        return newLocation;
      }
    } catch (error) {
      console.log(error)
      this.handleException(error)
    }
  }

  async asingTerminal(id: string, terminalNumber: string){
    let televisita: Televisita;
    if(terminalNumber === ""){
      let locationActual = await this.findOneLocation(id)
      if(!locationActual.televisita) throw new NotFoundException(`La ubicacion ${locationActual.description} no tiene terminal`)
      let televisitaActual = await this.findOne(locationActual.televisita.terminalNumber)
      televisitaActual.installed = false;
      this.televisitaRepository.save(televisitaActual)
      televisita = null;
    }else {
      televisita = await this.findOne(terminalNumber)
      televisita.installed = await true;
      this.televisitaRepository.save(televisita)
    }
    const location = await this.locationRepository.preload({
      id,
      televisita
    });
    if(!location) throw new NotFoundException(`No se encontro la ubicacion con id ${id}`)
      try {
        await this.locationRepository.save(location)
        return location;
      } catch (error) {
        this.handleException(error)
      }
  }

  //! Encontrar una ubicacion
  async findOneLocation(id: string) {
    let location: Location;
    location = await this.locationRepository.findOne({
      where: {id},
      relations:['televisita']
    })
    if(!location) throw new NotFoundException(`No se encontro la ubicacion con id ${id}`)
    return location;
  }

  

  //! Metodo manejador de errores
  private handleException(error: any){
    console.log(error)
    if(error.code ==='23505') throw new BadRequestException(error.detail, error.code);
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected server errors, check logs server')
}
}
