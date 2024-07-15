import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Televisita } from './televisita.entity';

@Entity({name: 'locations'})
export class Location {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    dormitory: string;

    @Column('text', {unique: true})
    module: string;

    @Column('text')
    description: string;

    @OneToOne( () => Televisita)
    @JoinColumn()
    televisita?: Televisita | null
}