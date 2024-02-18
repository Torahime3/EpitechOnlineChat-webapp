const PrivateMessage = require('../models/private_messages');


async function getAllPrivateMessages(res) {
  try {
    const privateMessages = await PrivateMessage.find();
    res.json(privateMessages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const getPrivateMessageById = async (req, res) => {
  try {
    const privateMessage = await PrivateMessage.findById(req.params.id);
    res.status(200).json(privateMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function createPrivateMessage(req, res) {
  const privateMessage = new PrivateMessage(req.body);
  console.log('Données du message privé à insérer :', req.body);

  try {
    
    const newPrivateMessage = await privateMessage.save();
    console.log('Nouveau message privé inséré avec succès :', newPrivateMessage);
    res.status(201).json(newPrivateMessage);

  } catch (err) {

    console.error('Erreur lors de l\'insertion du message privé :', err);
    res.status(400).json({ message: err.message });

  }
}



async function updatePrivateMessage(req, res) {
  try {
    const privateMessage = await PrivateMessage.findById(req.params.id);

    if (!privateMessage) {
      return res.status(404).json({ message: 'Private message not found' });
    }

    privateMessage.set(req.body);
    await privateMessage.save();

    res.json({
      success: true,
      message: 'User updated',
      privateMessage: privateMessage
  });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


async function deletePrivateMessage(req, res) {
  try {
    const result = await PrivateMessage.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Private message not found' });
    }

    res.json({ message: 'Private Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
  getAllPrivateMessages,
  getPrivateMessageById,
  createPrivateMessage,
  updatePrivateMessage,
  deletePrivateMessage,
};