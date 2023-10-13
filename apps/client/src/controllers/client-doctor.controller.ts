import { Controller, Get, Post } from "@nestjs/common";

@Controller()
export class ClientDoctorController {
    public constructor() {}

    @Get("/matching_doctors")
    public async getMatchingDoctors() {}

    @Post("/show/:id")
    public async showDoctor() {}

    @Post("/hide/:id")
    public async hideDoctor() {}
}
