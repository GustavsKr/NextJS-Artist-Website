'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Props = {
  value: string;
  setValue: (v: string) => void;
  table: string;
  field: string;
  rowId?: string; // optional, if editing existing row
};

export default function TextInputDB({ value, setValue, table, field, rowId }: Props) {
  const [saved, setSaved] = useState(false);

  const save = async () => {
    if (!rowId) return alert('No rowId provided for saving!');
    const { error } = await supabase.from(table).update({ [field]: value }).eq('id', rowId);
    if (error) return alert(error.message);
    setSaved(true);
  };

  return (
    <div className="mb-3">
      <textarea
        value={value}
        onChange={e => { setValue(e.target.value); setSaved(false); }}
        className="border p-3 w-full rounded bg-[#222] text-[#eaeaea]"
      />
      <button
        onClick={save}
        disabled={saved}
        className={`px-4 py-2 mt-2 rounded hover:cursor-pointer ${saved ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#eaeaea] text-[#111]'}`}
      >
        Save
      </button>
    </div>
  );
}
