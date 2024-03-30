import type { Song } from "@/lib/data";
import { usePlayerStore } from "@/store/playerStore";

interface SongRowProps {
  song: Song;
  index: number;
}

const PlayButton = ({ className }: { className: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

const PauseButton = ({ className }: { className: string }) => (
  <svg
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={`${className} h-4 w-4`}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
    ></path>
  </svg>
);

const PlayingButton = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className={`${className} fill-green-500`}
  >
    <rect
      className="eq-bar eq-bar--1 fill-green-500"
      x="0"
      y="4"
      width="4"
      height="6"
    />
    <rect
      className="eq-bar eq-bar--2 fill-green-500"
      x="6"
      y="4"
      width="4"
      height="12"
    />
    <rect
      className="eq-bar eq-bar--3 fill-green-500"
      x="12"
      y="4"
      width="4"
      height="8"
    />
  </svg>
);

export const SongRow = ({ song, index }: SongRowProps) => {
  const { isPlaying, currentMusic, setCurrentMusic, setIsPlaying } =
    usePlayerStore();

  const currentSongIsPlaying =
    isPlaying &&
    currentMusic.playlist?.albumId == song.albumId &&
    currentMusic?.song?.id === song?.id;

  const handleSongClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (currentSongIsPlaying) {
      setIsPlaying(false);
      return;
    }

    // same album
    if (currentMusic.playlist?.id === song?.albumId?.toString()) {
      setCurrentMusic({
        ...currentMusic,
        song,
      });
      setIsPlaying(true);
    } else {
      fetch(`/api/get-info-playlist.json?id=${song.albumId}`)
        .then((res) => res.json())
        .then((data) => {
          const { songs, playlist } = data;

          setCurrentMusic({
            songs,
            playlist,
            song: song,
          });
          setIsPlaying(true);
        });
    }
  };

  const getImage = () => {
    if (currentSongIsPlaying) {
      return (
        <div className="relative">
          <PlayingButton className="transition-opacity opacity-100 duration-300 group-hover:opacity-0" />
          <PauseButton className="absolute top-0 left-0 transition-opacity opacity-0 duration-300 group-hover:opacity-100 z-1" />
        </div>
      );
    }
    return (
      <div className="relative">
        <span className="transition-opacity opacity-100 duration-300 group-hover:opacity-0">
          {index + 1}
        </span>
        <PlayButton className="absolute top-0 left-0 transition-opacity opacity-0 duration-300 group-hover:opacity-100 z-1" />
      </div>
    );
  };

  return (
    <tr
      className="group border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 hover:cursor-pointer"
      onClick={handleSongClick}
    >
      <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5 text-right min-w-5 max-w-5">
        {getImage()}
      </td>
      <td className="px-4 py-2 flex gap-3">
        <picture className="">
          <img src={song.image} alt={song.title} className="w-11 h-11" />
        </picture>
        <div className="flex flex-col">
          <h3
            className={`${
              currentSongIsPlaying ? "text-green-500" : "text-white"
            } text-base font-normal`}
          >
            {song.title}
          </h3>
          <span>{song.artists.join(", ")}</span>
        </div>
      </td>
      <td className="px-4 py-2">{song.album}</td>
      <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>
    </tr>
  );
};

export default SongRow;
