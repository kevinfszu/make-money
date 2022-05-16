import { Test, TestingModule } from '@nestjs/testing';
import { WarnController } from './warn.controller';

describe('WarnController', () => {
  let controller: WarnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarnController],
    }).compile();

    controller = module.get<WarnController>(WarnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
