import { IAnimal } from '@domain/entities/animal';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('animals')
class Animal implements IAnimal {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    breed_id: string;

    @Column()
    type_id: string;

    @Column()
    sex: string;

    @Column()
    isPuppy: boolean;

    @Column()
    isAdopt: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = v4();
        }
    }
}

export { Animal };
