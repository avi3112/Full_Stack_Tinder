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
-- above 2 done in one API itself

-POST /request/review/:status/:requestID
-POST /request/review/rejected/:requestID
-- above 2 api done in one itself

//userRouter
-GET /user/request/received >> who has interested with me
-GET /user/connection >>> who has connected with me
-GET /user/feed -- gets you the profile of all the users

status:ignore,interested,accepted,rejected
