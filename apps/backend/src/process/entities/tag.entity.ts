import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn } from "typeorm"
import { Result } from "./result.entity"

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string
}
