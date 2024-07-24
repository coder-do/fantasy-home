import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import formidable, { IncomingForm } from 'formidable';
import { ReadStream, createWriteStream } from 'fs';

// Disable Next.js built-in body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form data:', err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const { title, description, category } = fields;
    const imageFiles = files.image;

    // Convert arrays to single values
    const titleValue = Array.isArray(title) ? title[0] : title;
    const descriptionValue = Array.isArray(description) ? description[0] : description;
    const categoryValue = Array.isArray(category) ? category[0] : category;

    // Ensure values are valid
    if (!titleValue || !descriptionValue || !categoryValue) {
      return res.status(400).json({ message: 'Title, description, and category are required' });
    }

    if (!imageFiles || Array.isArray(imageFiles) ? imageFiles?.length === 0 : !(imageFiles as any).filepath) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageFile = Array.isArray(imageFiles) ? imageFiles[0] : imageFiles;
    const originalExtension = path.extname(imageFile?.originalFilename || '');
    const newImageFilename = `upload-${Date.now()}`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const newImagePath = path.join(uploadsDir, newImageFilename + originalExtension);

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Create a write stream for the new file path
    const writeStream = createWriteStream(newImagePath);

    // Stream the file from the request to the new file path
    const readStream = fs.createReadStream((imageFile as any)?.filepath);
    readStream.pipe(writeStream);

    // Handle errors during streaming
    readStream.on('error', (error) => {
      console.error('Error reading file stream:', error);
      return res.status(500).json({ message: 'Error processing file' });
    });

    writeStream.on('error', (error) => {
      console.error('Error writing file stream:', error);
      return res.status(500).json({ message: 'Error processing file' });
    });

    writeStream.on('finish', () => {
      // File successfully saved
      const imageUrl = `/uploads/${newImageFilename}${originalExtension}`;
      const newEntry = { title: titleValue, description: descriptionValue, image: imageUrl };

      const jsonFilePath = path.join(process.cwd(), 'public', 'data.json');
      let data: Record<string, any>;

      try {
        data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
      } catch (error) {
        data = {};
      }

      // Update the data object
      if (data[categoryValue]) {
        data[categoryValue].push(newEntry);
      } else {
        data[categoryValue] = [newEntry];
      }

      try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
      } catch (error) {
        console.error('Error writing file:', error);
        return res.status(500).json({ message: 'Error writing file' });
      }

      res.status(200).json({ message: 'Entry added successfully', entry: newEntry });
    });
  });
}

