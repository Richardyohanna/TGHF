import homepageBackground from "../assets/29.jpeg";
import FeedAChildStory from "../sections/FeedAChildStory";
import Hero from "../sections/Hero";
import WhoWeAre from "../sections/WhoWeAre";

const Home = () => {

    return (
        <main className="homepage relative isolate min-h-screen">
            <div
                aria-hidden="true"
                className="homepage-background"
                style={{ backgroundImage: `url("${homepageBackground}")` }}
            />
            <Hero />
            <FeedAChildStory />
            <WhoWeAre />
            
        </main>
    )
}
export default Home;