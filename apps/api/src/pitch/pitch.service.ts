import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { User } from '@prisma/client';

@Injectable()
export class PitchService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreatePitchDto, user: User) {
        return this.prisma.pitch.create({
            data: {
                ...dto,
                ownerId: user.id,
            },
        });
    }

    async findAll() {
        return this.prisma.pitch.findMany({
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.pitch.findUnique({
            where: { id },
            include: { bookings: true },
        });
    }
}
