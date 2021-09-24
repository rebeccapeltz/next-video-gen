import dynamic from "next/dynamic";

const DynamicCreateVideo = dynamic(() => import("../components/CreateVideo"), {
  ssr: false,
});


export default function CreateVideo() {
  return (
  <DynamicCreateVideo />
  );
}
