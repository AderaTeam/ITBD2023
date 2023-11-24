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
