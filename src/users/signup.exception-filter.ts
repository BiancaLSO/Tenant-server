import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
@Catch(Error)
export class SignupExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = 400; // Set the appropriate HTTP status code for the error
    const message = 'Error from server.'; // Default error message

    if (error.message === 'Email already exists') {
      response.status(status).json({
        error: 'EmailAlreadyExists',
        message: 'Sign-up failed. Email already exists.',
      });
    } else {
      response.status(status).json({
        error: 'ErrorFromServer',
        message,
      });
    }
  }
}
