import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create({ email, name, password }: CreateUserDto) {
    const data = new User({ email, name, password })

    return this.prisma.user.create({
      data
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: string, { name, email }: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { name, email }
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
