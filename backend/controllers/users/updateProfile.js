const User = require('../../models/user')

const updateProfile = async (req, res) => {
    try {
        const userId = req.user_id.id;
        const { name, email, avatarUrl, bio } = req.body;

        // Validate input
        const user = await User.findById(userId);

        console.log("Fetched user:", user);

        if (req.user.id !== userId) {
            return res.status(403).json({ msg: "Unauthorized" })
        }

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // Check if email is provided and if it is different from the current email
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ msg: 'Email already in use' });
            }
            user.email = email;
        }

        if (name !== undefined) user.name = name;
        if (avatarUrl != undefined) user.avatarUrl = avatarUrl;
        if (bio != undefined) user.bio = bio;
        if(email != undefined) user.email = email;

        await user.save();

        return res.status(200).json({
            msg: "User profile updated",
            user: {
                _id: user._id,
                name: user.name,
                avatarUrl: user.avatarUrl,
                bio: user.bio,
                email:user.email,
                createdAt: user.createdAt
            }
        });
    }
    catch (error) {
        console.error("Profile update error: ", error);
        return res.status(500).json({ msg: "Error" });
    }
};

module.exports = updateProfile;