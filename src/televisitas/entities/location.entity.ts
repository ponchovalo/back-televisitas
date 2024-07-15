import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Televisita } from './televisita.entity';

@Entity({name: 'locations'})
export class Location {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    dormitory: string;

    @Column('text')
    module: string;

    @Column('text', {unique: true})
    description: string;

    @OneToOne( () => Televisita)
    @JoinColumn()
    televisita?: Televisita | null
}