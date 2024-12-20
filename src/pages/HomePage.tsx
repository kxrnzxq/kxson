import React, { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { SongCard } from '../components/SongCard';
import { Song } from '../types';

export default function HomePage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // In a real app, this would fetch from Discord
    // For now, we'll use sample data
    setSongs([
      {
        id: '1',
        title: 'Funky Nights',
        artist: 'Groove Masters',
        coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60',
        audioUrl: '#',
        tags: ['new', 'featured']
      }
    ]);
  }, []);

  const togglePlay = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = song.audioUrl;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-8">Latest Funk Tracks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying && currentSong?.id === song.id}
            onPlay={() => togglePlay(song)}
          />
        ))}
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
}