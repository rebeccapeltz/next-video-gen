import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicCreateVideo = dynamic(() => import("../components/CreateVideo"), {
  ssr: false,
});

export default function CreateVideo() {
  return (
    <div>
      <Head>
        <title>Video Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicCreateVideo />
    </div>
  );
}
