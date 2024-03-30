import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef } from "react";
import { CurrentSong } from "./CurrentSong";
import { VolumeControl } from "./VolumeControl";
import { SongControl } from "./SongControl";
import { Pause, Play } from "./PlayerIcons";

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

  const nextSong = () => {
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

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <CurrentSong {...currentMusic?.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} onEnded={nextSong} />
        </div>
      </div>
      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
