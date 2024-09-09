import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import moment from "moment";
import getPartnerInfo from "../../utils/getPartnerInfo";
import gravatarUrl from "gravatar-url";
import { Link } from "react-router-dom";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { data, isLoading, isSuccess, isError, error } =
    useGetConversationsQuery(user?.email);
  const { conversations, totalCount } = data || {};

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
    content = conversations.map((conversation) => {
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
          <Link
            className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
            to={`/inbox/${id}`}
          >
            <ChatItem
              avatar={gravatarUrl(partnerEmail)}
              name={name}
              lastMessage={message}
              lastTime={moment(timestamp).fromNow()}
            />
          </Link>
        </li>
      );
    });
  }

  return <ul>{content}</ul>;
}
