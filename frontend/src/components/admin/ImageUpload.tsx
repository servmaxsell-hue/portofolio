"use client";

import { useState, useRef } from "react";
import { FaUpload, FaTimes, FaImage, FaSpinner } from "react-icons/fa";

interface ImageUploadProps {
    onUploadSuccess: (url: string) => void;
    currentImage?: string;
    label?: string;
}

export default function ImageUpload({ onUploadSuccess, currentImage, label }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Local validation
        if (!file.type.startsWith("image/")) {
            setError("Veuillez sélectionner une image valide.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("L'image est trop lourde (max 5Mo).");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const token = localStorage.getItem("adminToken");
            console.log("Starting upload with token:", token ? "Token present" : "MISSING TOKEN");

            if (!token) {
                setError("Vous devez être connecté (Token manquant)");
                setUploading(false);
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/upload/image`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();

                // L'API retourne maintenant une image Base64 : data:image/...
                // On l'utilise directement sans manipulation
                console.log("Image upload success. URL:", data.url.substring(0, 30) + "...");
                onUploadSuccess(data.url);
            } else {

                const err = await response.json();
                setError(err.message || "Erreur lors de l'envoi");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setError("Erreur technique lors de l'envoi.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-3">
            {label && <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>}

            <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={`relative aspect-video rounded-xl bg-white/5 border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group ${error ? "border-red-500/50 hover:border-red-500" : "border-white/10 hover:border-purple-500/50"
                    }`}
            >
                {currentImage ? (
                    <>
                        <img
                            src={currentImage}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-sm font-medium flex items-center gap-2">
                                <FaUpload /> Changer l'image
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-6">
                        {uploading ? (
                            <FaSpinner className="text-3xl text-purple-500 animate-spin mx-auto mb-2" />
                        ) : (
                            <FaImage className="text-3xl text-gray-700 mx-auto mb-2 group-hover:text-purple-500/50 transition-colors" />
                        )}
                        <p className="text-gray-500 text-xs mt-1">
                            {uploading ? "Envoi en cours..." : "Cliquez pour uploader (PNG, JPG, WebP)"}
                        </p>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            {error && <p className="text-red-500 text-[10px] font-medium animate-pulse">{error}</p>}

            {/* Direct URL Input */}
            <div className="mt-4">
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">
                    OU URL DIRECTE
                </label>
                <input
                    type="url"
                    placeholder="https://exemple.com/image.jpg"
                    value={currentImage && !currentImage.startsWith('data:') ? currentImage : ''}
                    onChange={(e) => {
                        const url = e.target.value.trim();
                        if (url) {
                            onUploadSuccess(url);
                        }
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
                />
            </div>
        </div>
    );
}
