const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the User collection
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:{
            values:["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrected status type`
        },
    },
},
{
    timestamps: true
}
)

connectionRequestSchema.index({fromUserId:1, toUserId:1})

connectionRequestSchema.pre("save", function (next) {
    const ConnectionRequest = this;
    //check if the fromUser is same as toUserId
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",
    connectionRequestSchema
) 

module.exports = ConnectionRequestModel;