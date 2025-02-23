import FeaturedCollection from "../components/FeaturedCollection"
import USMap from "../components/USMap";
import MysteryBox from "../components/mysteryBox";
import RecommendedCollections from "../components/RecommendedCollections";

export default function Home() {
    return <><FeaturedCollection location="Massachusetts" /><RecommendedCollections /><USMap /><MysteryBox /></>;
}