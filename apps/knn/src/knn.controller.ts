import { CityLibService } from "@app/city-lib";
import { Vertex, DoctorRating, Coordinates, DoctorVertex } from "@app/common";
import { DoctorVerticesService, DoctorVerticeEntity } from "@app/doctor-vertices";
import { FormEntity } from "@app/forms-lib";
import { NatsService } from "@app/nats";
import { SuggestionsVerticesService } from "@app/suggestions-vertices";
import { Controller, OnModuleInit } from "@nestjs/common";
import { Payload, Ctx, EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller()
export class KnnController implements OnModuleInit {
    public constructor(
        private readonly doctorVerticesService: DoctorVerticesService,
        private readonly suggestionsVerticesService: SuggestionsVerticesService,
        private readonly cityService: CityLibService,
        private readonly broker: NatsService
    ) {}

    public async onModuleInit() {
        const conn = await this.broker.connect();
        return conn;
    }

    @EventPattern("doctors")
    public async addNewDoctorVertice(@Payload() doctorStr: string, @Ctx() _context: any) {
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

        await this.doctorVerticesService.addNewVertice(doctorVertice);
    }

    @EventPattern("forms")
    public async addNewSuggestionVertice(@Payload() formStr: string, @Ctx() _context: any) {
        const form: FormEntity = await JSON.parse(formStr);

        const coordinates = await this.cityService.getCoordinatesByCity(form.city);
        const avgPrice = (form.price_from + form.price_to) / 2;

        const { longitude, latitude } = this._normalizeCoordinates(coordinates);
        const price = this._normalizePrice(avgPrice);

        const formVertex: Vertex = {
            longitude: longitude as DoctorRating,
            latitude: latitude as DoctorRating,
            price: price as DoctorRating,
            rating: price as DoctorRating
        };

        const doctorCount = 5;
        const suggestedDoctorVertices: Array<DoctorVertex> = await this.doctorVerticesService
            .findRelevantDoctors(
                formVertex,
                doctorCount
            );


        await this.suggestionsVerticesService.insert({
            form_id: form.id,
            suggestion_vertices: suggestedDoctorVertices
        });
    }

    @EventPattern("hide_doctor")
    public async hideDoctor(@Payload() msg: string) {
        const { doctorId, clientId } = await JSON.parse(msg);

        return this.suggestionsVerticesService.hide({ doctorId, clientId });
    }

    @EventPattern("show_doctor")
    public async showDoctor(@Payload() msg: string) {
        const { doctorId, clientId } = await JSON.parse(msg);

        return this.suggestionsVerticesService.show({ doctorId, clientId });
    }

    @MessagePattern("matching_doctors.input")
    public async handleMatchings(@Payload() formId: string, @Ctx() _context: any) {
        const { id } = JSON.parse(formId).id;
        return this.suggestionsVerticesService.findByFormId(id);
    }
    
    /**
     * 
     * PRIVATE METHODS
     * 
    */


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
