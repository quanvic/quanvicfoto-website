"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import MenuOverlay from "@/components/MenuOverlay";
import BookingModal from "@/components/BookingModal";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import EditorialFrame from "@/components/EditorialFrame";
import FilmGrain from "@/components/FilmGrain";
import ZaloButton from "@/components/ZaloButton";
import ChatWidget from "@/components/ChatWidget";
import ImageProtection from "@/components/ImageProtection";
import InAppBrowserRedirect from "@/components/InAppBrowserRedirect";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <InAppBrowserRedirect />
      <FilmGrain />
      <EditorialFrame />
      <CustomCursor />
      <ImageProtection />
      <Navbar menuOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBookingOpen={() => setBookingOpen(true)}
      />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <ZaloButton />
      <ChatWidget open={chatOpen} onToggle={() => setChatOpen((v) => !v)} />

      <SmoothScroll paused={loading || menuOpen || bookingOpen}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer onBookingOpen={() => setBookingOpen(true)} />
        </div>
      </SmoothScroll>
    </>
  );
}
