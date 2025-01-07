import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ExampeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx =  context.switchToHttp();
    const req = ctx.getRequest();
   return true;
  }
}
