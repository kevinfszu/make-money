import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredTokenController } from './monitored-token.controller';
import { MonitoredTokenService } from './monitored-token.service';

describe('MonitoredTokenController', () => {
  let controller: MonitoredTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoredTokenController],
      providers: [MonitoredTokenService],
    }).compile();

    controller = module.get<MonitoredTokenController>(MonitoredTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
