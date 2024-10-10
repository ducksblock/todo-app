import { Mongoose } from 'mongoose';

declare global {
    var _mongoCache: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };
}

export { };
