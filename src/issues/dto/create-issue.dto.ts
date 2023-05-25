import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  imegeUrl?: string;

  constructor(subject: string, description: string, imegeUrl?: string) {
    this.subject = subject;
    this.description = description;
    this.imegeUrl = imegeUrl;
  }
}
