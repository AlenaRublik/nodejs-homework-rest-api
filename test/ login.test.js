import request from "supertest"
import app from "../app.js"
import {subscriptionList} from "../constants/constants.js";


import {User} from '../models/index.js'
import mongoose from "mongoose"
import "dotenv/config";

const { DB_HOST, PORT } = process.env;

describe("test signin route", ()=> {
    let server = null;
    beforeAll(async()=> {
        await mongoose.connect(DB_HOST);
        server = app.listen(PORT);
    })

    afterAll(async()=> {
        await mongoose.connection.close();
        server.close();
    })

    // beforeEach(()=> {

    // })

    // afterEach(async()=> {
       
    // })

    test("test signin with correct data", async()=> {
        const signinData = {
            email: "test@mail.com",
            password: "5fd626ytg7"
        }
        const {statusCode, body} = await request(app).post("/api/users/login").send(signinData);

        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("token");
        expect(body.user).toHaveProperty("subscription");
        expect(body.user.email).toBe(signinData.email);
        expect(subscriptionList).toContain(body.user.subscription);
        const user = await User.findOne({email: signinData.email});
        expect(user.email).toBe(signinData.email);
    })
})