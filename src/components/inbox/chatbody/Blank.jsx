import blankImage from "../../../assets/images/blank.svg";

export default function Blank() {
  return (
    <div className="relative w-full overflow-y-hiddeen h-[calc(100vh_-_64px)] flex flex-col items-center justify-center text-gray-700 p-5 space-y-5">
      <div>
        <img src={blankImage} alt="Nothing here!" className="w-20" />
      </div>
      <div className="text-center">
        Your inbox is empty. Start a conversation!
      </div>
    </div>
  );
}
