import dynamic from "next/dynamic";

const ChatAppClient = dynamic(() => import("./ChatAppClient"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const ChatApp = () => {
  return (
    <div>
      <ChatAppClient />
    </div>
  );
};

export default ChatApp;
