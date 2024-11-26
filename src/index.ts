
import postgresDB from "./adapters/postgresqlAdapter"
import { envs } from "./config"
import { AppRoutes, Server } from "./presentation"


console.log("Running test...");

(()=>{
    main()
})();

async function main(){
    new Server({
        port: envs.SERVER_PORT,
        routes: AppRoutes.routes,
    }).start()
}