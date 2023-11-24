import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ResultDto } from './dtos/result.dto';

@Controller('process')
export class ProcessController {
    constructor(
        private readonly processService: ProcessService
    ){}

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

    @Get(':id')
    public async getRecord(@Param('id')id: number)
    {
        return this.processService.getRecord(id)
    }
}
