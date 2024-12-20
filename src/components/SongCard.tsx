import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onPlay: () => void;
}

export function SongCard({ song, isPlaying, onPlay }: SongCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/20 transition-colors">
      <div className="relative aspect-square">
        <img 
          src={song.coverUrl} 
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
        >
          {isPlaying ? (
            <Pause className="w-12 h-12 text-white" />
          ) : (
            <Play className="w-12 h-12 text-white" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1">{song.title}</h3>
        <p className="text-purple-300 mb-2">{song.artist}</p>
        <div className="flex flex-wrap gap-2">
          {song.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}