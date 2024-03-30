import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef } from "react";
import { CurrentSong } from "./CurrentSong";
import { VolumeControl } from "./VolumeControl";
import { SongControl } from "./SongControl";
import { NextSong, Pause, Play } from "./PlayerIcons";

export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume, setCurrentMusic } =
    usePlayerStore((state) => state);
  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song?.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    const { song, songs } = currentMusic;

    const currentSongIndex = songs.findIndex((s) => s.id === song.id);
    if (currentSongIndex !== -1 && currentSongIndex + 1 < songs.length) {
      const nextSong = songs[currentSongIndex + 1];
      setCurrentMusic({
        ...currentMusic,
        song: nextSong,
      });
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevSong = () => {
    const { song, songs } = currentMusic;

    const currentSongIndex = songs.findIndex((s) => s.id === song.id);
    if (currentSongIndex !== -1 && currentSongIndex - 1 > -1) {
      const prevSong = songs[currentSongIndex - 1];
      setCurrentMusic({
        ...currentMusic,
        song: prevSong,
      });
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <CurrentSong {...currentMusic?.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <div className="flex justify-center flex-row items-center gap-2">
            <button
              className="rounded-full p-2 text-gray-300 hover:text-gray-600"
              onClick={handlePrevSong}
            >
              <NextSong className="rotate-180" />
            </button>
            <button
              className="bg-white rounded-full p-2 hover:bg-gray-300 hover:text-gray-600"
              onClick={handleClick}
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              className="rounded-full p-2 text-gray-300 hover:text-gray-600"
              onClick={handleNextSong}
            >
              <NextSong />
            </button>
          </div>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} onEnded={handleNextSong} />
        </div>
      </div>
      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
