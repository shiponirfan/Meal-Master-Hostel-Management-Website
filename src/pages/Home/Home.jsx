import { Stack } from "@mui/material";
import BannerSlider from "../../components/Home/BannerSlider/BannerSlider";
import MealsCategoryTab from "../../components/Home/MealsCategoryTab/MealsCategoryTab";

const Home = () => {
    return (
        <Stack>
            <BannerSlider/>
            <MealsCategoryTab/>
        </Stack>
    );
};

export default Home;