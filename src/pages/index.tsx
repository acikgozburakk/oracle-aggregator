import Head from "next/head";
import HomepageScreen from "@/screen/homePageScreen";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Oracle Aggregator</title>
        <meta
          name="description"
          content="Oracle Aggregator for DeFi application"
        />
      </Head>
      <main>
        <HomepageScreen />
      </main>
    </div>
  );
};

export default Home;
