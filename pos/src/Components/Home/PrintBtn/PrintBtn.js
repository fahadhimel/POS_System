import React, { useState, useEffect, useRef } from "react";
import "./PrintBtn.scss";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PrintBtn = (props) => {
  const {
    totalamount,
    discount,
    discountplusamound,
    paymentamount,
    changeamount,
    localmtF,
  } = props;
  const buttonRef = useRef(null);

  const [ltlat, setLtlat] = useState(true);
  useEffect(() => {
    try {
      const localGetitem = JSON.parse(localStorage.getItem("items"));
      const element = document.getElementById("btndisabl");
      if (localGetitem.length >= 1 && paymentamount) {
        setLtlat(false);
        element.classList.remove("btndisable");
      } else {
        element.classList.add("btndisable");
        setLtlat(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [JSON.parse(localStorage.getItem("items")) | paymentamount]);

  const handlePrintClick = async () => {
    try {
      const localGetitem = JSON.parse(localStorage.getItem("items"));
      if (Number(changeamount) >= 0) {
        const discountString = [
          {
            disat: discount,
            displat: discountplusamound,
          },
        ];
        const selldata = {
          id: uuidv4(),
          items: JSON.stringify(localGetitem),
          tlat: Number(totalamount),
          disd: JSON.stringify(discountString || ""),
          payat: Number(paymentamount),
          cgeat: Number(changeamount),
        };
        postData(selldata);
        Updatestokprint(localGetitem);
        localmtF(5);
      } else {
        toast.warning("Change Amount is Low");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleKeyDown = (event) => {
    //event.preventDefault();
    //console.log(event.key);
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    try {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const postData = async (selldata) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3001/sell/`,
        selldata,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      toast.success(response.data.message); // Handle the response data as needed
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Updatestokprint = (localGetitem) => {
    try {
      localGetitem &&
        localGetitem.map(async (item) => {
          const url = `http://127.0.0.1:3001/stok/print/${item.id}`; // Replace with your actual API endpoint and ID
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
          };
          const updatedata = {
            quantity: item.quantity,
          };

          const response = await axios.patch(url, updatedata, { headers });
          console.log(response.data); // Handle the response data as needed
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="PrintBtn">
      <div className="PrintBtnAll">
        <button
          className="PrintBtnmybtn btn btn-primary btn1"
          type="button"
          onClick={() => handlePrintClick()}
          ref={buttonRef}
          id="btndisabl"
          disabled={ltlat}
          // style={{cursor: "not-allowed !important",pointerEvents: "all !important",opacity: "0.2"}}
        >
          <h5>Print receipt</h5>
          <span>Enter</span>
        </button>
        <button className="PrintBtnmybtn btn btn-primary btn2" type="button">
          Tab2
        </button>
        <button className="PrintBtnmybtn btn btn-primary btn3" type="button">
          Tab3
        </button>
      </div>
    </div>
  );
};

export default PrintBtn;

/*

 


*/
