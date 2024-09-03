import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import moment from "moment";
import getPartnerInfo from "../../utils/getPartnerInfo";
import gravatarUrl from "gravatar-url";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { data, isLoading, isSuccess, isError, error } =
    useGetConversationsQuery(user?.email);
  let content = null;

  if (isLoading) {
    content = (
      <li className="m-2 text-sm">
        <span className="inline-block text-gray-600 text-xs px-3 py-1 rounded-full bg-gray-100">
          Loading...
        </span>
      </li>
    );
  }

  if (isError) {
    content = (
      <li>
        <span className="inline-block text-gray-600 text-xs px-3 py-1 rounded-full bg-red-100">
          Error: {error.message}
        </span>
      </li>
    );
  }

  if (isSuccess) {
    content = data.map((conversation) => {
      const { id, timestamp, message, users } = conversation;

      const { name, email: partnerEmail } = getPartnerInfo(
        user?.email,
        users
      ) || {
        name: "",
        email: "",
      };

      return (
        <li key={id}>
          <ChatItem
            avatar={gravatarUrl(partnerEmail)}
            name={name}
            lastMessage={message}
            lastTime={moment(timestamp).fromNow()}
          />
        </li>
      );
    });
  }

  return <ul>{content}</ul>;
}
