"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import MenuOverlay from "@/components/MenuOverlay";
import BookingModal from "@/components/BookingModal";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <CustomCursor />
      <Navbar menuOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBookingOpen={() => setBookingOpen(true)}
      />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      <SmoothScroll paused={loading || menuOpen || bookingOpen}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer onBookingOpen={() => setBookingOpen(true)} />
        </div>
      </SmoothScroll>
    </>
  );
}
