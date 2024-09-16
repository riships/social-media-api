import User from "../model/user.model.js";



export const toggleFriendship = async (req, res) => {
    try {
        const { userId } = req.user;
        const { friendId } = req.params;
        const sender = await User.findById(friendId);
        const recipient = await User.findById(userId);

        if (!sender || !recipient) {
            return res.status(404).json({ message: 'User not found' });
        }
        

        const existingRequest = recipient.friendRequests.find(
            (req) => req.sender.toString() === friendId && req.status === 'pending'
        );

        if (existingRequest) {

        
        }
        console.log(existingRequest);
        
        recipient.friendRequests.push({ sender: sender._id });
        await recipient.save();

        res.status(200).json({ message: 'Friend request sent' });

    } catch (error) {
        return res.status(404).json({ success: false, error: error.message });
    }

}