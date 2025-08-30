import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

/**
 * HeadingWithEphesis component renders a two-line heading where specified letters are styled with Ephesis font,
 * and the rest of the letters are styled with Didot font.
 *
 * Props:
 * - lines: array of two strings - The two lines of the heading text to display
 * - ephesisLetters: array of characters - Letters to style with Ephesis font (case insensitive)
 * - className: string - Additional class names for the container div
 * - headingClassName: string - Additional class names for the h1 elements
 */
const HeadingWithEphesis = ({
  lines = [],
  ephesisLetters = [],
  className,
  headingClassName,
}) => {
  // Normalize ephesisLetters to uppercase for case-insensitive comparison
  const ephesisSet = new Set(ephesisLetters.map((l) => l.toUpperCase()));

  return (
    <div className={clsx("mb-80 uppercase", className)}>
      {lines.map((line, lineIndex) => (
        <h1
          key={lineIndex}
          className={clsx("text-5xl tracking-widest", headingClassName, {
            "mt-8": lineIndex > 0,
          })}
        >
          {line.split("").map((char, index) => {
            const isEphesis = ephesisSet.has(char.toUpperCase());
            const fontClass = isEphesis ? "font-[Ephesis]" : "font-[Didot]";
            return (
              <span key={index} className={fontClass}>
                {char}
              </span>
            );
          })}
        </h1>
      ))}
    </div>
  );
};

HeadingWithEphesis.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  ephesisLetters: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  headingClassName: PropTypes.string,
};

export default HeadingWithEphesis;
