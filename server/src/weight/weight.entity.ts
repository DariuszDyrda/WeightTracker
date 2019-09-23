import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from '../auth/user.entity'
import { WeightUnits } from './weightUnits.enum';

@Entity()
export class Weight extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({ type: 'float' })
    amount: number;
    @Column()
    unit: WeightUnits;
    @UpdateDateColumn()
    createDate: Date;

    @ManyToOne(type => User, user => user.measurements, { eager: false })
    user: User;

    @Column()
    userId: number;

    convertTo(unit: WeightUnits) {
        if (this.unit === unit) {
            return;
        }
        if (unit === WeightUnits.kilograms) {
            this.amount *= 0.4536;
            this.unit = unit;
        } else {
            this.amount *= 2.2046;
            this.unit = unit;
        }
    }
}