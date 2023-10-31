import React, { useEffect, useState } from 'react';
import {MyTable} from "../../../components/template/table/MyTable/MyTable";
import {getBranchList} from "../../../services/BranchService";
import "../../../assets/css/Pages/branch.css"
import AddBranch from '../../../components/project/branch/AddBranch';
function Branch(props) {
    const [branchList, setBranchList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getBranchData = async () => {
        if(isLoading) {
            return -1;
        }
        setIsLoading(true);
        try {
            const data  = await getBranchList();
            if(data != null){
                console.log(data);
                setBranchList(data);
            }
            return data;
        } catch (error) {
          return null;   
        } finally {
            setIsLoading(false);
        }
    };
    const handleInsertBranch = async () => {
        try {
            const insertInfo = {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getBranchData();
        handleInsertBranch();
    },[]);

    return (
        <div className='padding-body'>
           
                <button className="btnBranch btnAdd" >Add branch</button>
                <AddBranch/>
            <MyTable showCheckBox = {true} title={"Branch List"} list={branchList} />
        </div>
    );
}

export default Branch;