import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PitchService } from './pitch.service';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('pitches')
export class PitchController {
    constructor(private pitchService: PitchService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    @Post()
    create(@Body() dto: CreatePitchDto, @Request() req: any) {
        return this.pitchService.create(dto, req.user);
    }

    @Get()
    findAll() {
        return this.pitchService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pitchService.findOne(id);
    }
}
