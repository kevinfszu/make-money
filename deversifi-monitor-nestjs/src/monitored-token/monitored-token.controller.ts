import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { MonitoredTokenService } from './monitored-token.service';
import { CreateMonitoredTokenDto } from './dto/create-monitored-token.dto';
import { UpdateMonitoredTokenDto } from './dto/update-monitored-token.dto';

@Controller('monitored-token')
export class MonitoredTokenController {
  constructor(private readonly monitoredTokenService: MonitoredTokenService) {}

  @Post()
  async create(@Body() createMonitoredTokenDto: CreateMonitoredTokenDto) {
    const monitoredToken = await this.monitoredTokenService.findOne(createMonitoredTokenDto.tokenName);
    // console.log('monitoredToken: ', monitoredToken);

    if (monitoredToken !== null) {
      throw new BadRequestException('该币种已处于受监控状态，请勿重复监控');
    }

    if (createMonitoredTokenDto.warningLowPrice * 1 > createMonitoredTokenDto.warningHighPrice * 1) {
      throw new BadRequestException('预警币价下限不能大于预警币价上限');
    }

    return this.monitoredTokenService.create(createMonitoredTokenDto);
  }

  @Get()
  findAll() {
    return this.monitoredTokenService.findAll();
  }

  @Get(':tokenName')
  findOne(@Param('tokenName') tokenName: string) {
    return this.monitoredTokenService.findOne(tokenName);
  }

  @Patch(':tokenName')
  update(@Param('tokenName') tokenName: string, @Body() updateMonitoredTokenDto: UpdateMonitoredTokenDto) {
    if (updateMonitoredTokenDto.warningLowPrice * 1 > updateMonitoredTokenDto.warningHighPrice * 1) {
      throw new BadRequestException('预警币价下限不能大于预警币价上限');
    }

    return this.monitoredTokenService.update(tokenName, updateMonitoredTokenDto);
  }

  @Delete(':tokenName')
  remove(@Param('tokenName') tokenName: string) {
    return this.monitoredTokenService.remove(tokenName);
  }
}
