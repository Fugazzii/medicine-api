import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";

@Controller()
export class ClientFormController {
  public constructor() {}

  @Get("/forms/:id")
  public async getAllForms() {}

  @Get("/form/:id")
  public async getForm() {}

  @Post("/form/:id")
  public async createForm() {}

  @Delete("/form/:id")
  public async deleteForm() {}

  @Patch("/form/:id")
  public async editForm() {}
}
