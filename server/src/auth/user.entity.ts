import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Weight } from '../weight/weight.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    salt: string;
    @Column()
    password: string;
    @OneToMany(type => Weight, weight => weight.user)
    measurements: Weight[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return this.password === hash;
    }
}