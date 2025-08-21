import Folder from "../models/folder.model.js";

export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
    const existing = await Folder.findOne({ name });
    if (existing)
      return res.status(400).json({ error: 'Folder already exists' });

    const folder = new Folder({ name });
    await folder.save();

    res.status(201).json(folder);
  } catch (error) {
    console.log('Folder error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.aggregate([
      {
        $lookup: {
          from: 'files',
          localField: '_id',
          foreignField: 'folder',
          as: 'files',
        },
      },
      {
        $addFields: {
          totalItems: { $size: '$files' },
        },
      },
      {
        $project: {
          name: 1,
          totalItems: 1,
        },
      },
    ]);
    res.json(folders);
  } catch (error) {
    console.log('Get Folder error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteFolder = async(req, res) => {
  try {
    const folder = await Folder.findByIdAndDelete(req.params.id);
    if (!folder) return res.status(404).json({ error: 'Folder not found' });
    res.json({ message: 'Folder deleted successfully' });
  } catch (err) {
    console.error('Delete folder error:', err);
    res.status(500).json({ error: err.message });
  }
}