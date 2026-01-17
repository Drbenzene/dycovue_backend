import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from '../interfaces/api-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        let message = exception.message;
        let errors: any[] | undefined = undefined;

        if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
            const responseObj = exceptionResponse as any;
            message = Array.isArray(responseObj.message)
                ? responseObj.message[0]
                : responseObj.message;

            if (Array.isArray(responseObj.message)) {
                errors = responseObj.message;
            }
        }

        const errorResponse: ApiErrorResponse = {
            success: false,
            statusCode: status,
            message,
            error: HttpStatus[status] || 'Error',
            errors,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        response.status(status).json(errorResponse);
    }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof Error
                ? exception.message
                : 'Internal server error';

        const errorResponse: ApiErrorResponse = {
            success: false,
            statusCode: status,
            message,
            error: HttpStatus[status] || 'Internal Server Error',
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        response.status(status).json(errorResponse);
    }
}
