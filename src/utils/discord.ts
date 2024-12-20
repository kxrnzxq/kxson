import { DiscordMessage, Song } from '../types';

export async function fetchSongsFromDiscord(): Promise<Song[]> {
  try {
    const response = await fetch(process.env.VITE_DISCORD_CHANNEL_URL);
    const messages: DiscordMessage[] = await response.json();

    return messages.map(message => {
      const metadata = JSON.parse(message.content);
      const audioAttachment = message.attachments.find(a => a.filename.endsWith('.mp3'));
      const imageAttachment = message.attachments.find(a => !a.filename.endsWith('.mp3'));

      return {
        id: message.id,
        title: metadata.title,
        artist: metadata.artist,
        coverUrl: imageAttachment?.url || '',
        audioUrl: audioAttachment?.url || '',
        tags: metadata.tags,
        createdAt: metadata.timestamp
      };
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
}