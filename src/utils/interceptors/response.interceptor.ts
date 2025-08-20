import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((return_data: any) => {
        let response_data: any = {
          code: 200,
          time: new Date().getTime(),
        };
        if (return_data !== null && return_data !== undefined) {
          if (return_data.message !== null && return_data.message !== undefined)
            response_data = {
              ...response_data,
              message: return_data.message,
            };
          if (return_data.data !== null && return_data.data !== undefined)
            response_data = {
              ...response_data,
              data: return_data.data,
            };
        }
        return response_data;
      }),
    );
  }
}
