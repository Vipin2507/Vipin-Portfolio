import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist/build/pdf.mjs";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ExternalLink, FileText } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

/** One JPEG data URL per PDF src (marquee duplicates reuse the same render). */
const previewCache = new Map();

function loadPdfPreviewDataUrl(src) {
  if (!previewCache.has(src)) {
    const promise = (async () => {
      const task = pdfjs.getDocument({ url: src, withCredentials: false });
      const pdf = await task.promise;
      const page = await pdf.getPage(1);
      const base = page.getViewport({ scale: 1 });
      const maxW = 720;
      const maxH = 432;
      const scale = Math.min(
        maxW / base.width,
        maxH / base.height,
        2 * (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1)
      );
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const w = Math.ceil(viewport.width);
      const h = Math.ceil(viewport.height);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) throw new Error("no canvas context");
      await page
        .render({
          canvasContext: ctx,
          viewport,
          canvas,
        })
        .promise;
      return canvas.toDataURL("image/jpeg", 0.84);
    })();
    previewCache.set(src, promise);
  }
  return previewCache.get(src);
}

export default function PdfCertificatePreview({ src, title, isDarkMode }) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [dataUrl, setDataUrl] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { rootMargin: "120px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    (async () => {
      try {
        const url = await loadPdfPreviewDataUrl(src);
        if (!cancelled) setDataUrl(url);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [visible, src]);

  if (failed) {
    return (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 text-center transition-colors ${
          isDarkMode
            ? "border-gray-600 bg-gray-800/80 text-gray-300 hover:border-yellow-500/60 hover:bg-gray-700/80"
            : "border-gray-300 bg-gray-100 text-gray-700 hover:border-yellow-500/60 hover:bg-white"
        }`}
      >
        <FileText className="h-10 w-10 shrink-0 text-yellow-500" aria-hidden />
        <span className="text-xs font-medium uppercase tracking-wide">
          Open PDF certificate
        </span>
      </a>
    );
  }

  return (
    <a
      ref={rootRef}
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block h-48 w-full overflow-hidden rounded-lg ${
        isDarkMode ? "bg-gray-800" : "bg-gray-200"
      }`}
      title={`${title} — open PDF`}
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          className={`flex h-full w-full animate-pulse items-center justify-center ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <FileText
            className={`h-10 w-10 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}
            aria-hidden
          />
        </div>
      )}
      <span
        className={`pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
          isDarkMode
            ? "bg-black/55 text-gray-200"
            : "bg-white/90 text-gray-800 shadow-sm"
        }`}
      >
        <ExternalLink className="h-3 w-3" aria-hidden />
        PDF
      </span>
    </a>
  );
}
