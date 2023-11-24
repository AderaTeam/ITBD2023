import { Inject, Injectable, Logger } from '@nestjs/common';
import { ResultDto } from './dtos/result.dto';
import { In, Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ProcessService {

    constructor(
        @Inject('RESULT_REPOSITORY')
        private resultRepository: Repository<Result>,
        @Inject('TAG_REPOSITORY')
        private tagRepository: Repository<Tag>,
    ){}

    public async getHistory()
    {
        return this.resultRepository.find({order:{dateMaking:'DESC'}})
    }

    public async processText(text: string)
    {
        const record = {
            "date": null,
            "text": text,
            "address": "2-я Болдовская 8/2",
            "department": "Водоканал",
            "category": "Засор в общедомовой системе водоотведения (канализации)",
            "group": "ЖКХ",
            "tags": [
                {
                    "id": 1,
                    "name": "трубы"
                },
                {
                    "id": 2,
                    "name": "прорвало"
                },
                {
                    "id": 3,
                    "name": "подвал"
                },
                {
                    "id": 4,
                    "name": "пятиэтажка"
                }
            ]
    }
        return this.saveRecord(record)
    }

    public async saveRecord(record: ResultDto)
    {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let minutes = date.getMinutes()
        let hours = date.getHours()

        record.dateMaking = `${day}.${month}.${year} ${hours}:${minutes}`;
        Logger.log(record.dateMaking)
        let rightTags:Tag[] = []
        for (const tag of record.tags)
        {
            const name: string = tag.name
            Logger.log(tag)
            if ((await this.tagRepository.find({where: {name: name.toString()}})).length > 0)
            {
                rightTags.push((await this.tagRepository.findOne({where: {name: name.toString()}})))
            }
            else
            {
                const currentTag = this.tagRepository.create({name: name.toString()})
                await this.tagRepository.insert(currentTag)
                rightTags.push((await this.tagRepository.findOne({where: {name: name.toString()}})))
            }
        }
        Logger.log(rightTags)

        const currentRecord = this.resultRepository.create({...record, tags: rightTags})
        const id = (await this.resultRepository.insert(currentRecord)).identifiers[0].id
        this.resultRepository.save(currentRecord)
        return id
    }

    public async getRecord(id: number)
    {
        return await this.resultRepository.findOne({where:{id: id}, relations: {tags: true}})
    }
}
