
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="font-sans text-center text-sm text-ink-muted px-5 py-3 bg-background border-t border-line">
            <Link
                href="https://github.com/abaciarda/qr-menu-app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
            >
                QR Menu App 2026
            </Link>
        </footer>
    );
}
