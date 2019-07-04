import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from '../auth/user.entity'

@Entity()
export class Weight extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    measurement: number;
    @UpdateDateColumn()
    date: Date;

    @ManyToOne(type => User, user => user.measurements)
    user: User;
}