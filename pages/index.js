import dynamic from "next/dynamic";

const DynamicVideoQuiz = dynamic(() => import("../components/VideoQuiz"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <DynamicVideoQuiz />
    </div>
  )
}
