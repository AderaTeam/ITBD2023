import { Tag } from "../entities/tag.entity"

export class ResultDto
{
    id?: number
    date?: string
    text: string
    address?: string
    category: string
    group: string
    department?: string
    tags?: string[] | Tag[]
}
