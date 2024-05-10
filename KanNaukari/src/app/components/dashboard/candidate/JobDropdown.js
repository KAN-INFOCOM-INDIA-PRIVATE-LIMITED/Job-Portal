import React from 'react';

const JobDropdown = () => {
  return (
    <div className="job-action">
      <button
        className="action-btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span></span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            View Job
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Archive
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
};

export default JobDropdown;
