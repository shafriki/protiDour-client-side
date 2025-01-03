import React, { useEffect } from 'react';
import BannerCompo from './BannerCompo';
import Latest from '../../Components/Latest';
import FindUs from '../../Components/FindUs';
import History from '../../Components/History';
import Community from '../../Components/Community';
import AboutUs from '../../Components/AboutUs';
import HomeMarathons from '../../Components/HomeMarathons';
import UpcomingMarathons from '../../Components/UpcomingMarathons';

const Home = () => {
    useEffect(() => {
        document.title = "Home | প্রতিদৌড়";
      }, []);

    return (
        <div>
            <BannerCompo></BannerCompo>
            <Latest></Latest>
            <AboutUs></AboutUs>
            <HomeMarathons></HomeMarathons>
            <History></History>
            <UpcomingMarathons></UpcomingMarathons>
            <Community></Community>
            <FindUs></FindUs>
        </div>
    );
};

export default Home;