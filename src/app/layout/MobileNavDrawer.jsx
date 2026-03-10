import ModalBase from "../../shared/ui/ModalBase";
import Sidebar from "./Sidebar";

export default function MobileNavDrawer({ open, onClose }) {
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      className="w-full max-w-[320px] overflow-hidden p-0 sm:max-w-[340px]"
      title={null}
    >
      <div className="h-[88vh] min-h-0">
        <Sidebar mobile onNavigate={onClose} />
      </div>
    </ModalBase>
  );
}