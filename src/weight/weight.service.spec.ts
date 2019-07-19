import { Test } from '@nestjs/testing';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Weight } from './weight.entity';
import { Repository } from 'typeorm';
import { O_TRUNC } from 'constants';
import { WeightUnits } from './weightUnits.enum';
import { NotFoundException } from '@nestjs/common';

const mockRepository = () => ({
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
});

const fakeUser = { username: 'TestUser' };

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

    describe('add measurement', () => {
        const addDto = {
            amount: 34.4,
            unit: WeightUnits.kilograms,
        };

        let save;

        beforeEach(() => {
            save = jest.fn();
            weightRepository.create = jest.fn().mockReturnValue({ save });
        });

        it('adds measurement correctly and returns without user property', async () => {
            expect(weightRepository.create).not.toHaveBeenCalled();
            const result = await weightService.addMeasurement(addDto, fakeUser);
            expect(save).toHaveBeenCalled();
            expect(result).toHaveProperty('amount');
            expect(result).toHaveProperty('unit');
            expect(result).not.toHaveProperty('user');
        });
    });

    describe('edit measurement', () => {
        const editDto = {
            amount: 47.3,
            unit: WeightUnits.kilograms,
        };

        const addDto = {
            amount: 56.8,
            unit: WeightUnits.pounds,
        }

        let save;

        beforeEach(() => {
            save = jest.fn();
            weightRepository.create = jest.fn().mockReturnValue({ save });
        });

        it('edits measurement correctly', async () => {
            const addResult = { ...addDto, save };
            weightRepository.findOne.mockResolvedValue({ ...addResult });
            expect(weightRepository.findOne).not.toHaveBeenCalled();
            const editResult = await weightService.editMeasurement(editDto, 12, fakeUser);
            expect(editResult).not.toMatchObject(addResult);
            expect(editResult.amount).toBeCloseTo(47.3);
            expect(editResult.unit).toBe('kilograms');
        });
        it('throws NotFoundException when id not found', () => {
            weightRepository.findOne.mockRejectedValue(undefined);
            expect(weightRepository.findOne).not.toHaveBeenCalled();
            expect(weightService.editMeasurement(editDto, 12, fakeUser)).rejects.toThrow(NotFoundException);
        });
    });
    describe('delete measurement', () => {
        const weight = {
            amount: 45.9,
            unit: WeightUnits.kilograms,
            user: fakeUser,
        }

        it('correctly removes entity from db', () => {
            weightRepository.findOne.mockResolvedValue(weight);
            weightRepository.remove.mockResolvedValue(weight);
            expect(weightService.deleteTaskById(12, fakeUser)).resolves.toMatchObject(weight);
        });

        it('throws NotFoundException while given id is not in db', () => {
            weightRepository.findOne.mockResolvedValue(undefined);
            weightRepository.remove.mockResolvedValue(weight);

            expect(weightService.deleteTaskById(12, fakeUser)).rejects.toThrow(NotFoundException);
        });
    });
    describe('get measurements', () => {
        const filterDto = {
            dateFrom: new Date('December 17, 2018 03:24:00'),
            dateTo: new Date('December 19, 2018 03:24:00'),
            unit: WeightUnits.pounds,
        };

        let where;
        let andWhere;
        let getMany;

        beforeEach(() => {
            where = jest.fn();
            andWhere = jest.fn();
            getMany = jest.fn();
            weightRepository.createQueryBuilder.mockReturnValue({ where, andWhere, getMany });
        })

        it('gets all tasks', () => {
            getMany.mockResolvedValue('dumb data');
            expect(weightService.getMeasurements({}, fakeUser)).resolves.toBe('dumb data');
        });
        it('applies data filters', () => {
            getMany.mockResolvedValue([{ amount: 56.7, unit: WeightUnits.pounds }]);
            expect(weightService.getMeasurements(filterDto, fakeUser)).resolves.toMatchObject([{ unit: WeightUnits.kilograms }]);
            expect(where).toHaveBeenCalled();
            expect(andWhere).toHaveBeenCalledTimes(2);
        });
        it('returns empty array when filters dont match', () => {
            getMany.mockResolvedValue([]);
            expect(weightService.getMeasurements(filterDto, fakeUser)).resolves.toBe([]);
            expect(where).toHaveBeenCalled();
            expect(andWhere).toHaveBeenCalledTimes(2);
        })
    })
});
