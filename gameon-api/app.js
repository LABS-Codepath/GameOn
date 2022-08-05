const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const security = require("./middleware/security")
const authRoutes = require("./routes/auth")
const eventsRoutes = require("./routes/events")
const gamesRoutes = require("./routes/games")
const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")

const { BadRequestError, NotFoundError } = require("./utils/errors")

const app = express()

// Enable cross-origin resource sharing for all origins
//middleware
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) //enable cross origin sharing

// Parse incoming request bodies with JSON payloads
app.use(express.json())

// Log request info
app.use(morgan("tiny"))

// For every req, check if a token exists
// in the auth header
// if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)
app.use("/events", eventsRoutes)
app.use("/games", gamesRoutes)
app.use("/posts", postsRoutes)
app.use("/user", userRoutes)

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message =error.message

    return res.status(status).json({
        error: { message, status },
    })
})

module.exports = app