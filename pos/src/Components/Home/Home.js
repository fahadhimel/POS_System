import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Additem from "./AddItem/Additem";

import "./Home.scss";
import Menusearchbar from "./menusearchbar/Menusearchbar";
import PrintBtn from "./PrintBtn/PrintBtn";
//import TableRow from "./TableRow/TableRow";
import TableRow1 from "./TableRow/TableRow1";

const Home = () => {
  const [totalamount, setTotalamount] = useState();

  const getTableRowData = (data) => {
    setTotalamount(data);
  };

  const [lsgemt, setLsgeemt] = useState("");
  const localmtF = (ldata) => {
    setLsgeemt(ldata);
    setTimeout(() => {
      setLsgeemt("");
      setDiscount("");
      setPaymentamount("");
    }, 100);
  };

  //-------------
  const [discount, setDiscount] = useState("");
  const [discountminus, setDiscountminus] = useState("");
  const [discountplusamound, setDiscountplusamound] = useState("");
  const [chaildDataMenusearchbarget, setChaildDataMenusearchbarget] =
    useState("");

  const [paymentamount, setPaymentamount] = useState("");
  const [changeamount, setChangeamount] = useState("");

  const getchaildDataMenusearchbar = (e) => {
    setChaildDataMenusearchbarget(e);
  };

  useEffect(() => {
    handleDiscount();
    handleChange();
  }, [discount | totalamount]);

  useEffect(() => {
    handleDiscount();
    handleChange();
  }, [paymentamount | discountplusamound|discount]);

  const handleDiscount = () => {
    try {
      if (discount < 1) {
        setDiscount("");
      }
      if (discount > 0) {
        const discountAmount = (Number(totalamount) * Number(discount)) / 100;
        const discountedValue = Number(totalamount) + Number(discountAmount);
        setDiscountplusamound(discountedValue);
        setDiscountminus(discountAmount);
      } else {
        setDiscountplusamound("");
        setDiscountminus("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = () => {
    try {
      if (paymentamount !== "") {
        if (discountplusamound !== "") {
          const result = paymentamount - discountplusamound;
          setChangeamount(result);
        } else {
          const result = paymentamount - totalamount;
          setChangeamount(result);
        }
      } else {
        setChangeamount("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    try {
      changeamount && changeamount < 0
        ? (document.getElementById("changeamount").style.color = "#fa1515")
        : (document.getElementById("changeamount").style.color = "#000");
    } catch (error) {
      toast.error(error.message);
    }
  }, [changeamount]);

  //-------------*********
  const discountref = useRef(null);
  const paymentamountref = useRef(null);

  const handleKeyDown = (event) => {
    try {
      if (event.key === "T") {
        discountref.current.focus();
      } else if (event.key === "P") {
        paymentamountref.current.focus();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    try {
      // Attach the event listener to the document
      document.addEventListener("keydown", handleKeyDown);

      // Clean up the event listener when the component is unmounted
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  //-------------*********

 

  return (
    <div className="Home">
      <div className="LeftSection">
        <div className="leftSectionTop">
          <Menusearchbar passParanData={getchaildDataMenusearchbar} />
        </div>
        <div className="leftSectionMit">
          {/* <TableRow
            passFromChaildData={getTableRowData}
            passFromParandData={chaildDataMenusearchbarget}
            lsgemt={lsgemt}
          /> */}
          <TableRow1
            passFromChaildData={getTableRowData}
            passFromParandData={chaildDataMenusearchbarget}
            lsgemt={lsgemt}
          />
        </div>
        <div className="leftSectionBottom">
          <div className="leftSectionBottomLeft"></div>
          <div className="leftSectionBottomRight">
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="totalamount"> Total Amount :</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="totalamount"
                        name="totalamount"
                        placeholder="0.00"
                        value={totalamount}
                        onChange={(e) => setTotalamount(e.target.value)}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="discount">
                        Tax Amount <sup>press T</sup> :
                      </label>
                    </td>
                    <td>
                      <div className="twoinput">
                        <input
                          type="number"
                          id="discount"
                          name="discount"
                          placeholder="0.00"
                          ref={discountref}
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                        <input
                          type="number"
                          id="discountminus"
                          name="discountminus"
                          placeholder="0.00"
                          value={discountminus}
                          onChange={(e) => setDiscountminus(e.target.value)}
                          disabled
                        />
                      </div>
                      <input
                        type="number"
                        id="discountplusamound"
                        name="discountplusamound"
                        placeholder="0.00"
                        value={discountplusamound}
                        onChange={(e) => setDiscountplusamound(e.target.value)}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="paymentamount">
                        Payment Amount<sup>press P</sup> :
                      </label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="paymentamount"
                        name="paymentamount"
                        placeholder="0.00"
                        ref={paymentamountref}
                        value={paymentamount}
                        onChange={(e) => setPaymentamount(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="changeamount"> change Amount :</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="changeamount"
                        name="changeamount"
                        placeholder="0.00"
                        value={changeamount}
                        onChange={(e) => setChangeamount(e.target.value)}
                        disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>

      <div className="RightSection">
        <div className="RightSectionTop">
          <Additem />
        </div>
        <div className="RightSectionBottom">
          <PrintBtn
            discount={discount}
            discountplusamound={discountplusamound}
            paymentamount={paymentamount}
            changeamount={changeamount}
            totalamount={totalamount}
            localmtF={localmtF}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

/*
import React, { useEffect, useState, useRef } from "react";

import Additem from "./AddItem/Additem";

import "./Home.scss";
import Menusearchbar from "./menusearchbar/Menusearchbar";
import PrintBtn from "./PrintBtn/PrintBtn";
//import TableRow from "./TableRow/TableRow";
import TableRow1 from "./TableRow/TableRow1";

const Home = () => {
  const [totalamount, setTotalamount] = useState();

  const getTableRowData = (data) => {
    setTotalamount(data);
  };

  const [lsgemt, setLsgeemt] = useState("");
  const localmtF = (ldata) => {
    setLsgeemt(ldata);
    setTimeout(() => {
      setLsgeemt("");
      setDiscount("");
      setPaymentamount("");
    }, 100);
  };

  //-------------
  const [discount, setDiscount] = useState("");
  const [discountminus, setDiscountminus] = useState("");
  const [discountplusamound, setDiscountplusamound] = useState("");
  const [chaildDataMenusearchbarget, setChaildDataMenusearchbarget] =
    useState("");

  const [paymentamount, setPaymentamount] = useState("");
  const [changeamount, setChangeamount] = useState("");

  const getchaildDataMenusearchbar = (e) => {
    setChaildDataMenusearchbarget(e);
  };

  useEffect(() => {
    handleDiscount();
    handleChange();
  }, [discount | totalamount]);

  useEffect(() => {
    handleChange();
    handleDiscount();
  }, [paymentamount | discountplusamound]);

  const handleDiscount = () => {
    try {
      if (discount < 1) {
        setDiscount("");
      }
      if (discount >= 1) {
        const discountAmount = (totalamount * discount) / 100;
        const discountedValue = totalamount - discountAmount;
        setDiscountplusamound(discountedValue);
        setDiscountminus(discountAmount);
      } else {
        setDiscountplusamound("");
        setDiscountminus("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    try {
      if (paymentamount !== "") {
        if (discountplusamound !== "") {
          const result = paymentamount - discountplusamound;
          setChangeamount(result);
        } else {
          const result = paymentamount - totalamount;
          setChangeamount(result);
        }
      } else {
        setChangeamount("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      changeamount && changeamount < 0
        ? (document.getElementById("changeamount").style.color = "#fa1515")
        : (document.getElementById("changeamount").style.color = "#000");
    } catch (error) {
      console.log(error);
    }
  }, [changeamount]);

  //-------------*********
  const discountref = useRef(null);
  const paymentamountref = useRef(null);

  const handleKeyDown = (event) => {
    try {
      if (event.key === "D") {
        discountref.current.focus();
      } else if (event.key === "P") {
        paymentamountref.current.focus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      // Attach the event listener to the document
      document.addEventListener("keydown", handleKeyDown);

      // Clean up the event listener when the component is unmounted
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } catch (error) {
      console.log(error);
    }
  }, []);
  //-------------*********

  return (
    <div className="Home">
      <div className="LeftSection">
        <div className="leftSectionTop">
          <Menusearchbar passParanData={getchaildDataMenusearchbar} />
        </div>
        <div className="leftSectionMit">
          {// <TableRow
            //passFromChaildData={getTableRowData}
            //passFromParandData={chaildDataMenusearchbarget}
            //lsgemt={lsgemt}
          /> //}
          <TableRow1
            passFromChaildData={getTableRowData}
            passFromParandData={chaildDataMenusearchbarget}
            lsgemt={lsgemt}
          />
        </div>
        <div className="leftSectionBottom">
          <div className="leftSectionBottomLeft"></div>
          <div className="leftSectionBottomRight">
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="totalamount"> Total Amount :</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="totalamount"
                        name="totalamount"
                        placeholder="0.00"
                        value={totalamount}
                        onChange={(e) => setTotalamount(e.target.value)}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="discount">
                        Discount Amount <sup>press D</sup> :
                      </label>
                    </td>
                    <td>
                      <div className="twoinput">
                        <input
                          type="number"
                          id="discount"
                          name="discount"
                          placeholder="0.00"
                          ref={discountref}
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                        <input
                          type="number"
                          id="discountminus"
                          name="discountminus"
                          placeholder="0.00"
                          value={discountminus}
                          onChange={(e) => setDiscountminus(e.target.value)}
                          disabled
                        />
                      </div>
                      <input
                        type="number"
                        id="discountplusamound"
                        name="discountplusamound"
                        placeholder="0.00"
                        value={discountplusamound}
                        onChange={(e) => setDiscountplusamound(e.target.value)}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="paymentamount">
                        Payment Amount<sup>press P</sup> :
                      </label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="paymentamount"
                        name="paymentamount"
                        placeholder="0.00"
                        ref={paymentamountref}
                        value={paymentamount}
                        onChange={(e) => setPaymentamount(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="changeamount"> change Amount :</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="changeamount"
                        name="changeamount"
                        placeholder="0.00"
                        value={changeamount}
                        onChange={(e) => setChangeamount(e.target.value)}
                        disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>

      <div className="RightSection">
        <div className="RightSectionTop">
          <Additem />
        </div>
        <div className="RightSectionBottom">
          <PrintBtn
            discount={discount}
            discountplusamound={discountplusamound}
            paymentamount={paymentamount}
            changeamount={changeamount}
            totalamount={totalamount}
            localmtF={localmtF}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;


*/
