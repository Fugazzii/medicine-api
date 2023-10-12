import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CreateFormDto } from "@app/forms-lib";
import { AuthClientGuard } from "@app/client-lib/lib/guards";
import { ApiOperation, ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ClientFormFacade } from "@app/facade/client-form.facade";
import { Request } from "express";

@ApiTags("Forms")
@ApiBearerAuth()
@Controller()
export class ClientFormController {
  
  public constructor(private readonly facade: ClientFormFacade) {}

  /** 
   * CREATE NEW FORM
   */
  @ApiOperation({ summary: "Create new form", description: "Endpoint for creating new form." })
  @ApiConsumes("application/json")
  @ApiBody({ type: CreateFormDto })
  @Post("/form")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthClientGuard)
  public async createForm(@Body() createFormDto: CreateFormDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await this.facade.createForm(createFormDto, token);

    return {
      data: result,
      message: "Created new form",
      success: true
    };
  }

  /** 
   * GET ALL FORMS
   */
  @ApiOperation({ summary: "Get all forms of a client", description: "Endpoint viewing client forms" })
  @ApiConsumes("application/json")
  @Get("/forms")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async getAllForms(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await this.facade.getForms(token);

    return {
      data: result,
      message: "Retrieved form",
      success: true
    };
  }
  /** 
   * GET A FORM BY ID
   */
  @ApiOperation({ summary: "Get single form", description: "Endpoint for retrieving form by id." })
  @ApiConsumes("application/json")
  @Get("/form/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async getForm(@Param("id") id: number) {
    const result = await this.facade.getFormById(id);

    return {
      data: result,
      message: "Retrieved form",
      success: true
    };
  }

  /** 
   * DELETE A FORM BY ID
   */
  @ApiOperation({ summary: "Delete form", description: "Endpoint for deleting client form." })
  @ApiConsumes("application/json")
  @Delete("/form/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async deleteForm(@Param("id") id: number) {
    const result = await this.facade.deleteForm(id);

    return {
      data: result,
      message: "Deleted form",
      success: true
    };
  }

  @Patch("/form/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async editForm() {}
}
