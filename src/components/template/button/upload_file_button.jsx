import { MyButton } from "./MyButton/MyButton";
import { useState } from "react";
import { uploadFile } from "../../../services/ProductType";
import toast from "react-hot-toast";

export const UploadFileButton = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFile(formData);

      // Handle the response as needed
      if (res.status === 200) {
        toast.success("Upload file successfully");
      } else {
        toast.error("Upload file failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <MyButton
        text={"Upload file"}
        callback={handleFormSubmit}
        width={"auto"}
      />
    </>
  );
};
