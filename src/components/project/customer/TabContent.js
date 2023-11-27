import { Dropdown, Input } from "../../index";
import { useEffect, useState } from "react";
import {
  getStoreByUser,
  getUserById,
  updateUSer,
} from "../../../services/UserService";
import { getBankList } from "../../../services/BankService";
import toast from "react-hot-toast";

export const TabContent = ({ tab = "1", data = {} }) => {
  return (
    <>
      {tab === "1" && (
        <div className="row">
          <div className="col">
            <Input
              value={data.fullName ?? ""}
              setDisabled={true}
              label="Name"
            />
            <Input value={data.phone ?? ""} label="Phone" setDisabled={true} />
            <Input
              value={data.des ?? ""}
              setDisabled={true}
              label="Description"
            />
          </div>
          <div className="col">
            <Input value={data.email ?? ""} setDisabled={true} label="Email" />
            <Input
              label="Account"
              value={data.account ?? ""}
              setDisabled={true}
            />
          </div>
        </div>
      )}
      {tab === "2" && (
        <div className="row">
          <div className="col">2</div>
          <div className="col">2</div>
        </div>
      )}
      {tab === "3" && (
        <div className="row">
          <div className="col">3</div>
          <div className="col">3</div>
        </div>
      )}
      {tab === "4" && (
        <div>
          <button className="btnAdd btnAccount">Add new store</button>
          {data.length > 0 ? (
            data.map((info, i) => (
              <div className="row store_frame" key={i}>
                <div className="col">
                  <Input placeholder={info.name} label="Name" />
                  <Input placeholder={info.des} label="Descript" />
                  <Input placeholder={info.address} label="Address" />
                </div>
                <div className="col">
                  <Input placeholder={info.phone} label="Phone" />
                  <Input placeholder={info.created} label="Created" />
                  <Input placeholder={info.updated} label="Updated" />
                  <button className="btnAdd btnAccount">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
