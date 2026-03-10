import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";

function GoogleG() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 33.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.3 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.4 35 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.2l-6.6 5.1C9.4 39.7 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3 5.1-5.6 6.6l.1.1 6.3 5.2C39.7 36.7 44 31.5 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

export default function TransactionsList({ items = [] }) {
  return (
    <section className="mt-8">
      <div className="mb-3 text-sm font-semibold text-slate-900">Recent Transactions</div>

      <Card className="rounded-2xl p-4">
        <div className="divide-y divide-slate-100">
          {items.map((t) => (
            <div key={t.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              {/* left */}
              <div className="flex min-w-0 items-center gap-4">
                <img src={t.image} alt="" className="h-[46px] w-[62px] rounded-xl object-cover" loading="lazy" />

                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-[#D06050]">{t.title}</div>

                  {/* ✅ small profile avatar + name */}
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                    <img
                      src={t.userAvatar || "https://i.pravatar.cc/40?img=12"}
                      alt=""
                      className="h-4 w-4 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="truncate">{t.user}</span>
                  </div>

                  {/* ✅ date + google icon */}
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{t.meta}</span>
                    <GoogleG />
                  </div>
                </div>
              </div>

              {/* right (amount TOP, badge BELOW) */}
              <div className="flex shrink-0 flex-col items-end gap-2 sm:min-w-[140px]">
                <div className="text-sm font-semibold text-slate-900">{t.amount}</div>
                <Badge variant={t.status === "Paid" ? "brand" : "outline"} className="px-4 py-2 text-[11px]">
                  {t.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}