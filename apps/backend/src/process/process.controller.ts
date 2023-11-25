import { Body, Controller, Get, Head, Header, Logger, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
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
    public async uploadFile(@UploadedFile() file: Express.Multer.File)
    {
        Logger.log(file)
        var table = xlsx.parse(file.buffer)
        Logger.log(table)
        let response = []
        for (const text of table[0].data)
        {
            response.push(await this.processService.processText(text[0]))
        }
        return response
    }

    @Header('Content-disposition', 'attachment; filename=anlikodullendirme.xlsx')
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Post('export')
    public async exportTable(@Body() data: Record<string, any>)
    {
        const ids = data.ids
        return new StreamableFile(await this.processService.createTable(ids))
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

    @Get('history')
    public async getHistory()
    {
        return this.processService.getHistory()
    }

    @Post(':id')
    public async editRecord(@Param('id') id: number, @Body() data: ResultDto)
    {
        return this.processService.editRecord(id, data)
    }

    @Get(':id')
    public async getRecord(@Param('id')id: number)
    {
        return this.processService.getRecord(id)
    }

}
