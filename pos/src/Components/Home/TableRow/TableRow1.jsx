import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import useScanDetection from "use-scan-detection";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaTrash, FaSearchMinus } from "react-icons/fa";
import { json } from "react-router-dom";

const localStorageGetData = () => {
  try {
    const item = localStorage.getItem("items");
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

const TableRow1 = ({ passFromChaildData, passFromParandData, lsgemt }) => {
  const [barcode, setBarcode] = useState("");
  const [sdata, setSdata] = useState(localStorageGetData());

  const TableRowLast = useRef(null);
  const editbtn = useRef(null);

  useScanDetection({
    onComplete: setBarcode,
  });
  

  useEffect(() => {
    try {
      if (lsgemt > 1) {
        setSdata([]);
        localStorage.removeItem("items");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [lsgemt]);

  useEffect(() => {
    getUser();
  }, [barcode]);

  useEffect(() => {
    try {
      localStorage.setItem("items", JSON.stringify(sdata));
      TableRowLast.current?.scrollIntoView();
    } catch (error) {
      toast.error(error.message);
    }
  }, [sdata]);

  const filterorStor = (id, filterData) => {
    try {
      if (filterData) {
        const removeData = sdata.filter((fil) => fil.id !== id);
        setSdata(removeData);
        const justdata = {
          _id: filterData._id,
          name: filterData.name,
          id: filterData.id,
          quantity: filterData.quantity + 1,
          price: filterData.price,
          discount: filterData.discount,
        };
        setSdata((olddata) => [...olddata, justdata]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (passFromParandData !== "") {
      filterorgetUser(passFromParandData);
    }
  }, [passFromParandData]);

  const filterorgetUser = async (barcodeid) => {
    try {
      const filterData = sdata.filter((fil) => fil.id === barcodeid);
      if (filterData.length > 0) {
        const response = await axios.get(
          `http://127.0.0.1:3001/stok/${barcodeid}`
        );
        if (response.data.qty > filterData[0].quantity) {
          filterorStor(barcodeid, filterData[0]);
        } else {
          toast.error("quantity is low.");
        }
      } else {
        const response = await axios.get(
          `http://127.0.0.1:3001/stok/${barcodeid}`
        );

        if (response.data.qty >= 1) {
          if (sdata) {
            setSdata((olddata) => [...olddata, response.data]);
          } else {
            setSdata(response.data);
          }
        } else {
          toast.error("quantity is low.");
        }
      }
    } catch (error) {
      toast.error("Data Not Found !");
      //console.log(error);
    }
  };

  const getUser = async () => {
    try {
      if (barcode !== "") {
        filterorgetUser(barcode);
        setBarcode("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (stok) => {
    try {
      if (stok.quantity > 1) {
        const removeData = sdata.filter((fil) => fil.id !== stok.id);
        setSdata(removeData);
        const justdata = {
          _id: stok._id,
          name: stok.name,
          id: stok.id,
          quantity: stok.quantity - 1,
          price: stok.price,
          discount: stok.discount,
        };
        setSdata((olddata) => [...olddata, justdata]);
      } else {
        toast.error(`Quantity is low ! click trash icon`);
      }
      setTimeout(() => {
        //editbtn.current.blur();
      }, 100);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = (stok) => {
    try {
      const deleteData = sdata.filter((fil) => fil.id !== stok.id);
      Swal.fire({
        title: "Are you sure?",
        text: `Shall I delete it?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSdata(deleteData);
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleAmound = (price, quantity, discount) => {
    if (discount) {
      return (price - (discount / 100) * price) * quantity;
    } else {
      return price * quantity;
    }
  };

  useEffect(() => {
    try {
      const justAmound =
        sdata &&
        sdata.map((item) =>
          handleAmound(item.price, item.quantity, item.discount)
        );
      let val = 0;
      for (let i = 0; i < justAmound.length; i++) {
        val = Number(val) + Number(justAmound[i]);
      }
      passFromChaildData(Math.ceil(val));
    } catch (error) {
      toast.error(error.message);
    }
  }, [sdata]);

  return (
    <table className="table boder shadow table-striped">
      <thead className="thead-derk bg-info tmc">
        <tr>
          <th scope="col">no</th>
          <th scope="col">Name</th>
          <th scope="col">ID/Barcode</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Discount</th>
          <th scope="col">Amount</th>
          <th scope="col">Add & Delete</th>
        </tr>
      </thead>
      <tbody className="">
        {sdata &&
          sdata.map((stok, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{stok.name}</td>
                <td>
                  <span>
                  <div style={{fontFamily: "'Libre Barcode 39'"}}>{stok.id}</div>
                  <div style={{fontSize:".8rem",lineHeight:"0px"}}>{stok.id}</div>
                  </span>
                  </td>
                <td>{stok.quantity}</td>
                <td>{stok.price}</td>
                <td>{stok.discount}</td>
                <td>
                  {handleAmound(stok.price, stok.quantity, stok.discount)}
                </td>
                <td className="">
                  <button
                    style={{ marginRight: "10px", color: "blue" }}
                    className="btn"
                    onClick={() => handleEdit(stok)}
                    ref={editbtn}
                  >
                    <FaSearchMinus />
                  </button>
                  <button
                    style={{ marginRight: "10px", color: "red" }}
                    className="btn"
                    onClick={() => handleDelete(stok)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        <div ref={TableRowLast} />
      </tbody>
    </table>
  );
};

export default TableRow1;
