import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredTokenService } from './monitored-token.service';

describe('MonitoredTokenService', () => {
  let service: MonitoredTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonitoredTokenService],
    }).compile();

    service = module.get<MonitoredTokenService>(MonitoredTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
