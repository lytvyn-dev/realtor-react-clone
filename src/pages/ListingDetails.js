import { MdKingBed, MdLocationOn } from "react-icons/md";
import { TbBathFilled } from "react-icons/tb";
import { RiParkingBoxFill } from "react-icons/ri";
import { FaChair } from "react-icons/fa";
//* react
import { useEffect, useState } from "react";
import { useParams } from "react-router";
//* components
import LandLord from "../components/LandLord";
import Spinner from "../components/Spinner";
//* utils
import { fetchListingById } from "../utils/fetchListingById";
//* splide slider
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";

function ListingDetails() {
  const { listingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState();
  const [listing, setListing] = useState();

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setListing(await fetchListingById(listingId));
      setLoading(false);
    };
    fetchListing();
  }, [listingId]);

  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: true,
    height: "19rem",
  };

  if (loading) return <Spinner />;
  return (
    <section className="h-screen flex flex-col gap-5 mb-32">
      <Splide options={options} hasTrack={false} className="relative">
        <div style={{ position: "relative" }}>
          <SplideTrack>
            {listing?.imgUrls.map((image, index) => (
              <SplideSlide key={index}>
                <div
                  className="relative w-full overflow-hidden h-[300px]"
                  style={{
                    background: `url(${listing.imgUrls[index]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>

        <div className="splide__progress absolute top-0 left-0 w-full bg-blue-400">
          <div className="splide__progress__bar" />
        </div>
      </Splide>

      <div
        className="bg-white shadow-lg h-[445
				px] container  mx-auto flex flex-col md:flex-row gap-4 pt-10 pb-5 px-3"
      >
        <div className="basis-1/2 flex flex-col gap-4">
          <p className="text-2xl font-bold text-blue-900">{listing?.name}</p>
          <address className="flex items-center gap-1 not-italic font-medium">
            <MdLocationOn /> {listing?.address}
          </address>
          <div className="flex gap-3">
            <div className="flex items-center  justify-center text-sm md:text-base  text-white  font-bold bg-red-700 rounded py-1 w-[160px] text-center">
              For <span className="capitalize">{listing?.type}</span>
            </div>
            <div className="flex items-center  justify-center text-white text-sm md:text-base  font-bold bg-green-700 rounded py-1 w-[160px] text-center">
              {listing?.offer
                ? `$${(listing?.price - listing.discount)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} discount`
                : listing?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
          <p>
            <span className="font-bold">Description</span> - {listing?.description}
          </p>
          <div className="flex items-center gap-2 sm:gap-12 text-sm font-bold">
            <div className="flex items-center gap-1">
              <MdKingBed /> {} Beds
            </div>
            <div className="flex items-center gap-1">
              <TbBathFilled /> Bath
            </div>
            <div className="flex items-center gap-1">
              <RiParkingBoxFill /> {listing?.parking ? "Parking" : "No parking"}
            </div>
            <div className="flex items-center gap-1">
              <FaChair /> {listing?.furnished ? "Furnished" : "Not furnished"}
            </div>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="uppercase w-full bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 shadow-xl"
            >
              Contact landlord
            </button>
          )}
          {showForm && <LandLord userRef={listing.userRef} listingTitle={listing.description} />}
        </div>
        <div className="basis-1/2bg-gray-30">
          <p>Text</p>
        </div>
      </div>
    </section>
  );
}

export default ListingDetails;
