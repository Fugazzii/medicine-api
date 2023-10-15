import { CityLibService } from "@app/city-lib";
import { Vertex, DoctorRating, Coordinates } from "@app/common";
import { DoctorEntity } from "@app/doctor-lib";
import { DoctorVerticesService, DoctorVerticeEntity } from "@app/doctor-vertices";
import { NatsService } from "@app/nats";
import { Controller, OnModuleInit } from "@nestjs/common";
import { Payload, Ctx, EventPattern } from "@nestjs/microservices";

@Controller()
export class KnnController implements OnModuleInit {
    public constructor(
        private readonly doctorVerticesService: DoctorVerticesService,
        private readonly cityService: CityLibService,
        private readonly broker: NatsService
    ) {}

    public async onModuleInit() {
        const conn = await this.broker.connect();
        return conn;
    }

    @EventPattern("doctors")
    public async addNewDoctorVertice(@Payload() doctorStr: string, @Ctx() context: any) {
        const doctor = await JSON.parse(doctorStr);
        const coordinates = await this.cityService.getCoordinatesByCity(doctor.city);

        const { longitude, latitude } = this._normalizeCoordinates(coordinates);
        const price = this._normalizePrice(doctor.price_in_dollars);
        
        const vertex: Vertex = {
            latitude: latitude as DoctorRating,
            longitude: longitude as DoctorRating,
            rating: doctor.rating as DoctorRating,
            price
        };

        const doctorVertice: DoctorVerticeEntity = {
            doctor_id: doctor.id,
            vertex
        };

        await this.doctorVerticesService.insert(doctorVertice);            
    }

    private _normalizeCoordinates(coordinates: Coordinates): Coordinates {
        const normalizedLatitude = (coordinates.latitude + 90) / 180;
        const normalizedLongitude = (coordinates.longitude + 180) / 360;
        return { latitude: normalizedLatitude, longitude: normalizedLongitude };
    }

    private _normalizePrice(price: number): DoctorRating {
        if (price >= 0 && price <= 500) {
            return 1;
        } else if (price > 500 && price <= 2000) {
            return 2;
        } else if (price > 2000 && price <= 5000) {
            return 3;
        } else if (price > 5000 && price <= 10000) {
            return 4;
        } else {
            return 5;
        }
    }
}
