"use client";
import React, { useState } from "react";

export default function Page({
  params,
}: {
  params: { organizationID: string };
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    thumbnail_image_url: "",
    tags: "",
    is_private: false,
    is_adult: false,
    external_cutout: false,
    is_ad: false,
    campaign_id: "",
    ad_link: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedVideo(event.target.files[0]);
    }
  };

  const handleMetaChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setMetaData({
        ...metaData,
        [name]: checked,
      });
    } else {
      setMetaData({
        ...metaData,
        [name]: value,
      });
    }
  };

  const token = localStorage.getItem("token") || "";
  if (token === "") {
    window.location.href = "/login";
    return;
  }

  const uuid = "upload_id" + "_" + crypto.randomUUID();

  const handleUpload = async () => {
    if (!selectedImage || !selectedVideo) return;

    const chunkSize = 45 * 1024 * 1024; // 45MB chunk size
    const totalImageChunks = Math.ceil(selectedImage.size / chunkSize);
    const totalVideoChunks = Math.ceil(selectedVideo.size / chunkSize);
    const totalChunks = Math.max(totalImageChunks, totalVideoChunks);

    for (let i = 0; i < totalChunks; i++) {
      const imageStart = i * chunkSize;
      const imageEnd = Math.min(imageStart + chunkSize, selectedImage.size);
      const videoStart = i * chunkSize;
      const videoEnd = Math.min(videoStart + chunkSize, selectedVideo.size);

      const imageChunk = selectedImage.slice(imageStart, imageEnd);
      const videoChunk = selectedVideo.slice(videoStart, videoEnd);

      const formData = new FormData();
      formData.append("image", imageChunk);
      formData.append("video", videoChunk);
      formData.append("chunkNumber", i.toString());
      formData.append("totalChunks", totalChunks.toString());
      formData.append("videoType", selectedVideo.type);
      formData.append("imageType", selectedImage.type);
      formData.append("uploadID", uuid);

      // Metaデータを追加
      formData.append("title", metaData.title);
      formData.append("description", metaData.description);
      formData.append("thumbnail_image_url", metaData.thumbnail_image_url);
      formData.append("tags", metaData.tags);
      formData.append("is_private", metaData.is_private.toString());
      formData.append("is_adult", metaData.is_adult.toString());
      formData.append("external_cutout", metaData.external_cutout.toString());
      formData.append("is_ad", metaData.is_ad.toString());
      formData.append("campaign_id", metaData.campaign_id);
      formData.append("ad_link", metaData.ad_link);

      try {
        // TODO: URLを環境変数に移動
        const response = await fetch("http://localhost:8085/ad/video", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          console.log(`Chunk ${i + 1} of ${totalChunks} uploaded successfully`);

          if (response.status === 201) {
            const responseData = await response.json();
            const { adID } = responseData;
            if (adID) {
              window.location.href = `/${params.organizationID}/${metaData.campaign_id}/${adID}`;
            }
          }
        } else {
          console.error(`Chunk ${i + 1} of ${totalChunks} failed to upload`);
          break;
        }
      } catch (error) {
        console.error("Error uploading chunk:", error);
        break;
      }
    }
  };

  return (
    <div>
      <p>画像</p>
      <input type="file" onChange={handleImageChange} />
      <p>動画</p>
      <input type="file" onChange={handleVideoChange} />
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleMetaChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleMetaChange}
      ></textarea>
      <input
        type="text"
        name="thumbnail_image_url"
        placeholder="Thumbnail URL"
        onChange={handleMetaChange}
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={handleMetaChange}
      />
      <input type="checkbox" name="is_private" onChange={handleMetaChange} />{" "}
      Private
      <input type="checkbox" name="is_adult" onChange={handleMetaChange} />{" "}
      Adult
      <input
        type="checkbox"
        name="external_cutout"
        onChange={handleMetaChange}
      />{" "}
      External Cutout
      <input type="checkbox" name="is_ad" onChange={handleMetaChange} /> Is Ad
      <input
        type="text"
        name="campaign_id"
        placeholder="Campaign ID"
        onChange={handleMetaChange}
      />
      <input
        type="text"
        name="ad_link"
        placeholder="Ad Link"
        onChange={handleMetaChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
