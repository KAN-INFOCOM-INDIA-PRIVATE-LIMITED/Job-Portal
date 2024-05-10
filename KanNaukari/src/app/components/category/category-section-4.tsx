import React from "react";
import Image from "next/image";
import Link from "next/link";
import category_dropdown from "@/data/category-dropdown";

const CategorySectionFour = ({style_2=false}: { style_2?: boolean }) => {
  const category_items = category_dropdown.flatMap(
    (category) => category.category_items
  );
  return (
    <>
      <section className={`category-section-one position-relative ${style_2 ? 'mt-20 lg-mt-80' : ''}`}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-12 align-items-center">
              <div className="title-three align-text-center">
                <h2 style={{marginTop:'4%'}} className={` wow fadeInUp fw-600 ${style_2 ? 'text-dark' : 'color-blue'}`} data-wow-delay="0.3s">{style_2 ? 'Most Demanding Categories.' : 'Explore the marketplace.'}</h2>
              </div>
            </div>
            {/* <div className="col-lg-4">
              <div className="d-flex justify-content-lg-end">
                <Link href="/job-grid-v2"
                  className="btn-six d-none d-lg-inline-block"
                >
                  Explore all fields
                </Link>
              </div>
            </div> */}
          </div>
          <div className="card-wrapper row justify-content-center mt-45 lg-mt-30 pt-20 " >
            {category_items.map((item, i) => (
              <div
                key={i}
                className="card-style-one text-center mt-20 wow fadeInUp "
              >
                <div
                  className={`wrapper mt-20`}
                  data-wow-delay={`0.${i + 2}s`}
                >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <Image src={item.icon} alt="icon" className="lazy-img" />
                  </div>
                  <div className="title fw-500">{item.title}</div>
                  <div className="total-job">{item.count} Jobs</div>
                </div>
              </div>
            ))}
          </div>
     
        </div>
      </section>
    </>
  );
};

export default CategorySectionFour;
