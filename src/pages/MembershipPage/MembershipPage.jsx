import { Stack } from "@mui/material";
import Membership from "../../components/Membership/Membership";
import BreadcrumbsSection from "../../components/Shared/Breadcrumbs/BreadcrumbsSection";
import featuredImg from "../../assets/banner/videobg.jpg";
import AboutUsSection from "./../../components/Home/AboutUsSection/AboutUsSection";
import { Helmet } from "react-helmet-async";
const MembershipPage = () => {
  return (
    <Stack>
      <Helmet>
        <title>Membership - Meal Master</title>
      </Helmet>
      <BreadcrumbsSection
        mealTitle={"Membership"}
        breadcrumbs={"Membership"}
        mealImage={featuredImg}
      />
      <Membership />
      <AboutUsSection />
    </Stack>
  );
};

export default MembershipPage;
