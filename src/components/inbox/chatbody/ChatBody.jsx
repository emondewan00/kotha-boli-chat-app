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
    content = (
      <>
        <ChatHead message={data[0]} />
        <Messages messages={data} />
        <Options messages={data[0]} />
      </>
    );
  } else {
    content = <Blank />;
  }
  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">{content}</div>
    </div>
  );
}
