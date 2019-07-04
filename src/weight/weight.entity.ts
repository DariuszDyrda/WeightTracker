import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from '../auth/user.entity'
import { WeightUnits } from './weightUnits.enum';

@Entity()
export class Weight extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    amount: number;
    @Column()
    unit: WeightUnits;
    @UpdateDateColumn()
    date: Date;

    @ManyToOne(type => User, user => user.measurements)
    user: User;
}