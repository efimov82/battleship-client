import React from "react";

const AppContext = React.createContext({
  state: {
    soundMuted: false,
  },
  setSoundMute: (value: boolean) => {},
});

export default AppContext;
