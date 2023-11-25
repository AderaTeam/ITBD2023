import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, BaseEntity } from "typeorm"
import { Result } from "./result.entity"

@Entity()
export class Tag extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string
}
