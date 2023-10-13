import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseGuards
} from "@nestjs/common";
import { CreateFormDto } from "@app/forms-lib";
import { AuthClientGuard } from "@app/client-lib/lib/guards";
import {
    ApiOperation,
    ApiConsumes,
    ApiBody,
    ApiTags,
    ApiBearerAuth
} from "@nestjs/swagger";
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
    @ApiOperation({
        summary: "Create new form",
        description: "Endpoint for creating new form."
    })
    @ApiConsumes("application/json")
    @ApiBody({ type: CreateFormDto })
    @Post("/form")
    @UseGuards(AuthClientGuard)
    @HttpCode(HttpStatus.CREATED)
    public createForm(
        @Body() createFormDto: CreateFormDto,
        @Req() req: Request
    ) {
        const token = req.headers.authorization?.split(" ")[1];
        return this.facade.createForm(createFormDto, token);
    }

    /**
     * GET ALL FORMS
     */
    @ApiOperation({
        summary: "Get all forms of a client",
        description: "Endpoint viewing client forms"
    })
    @ApiConsumes("application/json")
    @Get("/forms")
    @UseGuards(AuthClientGuard)
    @HttpCode(HttpStatus.OK)
    public async getForms(@Req() req: Request) {
        const token = req.headers.authorization?.split(" ")[1];
        return this.facade.getForms(token);
    }
    /**
     * GET A FORM BY ID
     */
    @ApiOperation({
        summary: "Get single form",
        description: "Endpoint for retrieving form by id."
    })
    @ApiConsumes("application/json")
    @Get("/form/:id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthClientGuard)
    public async getForm(@Param("id") id: number) {
        return this.facade.getFormById(id);
    }

    /**
     * DELETE A FORM BY ID
     */
    @ApiOperation({
        summary: "Delete form",
        description: "Endpoint for deleting client form."
    })
    @ApiConsumes("application/json")
    @Delete("/form/:id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthClientGuard)
    public deleteForm(@Param("id") id: number) {
        return this.facade.deleteForm(id);
    }

    @Patch("/form/:id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthClientGuard)
    public async editForm() {}
}
