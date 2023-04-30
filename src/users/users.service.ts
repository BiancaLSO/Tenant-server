import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TenantEntity } from './entities/tenant.entity';
import { BoardMemberEntity } from './entities/boardmember.entity';
import { Repository } from 'typeorm';
import { Role } from './roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
    @InjectRepository(BoardMemberEntity)
    private boardMemberRepository: Repository<BoardMemberEntity>,
  ) {}

  // this action creates a tenant-role with of user
  async createTenant(createUserDto: CreateUserDto): Promise<TenantEntity> {
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone,
      startDate: createUserDto.startDate,
      endDate: createUserDto.endDate,
      role: Role.User,
    });
    const tenant = new TenantEntity();
    tenant.name = createUserDto.firstName;
    tenant.email = createUserDto.email;
    tenant.user = user;
    return this.tenantRepository.save(tenant);
  }
  // this action creates a boardmember with role of admin
  async createBoardMember(
    createUserDto: CreateUserDto,
  ): Promise<BoardMemberEntity> {
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone,
      startDate: createUserDto.startDate,
      endDate: createUserDto.endDate,
      role: Role.Admin,
    });

    const boardMember = new BoardMemberEntity();
    boardMember.name = createUserDto.firstName;
    boardMember.phone = createUserDto.phone;
    boardMember.user = user;

    return this.boardMemberRepository.save(boardMember);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
