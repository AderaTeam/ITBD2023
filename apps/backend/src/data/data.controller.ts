import { Controller, Get } from '@nestjs/common';

@Controller('data')
export class DataController {

@Get('single')
public async mockDataSingleReport()
{
    return{
        "category": "Водоканал",
        "tags": [
            "трубы",
            "прорвало",
            "подвал",
            "пятиэтажка"
        ]
    }
}
}
