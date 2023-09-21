import React, { useState } from "react";
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
      style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: '100%', cursor: "default", fontWeight: 'bolder', textAlign: 'left', position: 'relative' }}
    >
      {showTooltip ? (
        <OverlayTrigger
          placement="top-start"
          overlay={<Tooltip id="textOverflowTooltip">{text}</Tooltip>}
        >
          <span>
            {text}
            <span
              style={{ backgroundColor: '#fff', paddingRight: '6px', position: 'absolute', right: '0' }}
            >
              {'.....' + text.substring(text.length - 3, text.length)}
            </span>
          </span>
        </OverlayTrigger>
      ) : (
        <span>
          {text}
        </span>
      )}
    </div>
  );
};

export default TextWithTooltip;
