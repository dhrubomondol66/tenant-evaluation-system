import { useState } from "react";
import Sidebar from "../../component/adminComponent/adminSidebar.jsx";
import Topbar from "../../component/adminComponent/adminTopbar.jsx";
import Layout from "../../component/Layout.jsx";

const fields = [
  {
    id: "hero_header",
    label: "HERO HEADER",
    type: "text",
    value: "Measure Tenant Behavior — Not Just Background.",
  },
  {
    id: "hero_subheader",
    label: "HERO SUBHEADER",
    type: "text",
    value: "The #1 reason U.S. landlords lose money isn't repairs — it's tenant behavior.",
  },
  {
    id: "hero_paragraph",
    label: "HERO PARAGRAPH",
    type: "textarea",
    value:
      "Hidden evictions, cash-for-keys exits, stalled payments, and even the IRS data showing that 50.5% of rental property filers reported a net loss — all of it traces back to daily habits.\nWe measure those habits before they cost you thousands.",
  },
  {
    id: "hero_other_text",
    label: "HERO OTHER TEXT",
    type: "textarea",
    value:
      "FCRA-Aligned. Trusted by property owners & managers nationwide. Objective behavioral screening that reveals real habits before they turn into real losses.",
  },
  {
    id: "primary_cta_1",
    label: "PRIMARY CTA LABEL",
    type: "text",
    value: "See How it work",
  },
  {
    id: "primary_cta_2",
    label: "PRIMARY CTA LABEL",
    type: "text",
    value: "Start Screening Smarter",
  },
  {
    id: "founders_1",
    label: "FOUNDER'S MESSAGE",
    type: "textarea",
    value: "I built this system because I was tired of guessing who to trust.",
  },
  {
    id: "founders_2",
    label: "FOUNDER'S MESSAGE",
    type: "textarea",
    value:
      "I've been a landlord for years — and I kept seeing the same story play out.\nApplicants who say all the right things, pass every background check... and then start paying late or dodging messages.\nAfter two decades studying human behavior and managing rental portfolios, I realized something simple but powerful: Reliability always follows patterns — small, repeatable actions that never show up on paper.\nThat insight became Tenant Integrity Systems™ — a system that measures consistency, timing, communication, response, and moral integrity in real time, showing who will act fairly and responsibly once they hold the power — before those patterns turn into losses.",
  },
];

function FormatBar() {
  return (
    <div className="flex items-center gap-1 mb-1">
      <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded bg-gray-50 text-gray-600 text-xs font-bold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
        B
      </button>
      <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded bg-gray-50 text-gray-500 text-xs italic hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
        I
      </button>
      <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded bg-gray-50 text-gray-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  );
}

function FieldCard({ field }) {
  const [value, setValue] = useState(field.value);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setDirty(false);
  };

  const handleCancel = () => {
    setValue(field.value);
    setDirty(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden hover:shadow-sm transition-shadow">
      <div className="px-4 pt-3">
        <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-2">
          {field.label}
        </p>
        <FormatBar />
        {field.type === "textarea" ? (
          <textarea
            className="w-full border-none outline-none text-sm text-gray-700 leading-relaxed resize-none bg-transparent py-1"
            value={value}
            onChange={handleChange}
            rows={Math.max(2, value.split("\n").length + 1)}
          />
        ) : (
          <input
            type="text"
            className="w-full border-none outline-none text-sm text-gray-700 bg-transparent py-1 h-8"
            value={value}
            onChange={handleChange}
          />
        )}
      </div>
      <div className="flex justify-end items-center gap-2 px-4 py-2.5 border-t border-gray-100 bg-gray-50">
        <button
          onClick={handleCancel}
          className="text-sm text-gray-500 border border-gray-200 rounded-md px-3 py-1 hover:bg-white hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`text-sm font-medium text-white rounded-md px-4 py-1 transition-colors min-w-14 ${
            saving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default function EditContent({ onNavigate }) {
  return (
    <div className="">
      <Sidebar activePage="editor" onNavigate={onNavigate} />
      <Topbar />

      <Layout>
        <div className="w-full max-w-7xl mx-auto py-8 pb-16">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Edit Content</h1>
          <p className="text-sm text-gray-400 mb-7">
            Edit the 'blocks' that appear on your primary landing page.
          </p>

          {fields.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </Layout>
    </div>
  );
}