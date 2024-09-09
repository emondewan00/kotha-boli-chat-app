import { useState } from "react";
import isValidEmail from "../../utils/isValidEmail";
import { useGetUserQuery } from "../../features/users/usersApi";
import debounceHandler from "../../utils/debounceHandler";
import Error from "../ui/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  conversationsApi,
  useAddConversationMutation,
  useEditConversationMutation,
} from "../../features/conversations/conversationsApi";

export default function Modal({ open, control }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [runUserQuery, setRunUserQuery] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [responseError, setResponseError] = useState("");
  const dispatch = useDispatch();

  // Fetch participant data
  const {
    data: participant,
    isError,
    error,
  } = useGetUserQuery(to, {
    skip: !runUserQuery,
  });

  // Mutations
  const [addConversation] = useAddConversationMutation();
  const [editConversation] = useEditConversationMutation();

  // Debounced search function for emails
  const debouncedSearch = debounceHandler((email) => {
    if (isValidEmail(email)) {
      setRunUserQuery(true);
    }
  }, 500);

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    debouncedSearch(value);
  };

  // Function to fetch the conversation and update or create it accordingly
  const handleConversation = async () => {
    try {
      // Fetch the conversation directly on each submission
      const fetchedConversation = await dispatch(
        conversationsApi.endpoints.getConversation.initiate(
          {
            userEmail: user?.email,
            participantEmail: participant[0]?.email,
          },
          {
            forceRefetch: true,
          }
        )
      ).unwrap();
      if (fetchedConversation?.length > 0) {
        // Edit existing conversation
        await editConversation({
          id: fetchedConversation[0].id,
          sender: user.email,
          data: {
            participant: `${user?.email}-${to}`,
            users: [user, participant[0]],
            message,
            timestamp: new Date().getTime(),
          },
        }).unwrap();
      } else {
        // Add new conversation
        await addConversation({
          sender: user.email,
          data: {
            participants: `${user?.email}-${to}`,
            users: [user, participant[0]],
            message,
            timestamp: new Date().getTime(),
          },
        }).unwrap();
      }
    } catch (err) {
      setResponseError(err?.data || "An error occurred!");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (participant?.length > 0 && participant[0].email !== user?.email) {
      await handleConversation();
      // Reset  states
      setMessage("");
      setTo("");
      setRunUserQuery(false); // Reset user query state
      control(); // Close the modal
    } else {
      setResponseError("User not found or invalid participant data!");
    }
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  id="to"
                  name="to"
                  type="text"
                  required
                  onChange={handleToChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={!to || !message || responseError}
              >
                Send Message
              </button>
            </div>

            {(participant?.length === 0 || isError) && (
              <Error message={error?.data || "User not found!"} />
            )}

            {responseError && <Error message={responseError} />}
          </form>
        </div>
      </>
    )
  );
}
