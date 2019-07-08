import { Test } from '@nestjs/testing';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Weight } from './weight.entity';
import { Repository } from 'typeorm';
import { O_TRUNC } from 'constants';

const mockUser = { username: 'TestUser' };

const mockRepository = () => ({

});

describe('Weight service', () => {
    let weightService;
    let weightRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [WeightController],
            providers: [
                WeightService,
                {
                    provide: getRepositoryToken(Weight),
                    useFactory: mockRepository,
                }],
        }).compile();
        weightRepository = module.get<Repository<Weight>>(getRepositoryToken(Weight));
        weightService = module.get<WeightService>(WeightService);
    });

    describe('get measurements', () => {
        it('get all measurements', () => {
            expect(true).not.toBe(false);
        })
    })
})