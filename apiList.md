# DEVS

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

connectionRequestRouter
POST / request/send/interest/:userId
POST / request/send/ignored/:userId

userRouter
POST / request/send/accepted/:userId
POST / request/send/rejected/:userId

GET /connections
GET /