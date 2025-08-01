const User=require('../../models/user')

const updateProfile =async (req,res)=>{
    try{
        const userId=req.params.id;
        const {name,avatarUrl,bio} = req.body;


        const user=await User.findById(userId);

        if(req.user.id!==userId){
            return res.status(403).json({msg:"Unauthorized"})
        }

        if(!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        if(name!==undefined)user.name=name;
        if(avatarUrl!=undefined)user.avatarUrl=avatarUrl;
        if(bio!=undefined)user.bio=bio;

        awaituser.save();

        return res.status(200).json({
            msg:"User profile updated",
            user:{
                _id:user._id,
                name:user.name,
                avatarUrl:user.avatarUrl,
                bio:user.bio,
                createdAt:user.createdAt
            }
        });
    }
    catch(error){
        console.error("Profile update error: ",error);
        return res.status(500).json({msg:"Error"});
    }
};