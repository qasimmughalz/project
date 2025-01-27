import { useEffect, useState } from "react";
import { Cards } from "../Card/Cards";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../redux/actions";
import { setDataToApi } from "../redux/actions";
import { MyActions } from "../redux/reducer";
import { store } from "../redux/store";
import { Cart } from "../Cart/Cart";
import { RealTime } from "../FIlters/Realtime";
import { ManualFilter } from "../FIlters/Manual";
import { CheckBox } from "../FIlters/CheckBox";
import { DataPagination } from "../Pagination/DataPagination";
import { ChooseCompare } from "../Compare/ChooseCompare";
import { Link, useNavigate } from "react-router-dom";
import css from "./Home.css";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

import "pure-react-carousel/dist/react-carousel.es.css";

export const Home = () => {
  const [display, setDisplay] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.MyActions);
  const [loading, setLoading] = useState(true);
  const [mainSearch, setMainSearch] = useState("");

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios
        .get("https://fakestoreapi.com/products/")
        .then((res) => {
          setData(res.data);
          setDisplay(res.data);
          dispatch(setDataToApi(res.data));
        })
        .catch((e) => console.log(e));
    };
    fetchdata();
  }, []);

  useEffect(() => {
    console.log("DISPLAY VALUE BEFORE ", display);
    if (display.length > 0) {
      console.log("loading data appi se ", loading);
      setLoading(!loading);
    }
  }, [display]);

  useEffect(() => {
    if (search == "") {
      setDisplay(data);
    } else {
      const filtered = data.filter((val) => {
        return val.title.toLowerCase().includes(search.toLowerCase());
      });
      setDisplay(filtered);
    }
  }, [search]);

  function handleGetFromChild(val) {
    setSearch(val);
  }

  function filteredData(val) {
    if (val.length > 0) {
      setDisplay(val);
    } else {
      setDisplay(data);
    }
  }

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (mainSearch == "") {
      setEmpty(true);
    } else {
      setEmpty(false);
      navigate(`/search/${mainSearch}`);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container-fluid hero-section ">
        <div className="gradient-bottom"></div>
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-md-6  rounded">
              <div className="card border-0 p-5">
                <h1 className="display-4 fw-bold ">Get Your Dream Car</h1>
                {empty ? (
                  <p className="text-danger">Please type something ...</p>
                ) : (
                  <p>You choose your car. We inspect it and deliver it </p>
                )}
                <form onSubmit={handleSearchSubmit}>
                  <input
                    placeholder="search your car here....."
                    className="form-control grey-inputs"
                    onChange={(e) => setMainSearch(e.target.value)}
                  ></input>
                  <div className="text-right" style={{ textAlign: "right" }}>
                    <button
                      className="btn hero-btn mt-4"
                      value="submit"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative">
        <div className="container hero-three-steps">
          <div className="row justify-content-center">
            <div className="col-md-3 ">
              <div className="card p-4">
                <h4>Money Back Guantee</h4>
                <p className=" mb-1">
                  And if you simply don’t like the car, you can return it to us
                  within 14 days of receiving it.
                </p>
              </div>
            </div>
            <div className="col-md-3 ">
              <div className="card p-4">
                <h4>Safe purchase</h4>
                <p className=" mb-1">
                  We carefully inspect each car and guarantee it is in good
                  condition before the purchase.
                </p>
              </div>
            </div>
            <div className="col-md-3 ">
              <div className="card p-4">
                <h4>6-month warranty</h4>
                <p className=" mb-1">
                  In addition, with every car you receive an extended warranty
                  for any issue claim to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-90"></div>
        <div className="container">
          <div className="row">
            {/* <div className="col-md-2 shadow-lg border ">

            <h3 className="mt-3">Filters</h3>
            <ManualFilter></ManualFilter><hr />
          
           
            <CheckBox setFilteredData={filteredData} ></CheckBox>

          </div> */}

            <div className="col-md-9 m-auto">
              <div className="my-5">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Category
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Car
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact"
                      type="button"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      Make
                    </button>
                  </li>
                </ul>
                <div className="tab-content my-3" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row my-3">
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card text-center category-cards">
                          <div className="card-body rounded p-0 m-0">
                            <img
                              src="https://wsa2.pakwheels.com/assets/browse-more/car-ctg-1300cc-cars-98fe0baa7b3171f120ab5c0fa8a8cdc1.svg"
                              className="img-fluid"
                              alt=""
                            />
                            <p className="mt-2">1300cc Cars</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    School
                  </div>
                  <div
                    className="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    Garden
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 bg-white">
        <div className="row justify-content-center p-5 ">
          <div className="col-md-4 m-auto text-left">
            <h2>A thorough car inspection - CarAudit™️</h2>
            <p className="my-3">
              A qualified mechanic will thoroughly inspect your chosen car. You
              will receive a detailed report about the technical condition of
              the car, photo documentation, and our advice. You just take your
              time and decide.
            </p>
            <button className="btn hero-btn">More About Inspection</button>
          </div>
          <div className="col-md-6  ">
            <img
              src="http://americanchampioninc.com/image/133040908.png"
              className="img-fluid"
            ></img>
          </div>
        </div>
      </div>

      {/* <div className="container my-5">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={3}
        >
          <Slider>
            <Slide index={0}>
              <img
                src="http://americanchampioninc.com/image/133040908.png"
                className="img-fluid"
              ></img>
            </Slide>
            <Slide index={1}>I am the second Slide.</Slide>
            <Slide index={2}>I am the third Slide.</Slide>
          </Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      </div> */}

      {/* <div className="container p-md-5 p-3">
              <DataPagination DataLength={display.length} loading={loading} data={display} />
            </div> */}

      <Footer></Footer>
    </div>
  );
};
