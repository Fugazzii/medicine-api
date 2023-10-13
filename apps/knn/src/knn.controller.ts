import { CityLibService } from "@app/city-lib";
import { Vertex, DoctorRating, Coordinates } from "@app/common";
import { DoctorEntity } from "@app/doctor-lib";
import { DoctorVerticesService, DoctorVerticeEntity } from "@app/doctor-vertices";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload, Ctx } from "@nestjs/microservices";

@Controller()
export class KnnController {
    public constructor(
        private readonly doctorVerticesService: DoctorVerticesService,
        private readonly cityService: CityLibService
    ) {}

    @MessagePattern("arn:aws:sns:us-east-1:083344429626:medicine_api-new_doctor_vertice.fifo")
    public async addNewDoctorVertice(@Payload() doctor: DoctorEntity, @Ctx() context: any) {
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
