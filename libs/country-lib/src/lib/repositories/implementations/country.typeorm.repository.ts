import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CountryEntity } from "../../entities";
import { CountryRepositoryInterface } from "../country.repository.interface";
import { CountryTypeormModel } from "../../models";

export class CountryTypeormRepository implements CountryRepositoryInterface {
    
    private readonly countryNames: Array<string>;

    public constructor(
        @InjectRepository(CountryTypeormModel) private readonly repository: Repository<CountryTypeormModel>
    ) {
        this.countryNames = [
            "Afghanistan",
            "Albania",
            "Algeria",
            "Andorra",
            "Angola",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bhutan",
            "Bolivia",
            "Bosnia and Herzegovina",
            "Botswana",
            "Brazil",
            "Brunei",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cabo Verde",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Central African Republic",
            "Chad",
            "Chile",
            "China",
            "Colombia",
            "Comoros",
            "Congo (Congo-Brazzaville)",
            "Costa Rica",
            "Croatia",
            "Cuba",
            "Cyprus",
            "Czechia (Czech Republic)",
            "Democratic Republic of the Congo (Congo-Kinshasa)",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "East Timor (Timor-Leste)",
        ];

        this
            .initialize()
            .then(() => {})
            .catch(err => console.error(`Error while initializing countries ${err}`));
    }

    private async initialize(): Promise<void> {
        try {
            const count = await this.repository.count();
            if (count !== 0) return; 
        
            const query = `INSERT INTO countries (name) VALUES ${this.countryNames.map(name => `('${name}')`).join(", ")}`;
            await this.repository.query(query);
        } catch (error) {
            throw error;
        }
    }

    public async find(id: number): Promise<CountryEntity>;
    public async find(name: string): Promise<CountryEntity>;
    public async find(arg: string | number): Promise<CountryEntity> {
        const isName = typeof arg === "string";

        return isName
            ? this.repository.findOne({ where: { name: arg } }) 
            : this.repository.findOne({ where: { id: arg } });
    }
}
