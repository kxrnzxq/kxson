import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = join(__dirname, '..', '.admin-token');

async function generateAdminLink() {
  try {
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Save token to file for verification
    await fs.writeFile(TOKEN_FILE, token);
    
    // Get the base URL from environment or default to localhost
    const baseUrl = process.env.BASE_URL || 'http://localhost:5173';
    const adminUrl = `${baseUrl}/admin/${token}`;
    
    console.log('\n🎵 Funk Music Admin Dashboard 🎵');
    console.log('=====================================');
    console.log('\nYour secure admin dashboard link:');
    console.log('\x1b[36m%s\x1b[0m', adminUrl);
    console.log('\nThis link will expire when you generate a new one.');
    console.log('Keep this link secret and secure!\n');
    
  } catch (error) {
    console.error('Error generating admin link:', error);
    process.exit(1);
  }
}

generateAdminLink();