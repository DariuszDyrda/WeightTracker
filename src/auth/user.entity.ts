import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Weight } from '../weight/weight.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @OneToMany(type => Weight, weight => weight.user)
    measurements: Weight[];
}