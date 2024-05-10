"use client"
import React, { useState, useCallback, useRef } from "react";
import { useClickAway } from "react-use";
import '@/assets/css/style.css';

type Option = {
  value: string;
  label: string;
};

type IPropType = {
  options: Option[];
  defaultCurrent: number;
  placeholder?: string;
  className1?: boolean;
  cls?: string | undefined;
  onChange: (item: Option) => void;
  name: string;
};

const NiceSelect = ({
  options,
  defaultCurrent,
  placeholder,
  className1,
  cls,
  onChange,
  name,
}: IPropType) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(options[defaultCurrent]);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef(null);

  useClickAway(ref, onClose);

  const currentHandler = (item: { value: string; label: string }) => {
    setCurrent(item);
    onChange(item);
    onClose();
  };

  return (
    <div
      className={`nice-select ${cls?cls:''} ${open && "open"} ${className1?'user-select-nice':''}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      ref={ref}
    >
      <span className="current">{current?.label || placeholder}</span>
      <ul
        className="list"
        role="menubar"
        onClick={(e) => e.stopPropagation()}
      >
        {options?.map((item,i) => (
          <li
            key={i}
            data-value={item.value}
            className={`option ${item.value === current?.value && "selected focus"
              }`}
            role="menuitem"
            onClick={() => currentHandler(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelect;


