import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorial – Monthly Uploading – Presently",
};

export default function TutorialUploading() {
  const fileUrl = `https://www.presently.now/images/Turtorial - Monthly Uploading.pptx`;
  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;

  return (
    <iframe
      src={viewerUrl}
      className="w-screen h-screen border-0"
      title="Tutorial – Monthly Uploading"
      allowFullScreen
    />
  );
}
