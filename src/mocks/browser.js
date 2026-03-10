import { setupWorker } from "msw/browser";
import { sellerHandlers } from "./handlers/seller.handlers";
import { listingsHandlers } from "./handlers/listings.handlers";
import { billingHandlers } from "./handlers/billing.handlers";
import { messagesHandlers } from "./handlers/messages.handlers";
import { calendarHandlers } from "./handlers/calendar.handlers";
import { leadsHandlers } from "./handlers/leads.handlers";
import { profileHandlers } from "./handlers/profile.handlers";
import { privacyHandlers } from "./handlers/privacy.handlers";
import { authHandlers } from "./handlers/auth.handlers";

export const worker = setupWorker(
  ...sellerHandlers,
  ...listingsHandlers,
  ...billingHandlers,
  ...messagesHandlers,
  ...calendarHandlers,
  ...leadsHandlers,
  ...profileHandlers,
  ...privacyHandlers,
  ...authHandlers
);
