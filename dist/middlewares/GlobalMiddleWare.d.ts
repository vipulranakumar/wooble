export declare class GlobalMiddleWare {
    static checkError(req: any, res: any, next: any): void;
    static adminAuthenticate(req: any, res: any, next: any): Promise<void>;
}
