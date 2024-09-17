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

        const requestIndex = recipient.friendRequests.findIndex((req) => {
            return req.sender.toString() === friendId && req.status === 'Pending'
        })

        if (requestIndex === -1) {
            return res.status(400).json({ message: 'Friend request not found' });
        }

        if (action.toLowerCase() === 'accept') {
            recipient.friends.push(sender._id);
            sender.friends.push(recipient._id);

            // Remove the pending request from the recipient's friend requests list
            recipient.friendRequests.splice(requestIndex, 1);
            await recipient.save();
            await sender.save();

            return res.status(200).json({ message: 'Friend request accepted' });
        } else if (action.toLowerCase() === 'reject') {
            // Reject the friend request: Simply remove it from the pending requests list
            recipient.friendRequests.splice(requestIndex, 1);
            await recipient.save();

            return res.status(200).json({ message: 'Friend request rejected' });
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


export const getFriends = async (req, res) => {
    try {
        const { userId } = req.params;
        const userData = await User.findById(userId).populate('friends');
        if (!userData.friends) {
            return res.status(404).json({ message: "User didn't have friend!" });
        }
        return res.status(200).send({ success: true, friends: userData.friends})

    } catch (error) {
        return res.status(500).send({ success: false, error: error.message })
    }
}



export const getPendingFriendRequests = async (req, res) => {
    try {
        const { userId } = req.user;
        const userData = await User.findById(userId).populate('friendRequests');
        if (!userData.friendRequests) {
            return res.status(404).json({ message: "User didn't have friend requests!" });
        }
        return res.status(200).send({ success: true, friendRequests: userData.friendRequests })

    } catch (error) {
        return res.status(500).send({ success: false, error: error.message })
    }
}