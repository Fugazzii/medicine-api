import { Injectable } from "@nestjs/common";
import { KMS } from "@aws-sdk/client-kms";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KmsService {
    
    public constructor(
        private readonly kms: KMS,
        private readonly configService: ConfigService
    ) {}

    public async encrypt(data: Buffer): Promise<Buffer> {
        const response = await this.kms.encrypt({
            KeyId: this.configService.get<string>("AWS_KMS_KEY_ID"),
            Plaintext: data
        });

        return Buffer.from(response.CiphertextBlob);
    }

    public async decrypt(data: Buffer): Promise<Buffer> {
        const response = await this.kms.decrypt({
            CiphertextBlob: data,
        });

        return Buffer.from(response.Plaintext);
    }

}