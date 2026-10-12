import React from "react";
import { format } from "date-fns";
import { user } from "~/configs";
import type { MacActions } from "~/types";

export default function Login(props: MacActions) {
  const dark = useStore((state) => state.dark);
  const { winWidth } = useWindowSize();

  if (winWidth < 640) {
    return (
      <div className={`ios-lock mac-wallpaper ${dark ? "mac-wallpaper-dark" : ""}`}>
        <div className="ios-lock-date">{format(new Date(), "EEEE, MMMM d")}</div>
        <div className="ios-lock-time">{format(new Date(), "h:mm")}</div>
        <div className="ios-lock-bottom">
          <p>Anas Dadi</p>
          <span>Cloud architect · DevSecOps · SRE</span>
          <button type="button" onClick={() => props.setLogin(true)}>
            Explore portfolio <span aria-hidden="true">↑</span>
          </button>
        </div>
        <div className="ios-home-indicator" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`mac-wallpaper ${dark ? "mac-wallpaper-dark" : ""} size-full login text-center`}
    >
      <div className="inline-block w-auto relative top-1/2 -mt-36">
        {/* Avatar */}
        <img className="rounded-full size-24 my-0 mx-auto" src={user.avatar} alt="" />
        <h1 className="font-semibold mt-4 text-2xl text-white">{user.name}</h1>
        <p className="mt-1 text-sm text-white/80">Cloud architect · DevSecOps · SRE</p>
        <button className="enter-desktop mt-7" onClick={() => props.setLogin(true)}>
          Enter desktop <span aria-hidden="true">↗</span>
        </button>
      </div>

      {/* buttons */}
      <div className="text-sm fixed bottom-16 inset-x-0 mx-auto flex flex-row space-x-4 w-max">
        <button
          type="button"
          className="hstack flex-col text-white w-24 cursor-pointer"
          onClick={(e) => props.sleepMac(e)}
        >
          <div className="flex-center size-10 bg-gray-700 rounded-full">
            <span className="i-gg:sleep text-[40px]" />
          </div>
          <span>Sleep</span>
        </button>
        <button
          type="button"
          className="hstack flex-col text-white w-24 cursor-pointer"
          onClick={(e) => props.restartMac(e)}
        >
          <div className="flex-center size-10 bg-gray-700 rounded-full">
            <span className="i-ri:restart-line text-4xl" />
          </div>
          <span>Restart</span>
        </button>
        <button
          type="button"
          className="hstack flex-col text-white w-24 cursor-pointer"
          onClick={(e) => props.shutMac(e)}
        >
          <div className="flex-center size-10 bg-gray-700 rounded-full">
            <span className="i-ri:shut-down-line text-4xl" />
          </div>
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
}
