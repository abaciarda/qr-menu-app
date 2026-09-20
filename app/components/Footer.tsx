
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="font-sans text-center text-sm text-ui-ink-muted px-5 py-3 bg-ui-background border-t border-ui-line">
            <Link
                href="https://github.com/abaciarda/qr-menu-app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ui-ink"
            >
                QR Menu App 2026
            </Link>
        </footer>
    );
}
