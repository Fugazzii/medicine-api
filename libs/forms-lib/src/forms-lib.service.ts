import { Inject, Injectable } from '@nestjs/common';
import { FormRepositoryInterface } from './lib/repositories';

@Injectable()
export class FormsLibService {

    public constructor(
        @Inject("TOKEN") private readonly formRepository: FormRepositoryInterface
    ) {}

    
}
