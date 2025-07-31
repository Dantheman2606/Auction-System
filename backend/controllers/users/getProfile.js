const User = require('../../models/user');

const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // This returns only the necessary fields to avoid sending sensitive information
        // like password or email.
        const user = await User.findById(userId).select({
            name: 1,
            avatarUrl: 1,
            bio: 1,
            createdAt: 1
        });

        if(!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        return res.status(200).json({
            msg: "User profile fetched successfully",
            user
        });
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}
module.exports = getProfile;