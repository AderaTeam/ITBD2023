import { Inject, Injectable, Logger } from '@nestjs/common';
import { ResultDto } from './dtos/result.dto';
import { In, Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { Tag } from './entities/tag.entity';
import axios from "axios"
@Injectable()
export class ProcessService {

    constructor(
        @Inject('RESULT_REPOSITORY')
        private resultRepository: Repository<Result>,
        @Inject('TAG_REPOSITORY')
        private tagRepository: Repository<Tag>,
    ){}

    public async editRecord(id: number, object: ResultDto,)
    {
        let currentRecord = await this.resultRepository.findOne({where:{id:id}})
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let minutes = date.getMinutes()
        let hours = date.getHours()

        object.dateMaking = `${day}.${month}.${year} ${hours}:${minutes>9? minutes : '0'+minutes}`;
        let rightTags = []
        for (const tag of object.tags)
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

        for (const prop in object)
        {
            if (prop != "tags")
            {
                currentRecord[prop] = object[prop]
            }
        }
        if (currentRecord.tags)
        {
            currentRecord.tags.forEach(async (tag) => Tag.delete(tag.id))
            currentRecord.save()
        }
        currentRecord.tags = rightTags
        return currentRecord.save()

    }

    public async getHistory()
    {
        return this.resultRepository.find({order:{dateMaking:'DESC'}, relations:{tags: true}})
    }

    public async processText(text: string)
    {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let minutes = date.getMinutes()
        let hours = date.getHours()

        let record = {}
        let response = await axios.post('http://178.170.192.87:8003/items', {
            data: [text]
        })

        response = response.data
        let tags = []
        if (response.data[text].problem)
        {
            for (const tag of response.data[text].problem)
            {
                tags.push({name: tag})
            }
        }
        record = {
            "date": `${day}.${month}.${year} ${hours}:${minutes>9? minutes : '0'+minutes}`,
            "text": text,
            "address": response.data[text].place[0] ?? null,
            "department":response.data[text].executor ?? null,
            "category": response.data[text].theme,
            "group": response.data[text].theme_group,
            "tags": {name: tags ?? null}
            }
        return this.saveRecord(record)

    }

    public async saveRecord(record: Record<string, any>)
    {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let minutes = date.getMinutes()
        let hours = date.getHours()

        record.dateMaking = `${day}.${month}.${year} ${hours}:${minutes>9? minutes : '0'+minutes}`;
        Logger.log(record.dateMaking)
        let rightTags:Tag[] = []
        if (record.tags != undefined)
        {
            Logger.log(record.tags)
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
        }
        

        const currentRecord = this.resultRepository.create({...record, tags: rightTags})
        const id = (await this.resultRepository.insert(currentRecord)).identifiers[0].id
        this.resultRepository.save(currentRecord)
        return id
    }

    public async getRecord(id: number)
    {
        return [await this.resultRepository.findOne({where:{id: id}, relations: {tags: true}})]
    }
}
