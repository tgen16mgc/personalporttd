import type { GalleryItem } from "@/content/projects";
import { getSafeContentHref, getSafeExternalHref, getTrustedVideoEmbedInfo } from "@/lib/security.mjs";

export function ProjectGallery({ items, title }: { items: GalleryItem[]; color: string; title: string }) {
  return <section className="case-gallery" aria-label={`${title} gallery`}><details open={items.length <= 3}><summary>Project Gallery <span>{items.length} items</span></summary><div className="case-gallery-grid">{items.map((item, index) => {
    const image = item.image && getSafeContentHref(item.image);
    const video = item.videoFile && getSafeContentHref(item.videoFile);
    const embed = item.videoUrl && getTrustedVideoEmbedInfo(item.videoUrl);
    const fallback = getSafeExternalHref(item.videoUrl);
    return <figure key={index} className={item.size === "half" ? "gallery-half" : "gallery-full"}>
      {item.type === "image" && image ?
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={item.caption || `${title}, image ${index + 1}`} loading="lazy" /> : item.type === "videoFile" && video ?
        <video controls playsInline preload="metadata" src={video} aria-label={item.caption || `${title}, video ${index + 1}`} /> : embed ?
        <><iframe src={embed.url} data-vertical={embed.isVertical} title={item.caption || `${title}, video ${index + 1}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />{fallback && <a className="gallery-source" href={fallback} target="_blank" rel="noopener noreferrer">Watch original video</a>}</> : fallback ?
        <a href={fallback} target="_blank" rel="noopener noreferrer">Watch video</a> : <p>Media unavailable.</p>}
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>;
  })}</div></details></section>;
}
