"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo1.png"
            alt="365Happy"
            width={140}
            height={40}
            className="h-10 w-auto dark:invert"
          />
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm text-muted-foreground">
              © 2021-2025 Canadian Pharmacy Ltd. All rights reserved.
            </p>
            <Link
              href="/policy"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              View our policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
