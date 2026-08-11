'use client';
import { useState } from 'react';

type Field = { label: string; value: string };

export default function AccordionSection({ id, title, fields }: { id: string; title: string; fields: Field[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="section" id={`section-${id}`}>
      <div className="accordion-header" aria-expanded={open ? 'true' : 'false'} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className="arrow">&#9656;</span>
      </div>
      <div className={`accordion-body${open ? ' open' : ''}`} id={`body-${id}`}>
        {fields.map((f) => (
          <div className="field-row" key={f.label}>
            <label>{f.label}</label>
            <span>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
