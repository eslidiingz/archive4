import ArtistsList from "./ArtistsList";

const TopArtists = () => {
  return (
    <>
      {/* header  */}
      <div className="col-12 mt-5 mb-4" align="left">
        <p className="text03">Top Artists</p>
      </div>
      {/* end-header  */}
      {/* content  */}
      <div className="row mb-5">
        {Array.from(Array(4), (_, i) => (
          <ArtistsList index={i + 1} />
        ))}
      </div>
    </>
  );
};

export default TopArtists;
