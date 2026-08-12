"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type PopupContextType = {
  isOpen: boolean;
  popupTitle: string;
  openPopup: (title?: string) => void;
  closePopup: () => void;
};

const PopupContext = createContext<PopupContextType | null>(null);

export function PopupProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [popupTitle, setPopupTitle] =
    useState("Express Your Interest");

  const openPopup = (
    title = "Express Your Interest"
  ) => {
    setPopupTitle(title);
    setIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsOpen(false);

    document.body.style.overflow = "auto";
  };

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        popupTitle,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error(
      "usePopup must be used inside PopupProvider"
    );
  }

  return context;
}