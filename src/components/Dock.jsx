import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";

export const Dock = () => {
  const dockRef = useRef(null);
  useGSAP(()=>{
    const dock=dockRef.current;
    if(!dock) return;
    const icons=dock.querySelectorAll(".dock-icon");
    const animateIcons=(mouseX)=>{
        const{left}=dock.getBoundingClientRect();
        icons.forEach(element => {
            const {left:iconLeft,width}=icon.getBoundingClientRect();
            const center=iconLeft-left+width/2;
        });
    }
    
  })
  const toggleApp=(app)=>{}

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={()=>toggleApp({id,canOpen})}
            >
                <img src={`/images/${icon}`} alt={name} loading="lazy" className={canOpen ? "":"opacity-60"} />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip"></Tooltip>
      </div>
    </section>
  );
};
