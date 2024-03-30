import { type Song } from "@/lib/data";
import SongRow from "./SongRow";

interface MusicsTableProps {
  songs: Song[];
}

export const MusicsTable = ({ songs }: MusicsTableProps) => {
  if (!songs) return;
  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead className="">
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Title</th>
          <th className="px-4 py-2 font-light">Album</th>
          <th className="px-4 py-2 font-light">
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
              <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
            </svg>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, index) => (
          <SongRow
            key={`${song.albumId}-${song.id}`}
            song={song}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
};
