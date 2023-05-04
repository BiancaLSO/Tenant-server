import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApartmentInfoDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  floor: number;

  @IsNumber()
  @IsNotEmpty()
  apartment: number;

  @IsBoolean()
  @IsNotEmpty()
  allowPets: boolean;

  @IsString()
  extraDetails?: string;

  constructor(
    street: string,
    floor: number,
    apartment: number,
    allowPets: boolean,
    extraDetails: string,
  ) {
    this.street = street;
    this.floor = floor;
    this.apartment = apartment;
    this.allowPets = allowPets;
    this.extraDetails = extraDetails;
  }
}
