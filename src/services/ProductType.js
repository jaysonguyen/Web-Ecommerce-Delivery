import axios from "../config/axios";

export async function getProductTypeList(){
    try {
        let data = await axios.get("/api/productType");
        return data;
    } catch (error) {
        return error;
    }
}
export async function getProductTypeById(id){
    try {
        let data = await axios.get(`/api/productType/${id}`);
        return data;
    } catch (error) {
        return error;
    }
}
export async  function createProductType(data){
    try {
        const checkData = await axios.post("/api/productType",data);
        return checkData.status;
    } catch (error) {
       return error; 
    }
}