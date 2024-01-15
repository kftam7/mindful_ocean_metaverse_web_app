import React, { useRef, useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const LongContentTooltip = (prop) => {
    const { content, className } = prop;
    const [isShowTooltip, setIsShowTooltip] = useState(true);

    const parentRef = useRef(null);
    const childRef = useRef(null);
    const contentClassName = className ? className + ' long-content-tooltip' : 'long-content-tooltip';

    useEffect(() => {
        if (parentRef && childRef) {
            const parentWidth = parentRef.current?.offsetWidth;
            const childrenWidth = childRef.current?.offsetWidth;
            setIsShowTooltip(parentWidth < childrenWidth);
        }
    }, [parentRef, childRef]);
    return (
        <>
            {isShowTooltip ? (
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="textOverflowTooltip">{content}</Tooltip>}
                >
                    <div className={contentClassName} ref={parentRef}>
                        <span ref={childRef}>{content}</span>
                    </div>
                </OverlayTrigger>
            ) : (
                <div className={contentClassName} ref={parentRef}>
                    <span ref={childRef}>{content}</span>
                </div>
            )}
        </>
    );
};

export default LongContentTooltip;