import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateInfoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  info: string;

  constructor(title: string, info: string) {
    this.title = title;
    this.info = info;
  }
}
