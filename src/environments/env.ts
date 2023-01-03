import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environment {
    db_url: string,
    jwt_secret: string
}

export function getEnvironmentVariables() {

    if(process.env.NODE_ENV==='PRODUCTION'){
        return ProdEnvironment;
    }
    return DevEnvironment;
    
}