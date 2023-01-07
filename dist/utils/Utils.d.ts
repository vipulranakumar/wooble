import * as Multer from "multer";
import * as moment from 'moment-timezone';
export declare class Utils {
    MAX_TOKEN_TIME: number;
    ProductMulter: Multer.Multer;
    adminMulter: Multer.Multer;
    indianTimeZone: moment.Moment;
    static indianTimeZone(): moment.Moment;
    static encryptPassword(password: string): Promise<any>;
    static comparePassword(password: {
        plainPassword: string;
        encryptedPassword: string;
    }): Promise<any>;
}
