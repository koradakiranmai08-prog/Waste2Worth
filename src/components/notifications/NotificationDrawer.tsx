import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  X, 
  Check, 
  CheckCheck, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications, setActiveTab } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />;
      case 'warning':
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <Info className="w-4 h-4 text-[#06B6D4]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0B1220]/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#162437] border-l border-[#29394D] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Platform Notifications"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#29394D] flex items-center justify-between bg-[#101C2C]">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#22C55E]" />
            <h2 className="text-sm font-bold text-[#F8FAFC] font-heading">
              Platform Notifications & Alerts
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAllNotifications}
              className="text-[11px] text-[#A7B4C5] hover:text-[#22C55E] flex items-center gap-1 cursor-pointer"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#A7B4C5] hover:text-[#F8FAFC] rounded-lg hover:bg-[#162437]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A7B4C5]">
              No active notifications
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationAsRead(n.id);
                  if (n.link) {
                    if (n.link === 'lifecycle') setActiveTab('lifecycle');
                    if (n.link === 'recommendations') setActiveTab('recommendations');
                    if (n.link === 'water-risk') setActiveTab('water-risk');
                    if (n.link === 'exchange') setActiveTab('exchange');
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer space-y-1.5 ${
                  n.read
                    ? 'bg-[#101C2C]/50 border-[#29394D]/60 opacity-80'
                    : 'bg-[#101C2C] border-[#06B6D4]/40 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-[#F8FAFC]">
                    {getIcon(n.type)}
                    <span>{n.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A7B4C5] shrink-0">
                    {n.timestamp}
                  </span>
                </div>

                <p className="text-[11px] text-[#A7B4C5] leading-relaxed pl-6">
                  {n.message}
                </p>

                {n.link && (
                  <div className="pl-6 pt-1 flex items-center gap-1 text-[11px] text-[#06B6D4] font-medium">
                    <span>Inspect event details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#29394D] bg-[#101C2C] text-xs text-[#A7B4C5] flex items-center justify-between">
          <span>Real-time webhook events active</span>
          <span className="text-[#22C55E] flex items-center gap-1 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            DISPATCH LISTENER
          </span>
        </div>
      </div>
    </div>
  );
};
