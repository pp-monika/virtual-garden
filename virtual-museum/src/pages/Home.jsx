import FeaturedCollection from "../components/FeaturedCollection"
import USMap from "../components/USMap";
import MysteryBox from "../components/mysteryBox";

export default function Home() {
    return <><FeaturedCollection location="Massachusetts" /><USMap /><MysteryBox /></>;
}