import { MyButton } from "./MyButton/MyButton";
import { useState } from "react";
import { uploadFile } from "../../../services/ProductType";
import toast from "react-hot-toast";
import { FileArrowUp } from "phosphor-react";

export const UploadFileButton = ({ handleSubmit }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Select file");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className={"d-flex"}>
      {/*<input type="file" onChange={handleFileChange} />*/}
      <label
        htmlFor="upload-photo"
        style={{
          cursor: "pointer",
          padding: "10px 20px",
          border: "solid 1px #d3d3d3",
          borderRadius: "5px 0 0 5px",
        }}
      >
        {fileName}
      </label>
      <input
        type="file"
        name="photo"
        id="upload-photo"
        onChange={handleFileChange}
        style={{
          opacity: "0",
          position: "absolute",
          zIndex: "-1",
        }}
      />
      <MyButton
        prefix={<FileArrowUp size={18} color="#ffffff" weight="fill" />}
        callback={(e) => handleSubmit(e, file)}
        bgColor={"var(--primary-color)"}
        borderRadius={"0 5px 5px 0"}
        width={"auto"}
        padding={"10px"}
      />
    </div>
  );
};
