import type { Playlist } from "@/lib/data";
import { usePlayerStore } from "@/store/playerStore";
import { Volume } from "./PlayerIcons";

interface SideMenuCardProps {
  playlist: Playlist;
}

export const SideMenuCard = ({ playlist }: SideMenuCardProps) => {
  const { id, cover, title, artists } = playlist;

  const artistsSting = artists.join(", ");

  const { isPlaying, currentMusic } = usePlayerStore();
  const currentPlaylistPlaying = isPlaying && currentMusic.playlist?.id === id;

  return (
    <a
      href={`/playlist/${id}`}
      className="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800"
    >
      <picture className="h-12 w-12 flex-none">
        <img
          src={cover}
          alt={`Cover of ${title} by ${artistsSting}`}
          className="object-cover w-full h-full rounded-md"
        />
      </picture>

      <div className="flex flex-auto flex-col truncate">
        <h4
          className={`${
            currentPlaylistPlaying ? "text-green-500" : "text-white"
          } text-sm`}
        >
          {title}
        </h4>
        <span className="text-xs text-gray-400">{artistsSting}</span>
      </div>
      {currentPlaylistPlaying && <Volume className="text-green-400" />}
    </a>
  );
};
