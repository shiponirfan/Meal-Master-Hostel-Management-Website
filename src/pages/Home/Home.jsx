import { Stack } from "@mui/material";
import BannerSlider from "../../components/Home/BannerSlider/BannerSlider";
import MealsCategoryTab from "../../components/Home/MealsCategoryTab/MealsCategoryTab";
import Membership from "../../components/Membership/Membership";
import FeaturedSection from "../../components/Home/FeaturedSection/FeaturedSection";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";

const Home = () => {
    return (
        <Stack>
            <BannerSlider/>
            <MealsCategoryTab/>
            <HowItWorks/>
            <FeaturedSection/>
            <Membership/>
        </Stack>
    );
};

export default Home;