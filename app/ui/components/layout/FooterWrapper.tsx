"use client";

import { useState } from "react";
import Footer from "./Footer";
import ArchiveModal from "../ArchiveModal";

export default function FooterWrapper() {
  const [showArchives, setShowArchives] = useState(false);
  return (
    <>
      <Footer onShowArchive={() => setShowArchives(true)} />
      <ArchiveModal
        isOpen={showArchives}
        onClose={() => setShowArchives(false)}
      />
    </>
  );
}
