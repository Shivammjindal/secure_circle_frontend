// Defining Types global k andr mongoose
import { Connection } from "mongoose"

declare global {
    var mongoose : {
        conn: Connection | null,
        promise : Promise<Connection> | null
    }
}

// export file as module
export {}