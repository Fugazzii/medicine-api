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
  
  public constructor(
    private readonly facade: ClientFormFacade
  ) {}

  @ApiOperation({ summary: "Get all forms of a client", description: "Endpoint viewing client forms" })
  @ApiConsumes("application/json")
  @Get("/forms/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async getAllForms(@Param("id") id: number) {
    try {
      const result = null;

      return {
        data: result,
        message: "Retrieved form",
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: "Error when retrieving forms",
        error
      };
    }
  }

  

  @ApiOperation({ summary: "Get single form", description: "Endpoint for retrieving form by id." })
  @ApiConsumes("application/json")
  @Get("/form/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async getForm(@Param("id") id: number) {
    try {
      const result = null;

      return {
        data: result,
        message: "Retrieved form",
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: "Error when retrieving form",
        error
      };
    }
  }

  @ApiOperation({ summary: "Create new form", description: "Endpoint for creating new form." })
  @ApiConsumes("application/json")
  @ApiBody({ type: CreateFormDto })
  @Post("/form")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthClientGuard)
  // Might be problem here in req
  public async createForm(@Body() createFormDto: CreateFormDto, @Req() req: Request) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      console.log("Token", token);
      const result = await this.facade.createForm(createFormDto, token);

      return {
        data: result,
        message: "Created new form",
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: "Error when creating form",
        error
      };
    }
  }

  @ApiOperation({ summary: "Delete form", description: "Endpoint for deleting client form." })
  @ApiConsumes("application/json")
  @Delete("/form/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async deleteForm(@Param("id") id: number) {
    try {
      const result = null;

      return {
        data: result,
        message: "Deleted form",
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: "Error when deleting form",
        error
      };
    }
  }

  @Patch("/form/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthClientGuard)
  public async editForm() {}
}
