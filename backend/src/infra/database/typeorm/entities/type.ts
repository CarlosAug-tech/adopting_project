import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

import { IType } from '@domain/entities/type';

@Entity('types')
class Type implements IType {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = v4();
        }
    }
}

export { Type };
