import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'televisitas'})
export class Televisita {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    terminalNumber: string;

    @Column('text', {unique: true})
    mac: string;

    @Column('text', {unique: true})
    ip: string;

    @Column('boolean', {default: true})
    status: boolean;

    @Column('boolean', {default: false})
    installed: boolean;
    
}
