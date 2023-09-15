const { sealData } = require("iron-session")
const pwd = "kjhbgvfchvbjknlmjhgvfcvhbhnjklmjnhbgvfchvbjknlmjnhbgvfchvjknjknhbgvfhvjbknjnhbgvfvhbjknhbgvvhbjknhbgvvhbj";
module.exports = async function () {
    const c = await sealData((new Date()).toDateString(), { password: pwd })
    console.log(c)
}