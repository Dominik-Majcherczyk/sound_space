import React, { useEffect, useState } from "react";
import { getSongs, getSongsBySearch } from "../../actions/songs";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Songs from "../Songs/Songs";
import AddSongForm from "../Form/AddSongForm";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Home({favFilter}) {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page");

  const searchSong = () => {
    if (search.trim() || tags) {
      dispatch(getSongsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/songs/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getSongs());
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchSong();
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <>
      <div className="grid grid-cols-7">
        <div className="col-span-5">
          <Songs className="col-span-2" setCurrentId={setCurrentId} favFilter={favFilter} />
        </div>
        <div className="col-span-2">
          <AddSongForm
            className="flex-col"
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
          <div className="flex flex-col gap-2 mt-8 bg-white rounded-lg p-4">
            <div className="self-center  text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
              Search content
            </div>
            <div className=" relative ">
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="title"
                placeholder="by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <ChipInput
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="by tags"
              variant="outlined"
            />
            <button
              type="submit"
              onClick={searchSong}
              className="py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
