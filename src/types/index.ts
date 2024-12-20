export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  tags: string[];
  createdAt: string;
}

export interface DiscordMessage {
  id: string;
  content: string;
  attachments: {
    url: string;
    filename: string;
  }[];
}