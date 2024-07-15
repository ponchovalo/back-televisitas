import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTelevisitaDto } from './dto/create-televisita.dto';
import { UpdateTelevisitaDto } from './dto/update-televisita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Televisita } from './entities/televisita.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class TelevisitasService {

  constructor(
    @InjectRepository(Televisita)
    private readonly televisitaRepository: Repository<Televisita>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ){}

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

  //! Listado de todas las televisitas TODO: Realizar la paginacion
  async findAll() {
    return await this.televisitaRepository.find({});
  }

  //! Encontrar por numero de terminal
  async findOne(terminalNumber: string) {
    let televisita: Televisita;
    televisita = await this.televisitaRepository.findOneBy({terminalNumber})
    if(!televisita) throw new NotFoundException(`No se encontro terminal ${terminalNumber}`)
    return televisita;
  }

  update(id: number, updateTelevisitaDto: UpdateTelevisitaDto) {
    return `This action updates a #${id} televisita`;
  }

  remove(id: number) {
    return `This action removes a #${id} televisita`;
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    try {
      const newLocation: Location = new Location();
      newLocation.dormitory = createLocationDto.dormitory;
      newLocation.module = createLocationDto.module;
      newLocation.description = createLocationDto.description;

      if(!createLocationDto.televisita){
        newLocation.televisita = null;
      }else{
        const televisita = await this.televisitaRepository.findOneBy({terminalNumber: createLocationDto.televisita})
        console.log(televisita)
      }


      //this.locationRepository.create(newLocation)

      //await this.locationRepository.save(newLocation)

      return newLocation;

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Help')
    }
  }

  async findAllLocation() {
    return await this.locationRepository.find({
      relations:['televisita'],
    });
  }
}
