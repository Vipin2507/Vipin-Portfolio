import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Trophy, Star, Medal } from "lucide-react";

import PdfCertificatePreview from "../PdfCertificatePreview";
import { useTheme } from "../../context/ThemeContext";
import { ACHIEVEMENTS, BADGES } from "../../utils/achievementsData";
import { containerVariants, itemVariants } from "../../utils/helper";

const isPdfUrl = (src) =>
  typeof src === "string" && /\.pdf(\?|$)/i.test(src);

const AchievementSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState("leetcode");
  const [useHoverDim, setUseHoverDim] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setUseHoverDim(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Two copies match translateX(-50%) seamless marquee in CSS
  const duplicatedAchievements = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

  // Pause animation only when hovering on cards, not the entire section
  useEffect(() => {
    if (hoveredCardId) {
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
    }
  }, [hoveredCardId]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Recognition":
        return Award;
      case "Competition":
        return Trophy;
      case "Certification":
        return Star;
      case "Community":
        return Medal;
      case "Speaking":
        return Star;
      case "Leadership":
        return Trophy;
      default:
        return Award;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Recognition":
        return "text-yellow-500";
      case "Competition":
        return "text-green-500";
      case "Certification":
        return "text-blue-500";
      case "Community":
        return "text-purple-500";
      case "Speaking":
        return "text-pink-500";
      case "Leadership":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className={`py-24 px-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } relative overflow-hidden transition-all duration-500`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-yellow-500" : "bg-yellow-400"
          }`}
        />
        <div
          className={`absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-orange-500" : "bg-orange-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            } mb-4`}
          >
            Recognition & Awards
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            My
            <span className="text-yellow-500 font-medium"> Achievements</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            A testament to dedication, innovation, and continuous growth in the
            world of technology.
          </motion.p>
        </motion.div>

        {/* Achievements Scrolling Container */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          <div
            className={`relative overflow-hidden rounded-2xl border shadow-inner ${
              isDarkMode
                ? "border-gray-700/90 bg-gray-950/60 shadow-black/40 ring-1 ring-white/5"
                : "border-gray-200/90 bg-gradient-to-b from-gray-50 to-gray-100/80 shadow-gray-900/5 ring-1 ring-gray-900/5"
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r sm:w-14 ${
                isDarkMode ? "from-gray-900" : "from-white"
              } to-transparent`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l sm:w-14 ${
                isDarkMode ? "from-gray-900" : "from-white"
              } to-transparent`}
              aria-hidden
            />
            <div
              ref={scrollContainerRef}
              className={`achievement-carousel-track overflow-x-auto overflow-y-hidden px-4 py-4 sm:px-6 sm:py-5 md:px-8 ${
                isDarkMode
                  ? "achievement-carousel-track--dark"
                  : "achievement-carousel-track--light"
              }`}
            >
              <div
                className={`flex w-max min-w-full gap-6 animate-scroll-horizontal ${
                  !isAnimating ? "paused" : ""
                }`}
                style={{
                  animationDuration: "200s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "linear",
                }}
              >
              {duplicatedAchievements.map((achievement, index) => {
                const IconComponent = getCategoryIcon(achievement.category);
                const isCardHovered =
                  hoveredCardId === `${achievement.id}-${index}`;

                return (
                  <motion.div
                    key={`${achievement.id}-${index}`}
                    variants={itemVariants}
                    onMouseEnter={() =>
                      setHoveredCardId(`${achievement.id}-${index}`)
                    }
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`w-80 flex-shrink-0 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-700/70"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                    } rounded-xl border p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                      useHoverDim && hoveredCardId && !isCardHovered
                        ? "blur-sm opacity-60"
                        : ""
                    }`}
                    style={{
                      filter:
                        useHoverDim && hoveredCardId && !isCardHovered
                          ? "blur(4px)"
                          : "none",
                    }}
                  >
                    {/* Achievement Image */}
                    <div className="mb-4 overflow-hidden rounded-lg">
                      {isPdfUrl(achievement.image) ? (
                        <PdfCertificatePreview
                          src={achievement.image}
                          title={achievement.title}
                          isDarkMode={isDarkMode}
                        />
                      ) : (
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          loading="lazy"
                          decoding="async"
                          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      )}
                    </div>

                    {/* Achievement Content */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-full ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${getCategoryColor(
                            achievement.category
                          )}`}
                        />
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {achievement.year}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } leading-relaxed mb-3 line-clamp-3`}
                    >
                      {achievement.description}
                    </p>

                    <span
                      className={`inline-block text-xs font-medium ${getCategoryColor(
                        achievement.category
                      )}`}
                    >
                      {achievement.category}
                    </span>
                  </motion.div>
                );
              })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Coding Platform{" "}
              <span className="text-yellow-500 font-medium">Badges</span>
            </h3>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto font-light`}
            >
              Badges earned from various competitive programming and coding
              platforms
            </p>
          </motion.div>

          {/* Platform Filter Buttons */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {Object.keys(BADGES).map((platform, index) => (
              <motion.button
                key={platform}
                variants={itemVariants}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-6 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                  selectedPlatform === platform
                    ? isDarkMode
                      ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                      : "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                    : isDarkMode
                    ? "border-gray-600 text-gray-400 hover:border-yellow-500 hover:text-yellow-500"
                    : "border-gray-300 text-gray-600 hover:border-yellow-500 hover:text-yellow-500"
                }`}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* View Profile Button */}
          <motion.div variants={containerVariants} className="text-center mb-8">
            <motion.a
              href={BADGES[selectedPlatform || "leetcode"].profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                isDarkMode
                  ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                  : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
              }`}
            >
              <span>
                View{" "}
                {selectedPlatform
                  ? selectedPlatform.charAt(0).toUpperCase() +
                    selectedPlatform.slice(1)
                  : "LeetCode"}{" "}
                Profile
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Badges Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {BADGES[selectedPlatform || "leetcode"].badges.map(
              (badge, index) => (
                <motion.div
                  key={badge.id}
                  variants={itemVariants}
                  className={`text-center group cursor-pointer ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/50 border-gray-700 group-hover:border-yellow-500 group-hover:bg-gray-700/70"
                        : "bg-gray-50 border-gray-200 group-hover:border-yellow-500 group-hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={badge.image}
                      alt={badge.name}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto mb-3 h-20 w-20 object-contain"
                    />
                    <h4 className="text-sm font-medium mb-1 line-clamp-2">
                      {badge.name}
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } line-clamp-2`}
                    >
                      {badge.description}
                    </p>
                    <span
                      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {badge.year}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementSection;
