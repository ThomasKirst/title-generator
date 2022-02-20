import { PropsWithChildren } from 'react';

interface Props {
  label: string;
}

export default function SettingsSection({
  children,
  label,
}: PropsWithChildren<Props>) {
  return (
    <section className="mb-6">
      <label className="block font-semibold text-1xl">{label}</label>
      {children}
    </section>
  );
}
