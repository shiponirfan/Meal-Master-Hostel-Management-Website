import { Stack } from "@mui/material";
import BannerSlider from "../../components/Home/BannerSlider/BannerSlider";
import MealsCategoryTab from "../../components/Home/MealsCategoryTab/MealsCategoryTab";
import Membership from "../../components/Membership/Membership";

const Home = () => {
    return (
        <Stack>
            <BannerSlider/>
            <MealsCategoryTab/>
            <Membership/>
        </Stack>
    );
};

export default Home;