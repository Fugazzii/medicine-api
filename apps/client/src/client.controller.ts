import { Controller, Get } from '@nestjs/common';

@Controller()
export class ClientController {
  
  public constructor() {}

  @Get("/matching_doctors")
  public async getMatchingDoctors() {}
}
