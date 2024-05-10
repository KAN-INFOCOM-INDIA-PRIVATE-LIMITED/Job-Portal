import Link from "next/link";
import React from "react";

// category item
function categoryItem({
  isActive,
  title,
  categories,
}: {
  isActive?: boolean;
  title: string;
  categories: string[];
}) {
  return (
    <div className="col-lg-3 col-sm-6 mt-30">
      <div
        className="title fw-500"
        style={{ color: isActive ? "#00FFFF" : "" }}
      >
        {title}
      </div>
      <ul className="list-item style-none">
        {categories.map((lt, i) => (
          <li key={i}>
            <Link href="/job-list-v2">{lt}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const categorySectionFive = () => {
  return (
    <section className="category-section-four mt-140 lg-mt-60 mb-150 lg-mb-70">
      <div className="container">
        <div className="row">
          {/* <categoryItem
            isActive={true}
            title="Trending skills"
            categories={[
              "Blockchain",
              "Node.js",
              "HR consulting",
              "Vue.js",
              "Microsoft Power BI",
              "React.js",
              "Videographers",
            ]}
          />
          <categoryItem
            title="Top skills"
            categories={[
              "Full Consultation",
              "Code Review",
              "Staff Augmentation",
              "Support",
              "Video Editors",
              "Data Entry Specialists",
              "Data Analyst",
            ]}
          />
          <categoryItem
            title="Top in USA"
            categories={[
              "Technical Support",
              "Accountants",
              "Web Designers in US",
              "Customer identity",
              "Data entry",
            ]}
          />
          <categoryItem
            title="Project Catalog"
            categories={[
              "Microsites",
              "Marketing Automation",
              "SEO & SMM",
              "Lead Generation",
              "Article Writing Services",
              "SEO Services",
              "Translation Services",
            ]}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default categorySectionFive;
