import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn } from "typeorm"
import { Tag } from "./tag.entity"

@Entity()
export class Result {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    text: string

    @Column(
        {
            nullable: true,
        }
    )
    date?: string

    @Column(
        {
            nullable: true,
        }
    )
    address?: string

    @Column(
        {
            nullable: false,

        }
    )
    category: string

    @Column(
        {
            nullable: false,
        }
    )
    group: string

    @Column(
        {
            nullable: true
        }
    )
    department?: string

    @ManyToMany(() => Tag,{
        cascade: true 
      })
    @JoinTable()
    tags: Tag[]
}
