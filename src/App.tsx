import React, { useState } from "react";
import "./App.css";
import BoardBtns from "./components/BoardBtns";
import Board from "./containers/Board";
import { FormControl, Input } from "@material-ui/core";

function App() {
  const [M, setM] = useState(4);
  const [N, setN] = useState(10);
  const [addr, setAddr] = useState("");

  return (
    <div className="App">
      <div className="App-header">
        <div className="header">
          <h2 style={{ color: "white" }}>1-d tic-tac-toe</h2>
          <BoardBtns M={M} setM={setM} N={N} setN={setN} />
        </div>
        <Board M={M} setM={setM} N={N} setN={setN} addr={addr} />
        <FormControl
          variant="filled"
          className={""}
          style={{ width: "50%", marginTop: "20px" }}
        >
          {/* <InputLabel id="">Address to post results on end </InputLabel> */}
          <Input
            value={addr}
            placeholder="Address to post results on end"
            onChange={(e: any) => setAddr(e.target.value)}
            style={{ background: "white" }}
          ></Input>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
