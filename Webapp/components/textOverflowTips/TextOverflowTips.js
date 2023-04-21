import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TextWithTooltip = ({ text, divWidth }) => {
  const textRef = React.useRef(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    if (textRef.current) {
      setShowTooltip(textRef.current.offsetWidth < textRef.current.scrollWidth);
    }
  }, [text, divWidth]);

  return (
    <div
      ref={textRef}
      style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: '100%', cursor: "default", fontWeight: 'bolder', textAlign: 'right' }}
    >
      {showTooltip ? (
        <OverlayTrigger
          placement="top-start"
          overlay={<Tooltip id="textOverflowTooltip">{text}</Tooltip>}
        >
          <span>{text}</span>
        </OverlayTrigger>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default TextWithTooltip;
