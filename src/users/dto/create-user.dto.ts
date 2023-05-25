import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  apartmentInfo?: number;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string,
    apartmentInfo?: number,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.phone = phone;
    this.apartmentInfo = apartmentInfo;
  }
}
