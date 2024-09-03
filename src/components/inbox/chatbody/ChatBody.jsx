import Blank from "./Blank";
import { useParams } from "react-router-dom";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";

export default function ChatBody() {
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetMessagesQuery(id);

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (isError) {
    content = <div>Error: {error?.data || "An error occurred"}</div>;
  }

  if (isSuccess && data.length > 0) {
    content = <Messages messages={data} />;
  } else {
    content = <Blank />;
  }

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        <ChatHead
          avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          name="Akash Ahmed"
        />
        {content}
        <Options />
      </div>
    </div>
  );
}
