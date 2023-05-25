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

  // this action creates a tenant-role with of user
  // async createTenant(createUserDto: CreateUserDto): Promise<TenantEntity> {
  //   const password = encodePassword(createUserDto.password);
  //   const user = await this.userRepository.save({
  //     email: createUserDto.email,
  //     password: password,
  //     firstName: createUserDto.firstName,
  //     lastName: createUserDto.lastName,
  //     phone: createUserDto.phone,
  //     // startDate: createUserDto.startDate,
  //     // endDate: createUserDto.endDate,
  //     role: Role.User,
  //   });
  //   const tenant = new TenantEntity();
  //   tenant.name = createUserDto.firstName;
  //   tenant.email = createUserDto.email;
  //   tenant.user = user;
  //   return this.tenantRepository.save(tenant);
  // }

  async createTenant(
    createUserDto: CreateUserDto,
    apartmentInfoId?: number,
  ): Promise<TenantEntity> {
    const password = encodePassword(createUserDto.password);
    const user = new User();
    user.email = createUserDto.email;
    user.password = password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.phone = createUserDto.phone;
    user.role = Role.User;

    console.log(user.email);
    console.log(apartmentInfoId);

    if (apartmentInfoId) {
      const apartmentInfo = await this.apartmentInfoRepository.findOneBy({
        id: apartmentInfoId,
      });
      if (!apartmentInfo) {
        throw new Error(`ApartmentInfo with ID ${apartmentInfoId} not found.`);
      }
      user.apartmentInfo = apartmentInfo;
    }

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
  ): Promise<BoardMemberEntity> {
    const password = encodePassword(createUserDto.password);
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone,
      // startDate: createUserDto.startDate,
      // endDate: createUserDto.endDate,
      role: Role.Admin,
    });

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
