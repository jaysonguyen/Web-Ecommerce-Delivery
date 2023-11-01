import React from 'react';
import { createProductType } from '../../../services/ProductType';
import toast from 'react-hot-toast';
import Input from '../../template/Input/Input';

function AddProductType({clearInput,name,des,setName,setDes}) {
    
    const handlePTNameOnChange = (e) =>{
        setName(e.target.value);
    };
    const handlePTDesOnChange = (e) =>{
        setDes(e.target.value);
    };

    const handleInsertPT = async () => {
        try {
            const inserInfo = {
                name:name,
                des: des,
            };
            const checkCreate = await createProductType(inserInfo);
            if(checkCreate !=200){
                toast.error("insert failed")
            }else{
                toast.success("Insert success");
                clearInput();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="add_productType_container">
      <div className="row">
        
        <div className="col col-6">
          <Input onChange={handlePTNameOnChange} label={"Branch name"} />
        </div>
        <div className="col col-6">
          <Input onChange={handlePTDesOnChange} label={"Description"}/>
        </div>
      </div>
      <button onClick={handleInsertPT} className="btnAdd">
        Add
      </button>
    </div>
    );
}

export default AddProductType;