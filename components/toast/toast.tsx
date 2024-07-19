import { Toaster, ToastBar, DefaultToastOptions } from "react-hot-toast";
import { CiCircleCheck } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

import { cn } from "@/utils/functions";

export const toastOptions: DefaultToastOptions = {
  duration: 3000,
  success: {
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
    icon: (
      <CiCircleCheck
        className="h-6 w-6 text-Primary shrink-0"
        aria-hidden="true"
      />
    ),
    className: "border-l-8 border-Primary shrink-0",
  },
  error: {
    icon: (
      <IoMdClose
        className="h-6 w-6 text-Destructive shrink-0"
        aria-hidden="true"
      />
    ),
    className: "border-l-8 border-Destructive",
  },
};

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      containerStyle={{ top: "40px" }}
      toastOptions={toastOptions}
    >
      {(t: any) => (
        <ToastBar
          toast={t}
          style={{
            padding: "16px 24px 16px 16px",
          }}
        >
          {({ icon, message }: any) => (
            <div
              data-testid="toast-alert"
              className="flex items-center justify-start"
            >
              <div className="shrink-0 w-6 h-6">{icon}</div>
              <div className="ml-2 flex-1">
                <p
                  className={cn(
                    "text-sm text-gray-600",
                    t.description ? "font-gilroy-bold" : "font-normal"
                  )}
                  data-testid="toast-alert-title"
                  role="alert"
                  aria-label={`toast-alert-title-${t.type}`}
                >
                  {message.props.children}
                </p>
                {t.description && (
                  <p
                    className={cn(
                      "text-gray-600",
                      message.props.children ? "text-xs" : "text-sm"
                    )}
                    data-testid="toast-alert-title"
                    role="alert"
                    aria-label={`toast-alert-title-${t.type}`}
                  >
                    {t.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
