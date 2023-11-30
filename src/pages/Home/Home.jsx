import { Stack } from "@mui/material";
import BannerSlider from "../../components/Home/BannerSlider/BannerSlider";
import MealsCategoryTab from "../../components/Home/MealsCategoryTab/MealsCategoryTab";
import Membership from "../../components/Membership/Membership";
import FeaturedSection from "../../components/Home/FeaturedSection/FeaturedSection";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import AboutUsSection from "../../components/Home/AboutUsSection/AboutUsSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <Stack>
      <Helmet>
        <title>Meal Master - Home</title>
      </Helmet>
      <BannerSlider />
      <MealsCategoryTab />
      <HowItWorks />
      <AboutUsSection />
      <Membership />
      <FeaturedSection />
    </Stack>
  );
};

export default Home;
