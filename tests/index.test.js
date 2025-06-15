const axios = require("axios");

const BACKEND_URL = "http://localhost:3000/api/v1";

// async function call() {
//     req = {
//         body: {
//             username: "usere343tgnmfdagaagkfasssg",
//             email: "test@example.com",
//             password: "password123",
//             isAdmin: "false",
//         },
//         file: { path: "./uploads/img1.jpg" },
//     };

//     const response = await axios.post(`${BACKEND_URL}/auth/signup`, req, {
//         withCredentials: true,
//         credentials: "include",
//         headers: { "Content-Type": "multipart/form-data" },
//     });

//     console.log(response.data);
// }

// call();

describe("SOmethig", () => {
    test("User get", async () => {
        const response = await axios.get(`${BACKEND_URL}/user/me`);
        expect(response).toBeDefined();
    });
});

describe("User registeration", () => {
    test("User not able to sign up if username is not provided", async () => {
        req = {
            body: {
                username: "usere343tgnmfdagaagkfasssg",
                email: "test@example.com",
                password: "password123",
                isAdmin: "false",
            },
            file: { path: "./uploads/img1.jpg" },
        };

        const response = await axios.post(`${BACKEND_URL}/auth/signup`, req, {
            withCredentials: true,
            credentials: "include",
            headers: { "Content-Type": "multipart/form-data" },
        });

        expect(response.statusCode).toBe(200);
    });
});
