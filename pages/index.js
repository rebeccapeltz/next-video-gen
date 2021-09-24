import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicVideoQuiz = dynamic(() => import("../components/VideoQuiz"), {
  ssr: false,
});

export default function Home() {
  return (
    
    <div>
       <Head>
          <title>Video Quiz</title>
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
      <DynamicVideoQuiz />
    </div>
  )
}
