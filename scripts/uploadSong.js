import { Client, WebhookClient } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function uploadSong() {
  try {
    const webhook = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });
    
    // Get song details from user
    const title = await question('Song title: ');
    const artist = await question('Artist name: ');
    const tagsInput = await question('Tags (comma-separated): ');
    const tags = tagsInput.split(',').map(tag => tag.trim());
    const mp3Path = await question('Path to MP3 file: ');
    const coverPath = await question('Path to cover image: ');

    // Validate files exist
    await fs.access(mp3Path);
    await fs.access(coverPath);

    // Create metadata
    const metadata = {
      title,
      artist,
      tags,
      timestamp: new Date().toISOString()
    };

    // Upload to Discord
    const message = await webhook.send({
      content: JSON.stringify(metadata),
      files: [
        { attachment: mp3Path, name: path.basename(mp3Path) },
        { attachment: coverPath, name: path.basename(coverPath) }
      ]
    });

    console.log('\n✅ Song uploaded successfully!');
    console.log('Discord Message ID:', message.id);
    
    rl.close();
  } catch (error) {
    console.error('Error uploading song:', error);
    rl.close();
    process.exit(1);
  }
}

uploadSong();