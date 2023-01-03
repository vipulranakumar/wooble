import * as Multer from "multer";
import * as moment from 'moment-timezone';
import * as Bcrypt from 'bcrypt';

// admin upload
const adminStorageOptions=Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/admin')
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
});
const adminFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// product upload
const productStorageOptions=Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/product')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.originalname.split('.').pop())
    }
});
const productFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4' || file.mimetype ==='video/flv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export class Utils{
    // OTP VALIDATE TIME 
    public MAX_TOKEN_TIME=60000; // In MilliSeconds

    // MULTER FOR FILE UPLOAD IN DIFFERRENT API'S 
    public ProductMulter = Multer({storage:productStorageOptions, fileFilter:productFileFilter});
    public adminMulter = Multer({storage:adminStorageOptions, fileFilter:adminFileFilter});

    // INDIAN TIMEZONE FOR ALL SCHEMAS
    public indianTimeZone = moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');

    static indianTimeZone(){
        return moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');//.format('YYYY-MM-DD hh:mm:ss')
    }

    // Encrypt Password
    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        })
    }

    // Compare Password
    static async comparePassword(password: { plainPassword: string, encryptedPassword: string }): Promise<any> {
        return new Promise(((resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    reject(new Error('User Password Does not Match'));
                } else {
                    resolve(true);
                }
            }))
        }))
    }

}