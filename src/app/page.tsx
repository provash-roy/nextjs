import Map from "@/components/Map";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <Map position={[51.505, -0.09]} zoom={13} popupText="London Location" />
    </div>
  );
}
