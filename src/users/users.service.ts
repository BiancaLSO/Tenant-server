import { Body, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TenantEntity } from './entities/tenant.entity';
import { BoardMemberEntity } from './entities/boardmember.entity';
import { Repository } from 'typeorm';
import { Role } from './roles/role.enum';
import { encodePassword } from 'utils/bcrypt';
import { ApartmentInfo } from 'src/apartment-info/entities/apartment-info.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
    @InjectRepository(BoardMemberEntity)
    private boardMemberRepository: Repository<BoardMemberEntity>,
    @InjectRepository(ApartmentInfo)
    private apartmentInfoRepository: Repository<ApartmentInfo>,
  ) {}

  async createTenant(
    createUserDto: CreateUserDto,
    apartmentInfoId?: number,
  ): Promise<TenantEntity> {
    let apartmentInfo: ApartmentInfo | undefined;

    if (apartmentInfoId !== undefined) {
      apartmentInfo = await this.apartmentInfoRepository.findOneBy({
        id: apartmentInfoId,
      });
    }

    const password = encodePassword(createUserDto.password);
    const user = new User();
    user.email = createUserDto.email;
    user.password = password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.phone = createUserDto.phone;
    user.apartmentInfo = apartmentInfo;
    user.role = Role.User;

    const savedUser = await this.userRepository.save(user);

    const tenant = new TenantEntity();
    tenant.name = createUserDto.firstName;
    tenant.email = createUserDto.email;
    tenant.user = savedUser;
    return this.tenantRepository.save(tenant);
  }

  // this action creates a boardmember with role of admin
  async createBoardMember(
    createUserDto: CreateUserDto,
    apartmentInfoId?: number,
  ): Promise<BoardMemberEntity> {
    let apartmentInfo: ApartmentInfo | undefined;

    if (apartmentInfoId !== undefined) {
      apartmentInfo = await this.apartmentInfoRepository.findOneBy({
        id: apartmentInfoId,
      });
    }

    const password = encodePassword(createUserDto.password);
    const user = new User();
    user.email = createUserDto.email;
    user.password = password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.phone = createUserDto.phone;
    user.apartmentInfo = apartmentInfo;
    user.role = Role.Admin;

    const savedUser = await this.userRepository.save(user);

    const boardMember = new BoardMemberEntity();
    boardMember.name = createUserDto.firstName;
    boardMember.phone = createUserDto.phone;
    boardMember.user = user;
    return this.boardMemberRepository.save(boardMember);
  }

  // login
  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findOne(username: string): Promise<User> {
    const result = await this.userRepository.findOne({
      where: { email: username },
      relations: { tenant: true, board: true },
    });
    return result;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneUser(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const toUpdate = await this.userRepository.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }

  /* These are two methods in the `UsersService` class that are responsible for deleting a tenant and its
associated user from the database. */
  async deleteTenant(tenant: TenantEntity): Promise<void> {
    const user = tenant.user;
    await this.userRepository.delete(user.id);
  }

  async remove(id: number): Promise<void> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    await this.tenantRepository.delete(tenant);
  }
}
