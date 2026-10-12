import React from "react";

interface AppleMenuProps {
  logout: () => void;
  shut: (e: React.MouseEvent<HTMLLIElement>) => void;
  restart: (e: React.MouseEvent<HTMLLIElement>) => void;
  sleep: (e: React.MouseEvent<HTMLLIElement>) => void;
  toggleAppleMenu: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
}

export default function AppleMenu({
  logout,
  shut,
  restart,
  sleep,
  toggleAppleMenu,
  btnRef
}: AppleMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, toggleAppleMenu, [btnRef]);

  return (
    <div className="menu-box left-2 w-56" ref={ref}>
      <MenuItemGroup>
        <MenuItem onClick={sleep}>Sleep</MenuItem>
        <MenuItem onClick={restart}>Restart...</MenuItem>
        <MenuItem onClick={shut}>Shut Down...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem onClick={logout}>Lock Screen</MenuItem>
        <MenuItem onClick={logout}>Log Out Anas DADI...</MenuItem>
      </MenuItemGroup>
    </div>
  );
}
