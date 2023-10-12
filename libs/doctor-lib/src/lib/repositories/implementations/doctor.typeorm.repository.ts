import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteDoctorDto } from '../../dtos/doctor-delete';
import { DoctorUpdateDto } from '../../dtos/doctor-update';
import { DoctorEntity } from '../../entities';
import { DoctorRepositoryInterface } from '../doctor.repository.interface';
import { DoctorTypeormModel } from '../../models';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorTypeormRepository implements DoctorRepositoryInterface {
    public constructor(
        @InjectRepository(DoctorTypeormModel) private readonly repository: Repository<DoctorTypeormModel>
    ) {}

    public async create(newDoctor: Omit<DoctorEntity, 'id'>): Promise<void> {
        await this.repository.insert(newDoctor);
    }

    public async findOne(id: number): Promise<DoctorEntity | undefined>;
    public async findOne(email: string): Promise<DoctorEntity | undefined>;
    public async findOne(arg: string | number): Promise<DoctorEntity | undefined> {
        const isEmail = typeof arg === "string";

        return isEmail 
            ? this.repository.findOne({ where: { email: arg } })
            : this.repository.findOne({ where: { id: arg } });
    }

    public async deleteOne(deleteDoctorDto: DeleteDoctorDto): Promise<void> {
        this.repository.delete(deleteDoctorDto.id);
    }

    public async update(id: number, doctorUpdateDto: DoctorUpdateDto): Promise<DoctorEntity | undefined> {
        const existingDoctor = await this.findOne(id);
        if (existingDoctor) {
            Object.assign(existingDoctor, doctorUpdateDto);
            return await this.repository.save(existingDoctor);
        }
        return undefined;
    }
}
