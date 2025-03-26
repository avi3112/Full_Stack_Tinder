#DevTinder APIs
authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password >> this is pending

ConnectionRequestRouter
-POST /request/send/interested/:userID
-POST /request/send/ignore/:userID
-POST /request/review/accepted/:requestID
-POST /request/review/rejected/:requestID

-GET /user/connection
-GET /user/request/received
-GET /user/feed -- gets you the profile of all the users

status:ignore,interested,accepted,rejected
