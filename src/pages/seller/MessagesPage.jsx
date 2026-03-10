import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Card from "../../shared/ui/Card";
import ConversationList from "../../widgets/messaging/ConversationList";
import ChatHeader from "../../widgets/messaging/ChatHeader";
import ChatThread from "../../widgets/messaging/ChatThread";
import ChatComposer from "../../widgets/messaging/ChatComposer";

import { queryKeys } from "../../services/api/queryKeys";
import { messagesApi } from "../../features/messaging/api/messagesApi";
import useMediaQuery from "../../shared/hooks/useMediaQuery";

export default function MessagesPage() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const qc = useQueryClient();

  const [tab, setTab] = useState("buying"); // buying | renting
  const [activeId, setActiveId] = useState(null);
  const [mobileView, setMobileView] = useState("list"); // list | chat

  const listQ = useQuery({
    queryKey: queryKeys.messages.list(tab),
    queryFn: () => messagesApi.list({ tab }),
    staleTime: 30_000,
  });

  const items = useMemo(() => listQ.data?.items || [], [listQ.data]);

  useEffect(() => {
    if (!activeId && items.length) setActiveId(items[0].id);
  }, [items, activeId]);

  useEffect(() => {
    // when switching tabs, select first item
    if (items.length) setActiveId(items[0].id);
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const threadQ = useQuery({
    queryKey: queryKeys.messages.thread(activeId),
    queryFn: () => messagesApi.thread({ id: activeId }),
    enabled: Boolean(activeId),
    staleTime: 10_000,
  });

  const sendM = useMutation({
    mutationFn: ({ id, text }) => messagesApi.send({ id, text }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.messages.thread(activeId) });
      qc.invalidateQueries({ queryKey: queryKeys.messages.list(tab) });
    },
  });

  const onSelect = (id) => {
    setActiveId(id);
    if (isMobile) setMobileView("chat");
  };

  const onCloseChat = () => {
    if (isMobile) setMobileView("list");
  };

  const activeHeaderName = threadQ.data?.headerName || "";
  const activeHeaderAvatar = threadQ.data?.headerAvatar || "https://i.pravatar.cc/60?img=3";
  const activeTitle = threadQ.data?.threadTitle || "";
  const activeMsgs = threadQ.data?.messages || [];

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="text-4xl font-semibold text-[#D06050]">Inbox</h1>

        <Card className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <div className="grid min-h-[640px] grid-cols-1 lg:grid-cols-[420px_1fr]">
            {/* LEFT */}
            <div className={`${isMobile && mobileView === "chat" ? "hidden" : "block"} border-r border-slate-200`}>
              <ConversationList tab={tab} onTabChange={setTab} items={items} activeId={activeId} onSelect={onSelect} />
            </div>

            {/* RIGHT */}
            <div className={`${isMobile && mobileView === "list" ? "hidden" : "flex"} flex-col`}>
              <ChatHeader name={activeHeaderName} avatar={activeHeaderAvatar} onClose={onCloseChat} showBack={Boolean(isMobile)} />

              <div className="flex-1">
                <ChatThread title={activeTitle} messages={activeMsgs} />
              </div>

              <ChatComposer
                isSending={sendM.isPending}
                onSend={(text) => {
                  if (!activeId) return;
                  sendM.mutate({ id: activeId, text });
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
