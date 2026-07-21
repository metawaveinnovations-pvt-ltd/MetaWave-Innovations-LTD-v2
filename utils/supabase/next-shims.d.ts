declare module 'next/headers' {
  export function cookies(): Promise<any>;
}

declare module 'next/server' {
  import { IncomingMessage } from 'http';
  export type NextRequest = any;
  export class NextResponse {
    static next(options?: any): any;
    cookies: any;
  }
}
