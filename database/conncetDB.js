import mongoose from 'mongoose';

const initDatabase=async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        if(connection.readyState === 1){
            console.log('Connected to MongoDB');
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

export default initDatabase;

// const initDatabase=async()=>{
//     if(mongoose.connection.readyState === 1){
//         console.log('Connected to MongoDB');
//         return mongoose.connection.asPromise()
//     }
//     return await mongoose.connect(process.env.MONGO_URI)
// }

// export default initDatabase;