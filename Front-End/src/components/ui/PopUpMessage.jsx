export default function PopUpMessage({ text, show }) {
  if (!show) return null;

  return (
    <div className="fixed top-[40px] left-1/2 transform -translate-x-1/2 bg-[#976c60] dark:bg-sky-950 dark:text-black text-center text-white px-6 py-3 text-lg rounded shadow-lg z-[9999] w-max">
      {text}
    </div>
  );
}
