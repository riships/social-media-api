import User from "../model/user.model.js";

export const toggleFriendship = async (req, res) => {
    try {
        const { userId } = req.user;  // The logged-in user's ID (recipient)
        const { friendId } = req.params;  // The friend user ID (sender)

        // Fetch both users (sender and recipient)
        const sender = await User.findById(userId);
        const recipient = await User.findById(friendId);

        // Check if either user doesn't exist
        if (!sender || !recipient) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if there is an existing friend request
        const existingRequestIndex = recipient.friendRequests.findIndex((req) => {
            return req.sender.toString() === userId && req.status === 'Pending'            
        })        

        if (existingRequestIndex > -1) {
            // Remove the existing friend request if found
            recipient.friendRequests.splice(existingRequestIndex, 1);
            await recipient.save();
            return res.status(200).json({ message: 'Friend request removed' });
        }

        // If no pending request exists, send a new friend request
        recipient.friendRequests.push({ sender: sender._id, status: 'Pending' });
        await recipient.save();

        res.status(200).json({ message: 'Friend request sent' });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const resToFriendRequest = async (req, res) => {
    try {
        const { userId } = req.user;
        const { friendId } = req.params;
        const { action } = req.body;

        const sender = await User.findById(friendId);
        const recipient = await User.findById(userId);

        if (!sender || !recipient) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingRequestIndex = '';

    } catch (error) {

    }
}