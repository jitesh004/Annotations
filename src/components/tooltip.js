/* eslint-disable react/prop-types */
import React from "react";
import ReactTooltip from "react-tooltip";
import "./image.css";

const Tooltip = (props) => {
  const {
    place,
    multiline = true,
    offset,
    content,
    event,
    tooltipId,
    children,
    style,
  } = props;

  return (
    <div>
      <div
        className="overlay-box number-circle"
        data-for={tooltipId}
        style={style}
        data-place={place}
        data-multiline={multiline}
        data-background-color={"white"}
        data-offset={offset}
        data-tip="sample"
        data-event={event}
        data-event-off="dblclick"
      >
        {children}
      </div>
      <ReactTooltip
        id={tooltipId || ""}
        globalEventOff="click"
        effect="solid"
        type="light"
        backgroundColor="white"
        delayShow={250}
        clickable={true}
      >
        {content}
      </ReactTooltip>
    </div>
  );
};

export default Tooltip;
