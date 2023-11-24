import { Body, Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ResultDto } from './dtos/result.dto';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import {Multer} from 'multer'
import * as xlsx from 'node-xlsx'

@Controller('process')
export class ProcessController {
    constructor(
        private readonly processService: ProcessService
    ){}


    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File)
    {
        var table = xlsx.parse(file.buffer)
        Logger.log(table)
        let response = []
        for (const text of table[0].data)
        {
            response.push(this.processService.processText(text[0]))
        }
        return response
    }

    @Post('')
    public async processText(@Body() data: ResultDto)
    {
        const text = data.text
        return this.processService.processText(text)
    }

    @Post('save')
    public async saveRecord(@Body() data: ResultDto)
    {
        return this.processService.saveRecord(data)
    }

    @Post(':id')
    public async editRecord(@Param('id') id: number, @Body() data: ResultDto)
    {
        return this.processService.editRecord(id, data)
    }

    @Get('history')
    public async getHistory()
    {
        return this.processService.getHistory()
    }

    @Get(':id')
    public async getRecord(@Param('id')id: number)
    {
        return this.processService.getRecord(id)
    }

}
