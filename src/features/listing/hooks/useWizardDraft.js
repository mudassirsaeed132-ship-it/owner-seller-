
import { useListingDraftStore } from "../model/listingDraftStore";

export function useWizardDraft() {
  const draft = useListingDraftStore((s) => s.draft);
  const setField = useListingDraftStore((s) => s.setField);
  const addPhoto = useListingDraftStore((s) => s.addPhoto);
  const removePhoto = useListingDraftStore((s) => s.removePhoto);
  const reset = useListingDraftStore((s) => s.reset);

  return { draft, setField, addPhoto, removePhoto, reset };
}