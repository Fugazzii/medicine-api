import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorTypeormModel } from "./lib/models";
import { JwtService, MailSenderProvider, MailSenderSource } from "@app/common";
import { RedisService } from "@app/redis";
import { DOCTOR_REPOSITORY_TOKEN } from "./lib/repositories";
import { DoctorTypeormRepository } from "./lib/repositories/implementations/doctor.typeorm.repository";
import { DoctorAuthService } from "./lib/services";
import { SpecialtyTypeormModel } from "@app/specialty";
import { CityTypeormModel } from "@app/city-lib";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DoctorTypeormModel,
            SpecialtyTypeormModel,
            CityTypeormModel
        ])
    ],
    providers: [
        DoctorAuthService,
        JwtService,
        RedisService,
        MailSenderProvider.forRoot(MailSenderSource.AWS_SES),
        { provide: DOCTOR_REPOSITORY_TOKEN, useClass: DoctorTypeormRepository }
    ],
    exports: [DoctorAuthService]
})
export class DoctorLibModule {}
