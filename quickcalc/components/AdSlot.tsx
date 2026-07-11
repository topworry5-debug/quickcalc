"use client";

import React from "react";

interface AdSlotProps {
  slot: string;
}

export default function AdSlot({ slot }: AdSlotProps) {
  // Google AdSense policy requires no fake/placeholder ad content or misleading boxes before real ads are approved.
  // Rendered as an empty, invisible placeholder with no dimensions forced, no "Ad" text, and no borders.
  return (
    <div id={slot}>
      {/* 
        PASTE YOUR GOOGLE ADSENSE CODE HERE ONCE APPROVED:
        
        Example:
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      */}
    </div>
  );
}
