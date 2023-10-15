import { ClientDoctorFacade } from "@app/facade/client-doctor.facade";
import { Body, Controller, Post, Req, Res, Scope } from "@nestjs/common";
import { Request, Response } from "express";
import { lastValueFrom, map } from "rxjs";

@Controller({
    scope: Scope.REQUEST
})
export class ClientDoctorController {
    
    public constructor(private readonly facade: ClientDoctorFacade) {}

    @Post("/matching_doctors")
    public async getMatchingDoctors(@Body() formId: number, @Req() req: Request, @Res() res: Response) {
        const token = req.headers.authorization?.split(" ")[1];
        const r = (await this.facade.getMatchingDoctors(formId, token));
        const response = await lastValueFrom(r.pipe(map((data: any) => data)));
        res.json(response);
    }

    @Post("/show/:id")
    public async showDoctor() {}

    @Post("/hide/:id")
    public async hideDoctor() {}
}
