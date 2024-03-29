import React, { Fragment } from "react";
import Slider from "react-slick";
import MasterBanner from "./MasterBanner";
import Service from "../../../../components/common/service/service4";

const Data = [
  {
    img: "home51",
    title: "plans make great gifts",
    desc: "Living Gifts Go A Long Way!",
    link: "/shop/store",
    classes: "p-center text-center",
  },
  {
    img: "home52",
    title: "plants",
    desc: "plant parents, unite",
    link: "/shop/store",
    classes: "p-center text-center",
  },
];

const HomeSlider = () => (
  <Fragment>
    <section className="p-0 service_slide">
      <Slider className="slide-1 home-slider text-white">
        {Data.map((data, i) => {
          return (
            <MasterBanner
              key={i}
              img={data.img}
              link={data.link}
              title={data.title}
              desc={data.desc}
              classes={data.classes}
            />
          );
        })}
      </Slider>
      <div className="service-home">
        <Service />
      </div>
    </section>
  </Fragment>
);

export default HomeSlider;
