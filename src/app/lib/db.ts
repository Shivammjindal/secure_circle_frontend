import mongoose from "mongoose"

export default async function connect() {

    try {

        const url = process.env.DATABASE_URL

        await mongoose.connect(url!).then(() => {
            console.log('mongodb conected')
        })
    
    } catch (error) {
        console.log('E:// Error is occured in connecting to db',error)
    }
}