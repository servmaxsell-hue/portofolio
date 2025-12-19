"use client";

import { useState } from "react";
import { FaTwitter, FaLinkedin, FaCopy, FaCheck } from "react-icons/fa";

interface ShareButtonsProps {
    title: string;
    url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    const shareTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank", "noopener,noreferrer");
    };

    const shareLinkedin = () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={shareTwitter}
                title="Partager sur Twitter"
                className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity active:scale-90"
            >
                <FaTwitter size={18} />
            </button>
            <button
                onClick={shareLinkedin}
                title="Partager sur LinkedIn"
                className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:opacity-80 transition-opacity active:scale-90"
            >
                <FaLinkedin size={18} />
            </button>
            <button
                onClick={handleCopy}
                title="Copier le lien"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${copied ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
            >
                {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
            </button>
        </div>
    );
}
