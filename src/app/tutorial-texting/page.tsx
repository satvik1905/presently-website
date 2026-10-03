import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorial – First Time Texting – Presently",
};

export default function TutorialTexting() {
  const fileUrl = `https://www.presently.now/images/Tutorial First time texting.pptx`;
  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;

  return (
    <iframe
      src={viewerUrl}
      className="w-screen h-screen border-0"
      title="Tutorial – First Time Texting"
      allowFullScreen
    />
  );
}
