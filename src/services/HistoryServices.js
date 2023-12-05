import axios from "../config/axios";

export const handleInsertHistoryDelivery = async (formData) => {
  const data = new FormData();
  for (const key in formData) {
    data.append(key, formData[key]);
  }

  try {
    const checkInsert = await axios.post(
      "http://localhost:8080/api/history/delivery",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return checkInsert;
  } catch (error) {
    console.error("Error creating delivery history:", error);
  }
};
