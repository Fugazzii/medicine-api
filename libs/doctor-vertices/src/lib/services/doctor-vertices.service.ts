import { Inject, Injectable } from "@nestjs/common";
import { DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN, DoctorVerticeRepositoryInterface } from "../repositories";
import { DoctorVerticeEntity } from "../entities";
import { DoctorVertex, Vertex } from "@app/common";

type Distance = { distance: number, doctor_id: number };

@Injectable()
export class DoctorVerticesService {
    public constructor(
        @Inject(DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN) private readonly doctorVerticeRepository: DoctorVerticeRepositoryInterface
    ) {}
   
    public async getVerticeById(id: number) {
        return this.doctorVerticeRepository.findOne(id);
    }
    
    public async addNewVertice(doctorVerticeEntity: DoctorVerticeEntity) {
        return this.doctorVerticeRepository.insert(doctorVerticeEntity);
    }

    /** Implementation of K-nearest Neighbour algorithm  */
    public async findRelevantDoctors(formVertex: Vertex, k: number): Promise<Array<DoctorVertex>> {
        const result = new Array<DoctorVertex>();

        const doctorVertices = await this.doctorVerticeRepository.findAll();        

        const distances: Array<Distance> = doctorVertices.map((v: DoctorVerticeEntity) => {
            const distance = this._getDistance(v.vertex, formVertex);
        
            return {
                distance,
                doctor_id: v.doctor_id
            };
        });

        distances.sort((d1, d2) => d1.distance - d2.distance);

        for(let i = 0; i < k; i++) {
            const { doctor_id } = distances[i];
            
            const doctorVertice: DoctorVerticeEntity = doctorVertices.find((val: DoctorVerticeEntity) => val.doctor_id === doctor_id);
            const vertice: DoctorVertex = {
                ...doctorVertice.vertex,
                isHidden: false,
                doctor_id
            };
            result.push(vertice);
        }

        return result;
    }

    private _getDistance(v1: Vertex, v2: Vertex) {
        const p1 = Math.pow(v1.latitude - v2.latitude, 2);
        const p2 = Math.pow(v1.longitude - v2.longitude, 2);
        const p3 = Math.pow(v1.price - v2.price, 2);
        const p4 = Math.pow(v1.rating - v2.rating, 2);
        const distance = Math.sqrt(p1 + p2 + p3 + p4);
        
        return distance;
    }
}