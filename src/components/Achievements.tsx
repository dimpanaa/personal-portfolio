import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import "./Achievements.css";

interface AchievementItem {
  id: string;
  type: "Certification" | "Achievement";
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image: string;
  gallery: string[];
  credentialUrl?: string;
}

interface AchievementsProps {
  items: AchievementItem[];
}

export default function Achievements({ items }: AchievementsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selected = items.find((item) => item.id === selectedId) || null;

  // Handle ESC key to close and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedId) {
        setSelectedId(null);
      }
    };

    if (selectedId) {
      document.addEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  // Reset image index when selecting a new card
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedId]);

  const handleCardClick = (item: AchievementItem) => {
    setSelectedId(item.id);
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selected.gallery.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected) {
      setCurrentImageIndex((prev) =>
        prev === selected.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Modal content with layoutId for smooth animation
  const modalContent = (
    <AnimatePresence>
      {selected && (
        <div className="achievements-modal-wrapper">
          {/* Dark Overlay */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Expanded Card - uses layoutId for smooth transition */}
          <motion.article
            layoutId={`achievement-card-${selected.id}`}
            className="expanded-card"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Close Button */}
            <motion.button
              className="close-button"
              onClick={handleClose}
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* Gallery */}
            <motion.div className="gallery" layoutId={`achievement-image-${selected.id}`}>
              <div
                className="gallery-image"
                style={{
                  backgroundImage: `url(${selected.gallery[currentImageIndex]})`,
                }}
              >
                <div className="gallery-overlay">
                  <span className="card-type">{selected.type}</span>
                  <h3 className="expanded-title">{selected.title}</h3>
                </div>
              </div>

              {/* Gallery Navigation */}
              {selected.gallery.length > 1 && (
                <>
                  <button
                    className="gallery-arrow gallery-arrow-left"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="gallery-arrow gallery-arrow-right"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  {/* Gallery Dots */}
                  <div className="gallery-dots">
                    {selected.gallery.map((_, index) => (
                      <span
                        key={index}
                        className={`gallery-dot ${index === currentImageIndex ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* Content */}
            <motion.div 
              className="expanded-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p className="expanded-subtitle">{selected.subtitle}</p>
              <p className="expanded-date">{selected.date}</p>
              {selected.description && (
                <div className="expanded-description">
                  {selected.description}
                </div>
              )}
              {selected.credentialUrl && (
                <a
                  href={selected.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="credential-link"
                >
                  View Credential →
                </a>
              )}
            </motion.div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <section className="section achievements-section" id="achievements">
        <div className="container">
          <h2 className="section-title">Achievements</h2>

          {/* Grid View */}
          <div className="achievements-grid">
            {items.map((item) => (
              <motion.article
                key={item.id}
                layoutId={`achievement-card-${item.id}`}
                className="achievement-card"
                onClick={() => handleCardClick(item)}
              >
                <motion.div
                  className="card-image"
                  layoutId={`achievement-image-${item.id}`}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="card-overlay">
                    <span className="card-type">{item.type}</span>
                    <h3 className="card-title">{item.title}</h3>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Portal modal to body for proper fixed positioning */}
      {typeof document !== "undefined" &&
        createPortal(modalContent, document.body)}
    </>
  );
}
