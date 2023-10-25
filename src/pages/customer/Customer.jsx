import React from 'react';
import { MyTable } from '../../components/template/table/MyTable/MyTable';
import { MyButton } from '../../components/template/button/MyButton/MyButton';
import {Dropdown} from '../../components/index'
function Customer(props) {

    let items =[
        {
            STT: "1",
            "Mã đơn": "5DHS232",
            "Bên nhận": "Nguyễn Ngọc Thảo My",
            "Tổng phí dịch vụ": 110.5,
            "Thu hộ/ COD": 110.5,
            "Tùy chọn thanh toán": "Bên gửi trả phí",
          },
          {
            STT: "1",
            "Mã đơn": "3DHS100",
            "Bên nhận": "Nguyễn Ngọc Linh Chi",
            "Tổng phí dịch vụ": 110.5,
            "Thu hộ/ COD": 0,
            "Tùy chọn thanh toán": "Bên nhận trả phí",
          },
    ]
    let myTitle = "Customer Management";
    return (
        <div className='padding-body'>
            <Dropdown />
            <button>Add client</button>
            <MyTable list={items} title={myTitle} showCheckBox={true}/>
        </div>
    );
}

export default Customer;