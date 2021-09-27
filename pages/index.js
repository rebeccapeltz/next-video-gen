import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicVideoQuiz = dynamic(() => import("../components/VideoQuiz"), {
  ssr: false,
});

export default function Home() {
  const quiz = {
    cloudName: "dhhz4q1ip",
    publicId: "test927",
    playedEventTimes: [1.5, 3, 4.5, 6, 7.5],
    questions: {
      4.5: {
        question: "How many kittens?",
        correctResponse: "Correct!",
        errorResponse: "Correct answer: 1",
        correctAnswer: "1",
      },
      7.5: {
        question: "How many puppies?",
        correctResponse: "Correct!",
        errorReponse: "Correct answer: 2",
        correctAnswer: "2",
      },
    },
  };
  return (
    <div>
      <Head>
        <title>Video Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicVideoQuiz quiz={quiz}/>
    </div>
  );
}
