import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

interface Props {
  M: number;
  N: number;
  setM: any;
  setN: any;
}
export default function BoardBtns({ M, N, setM, setN }: Props) {
  const options = (num: number) => {
    const mat = [];
    for (let index = 2; index < num; index++) {
      mat.push(
        <MenuItem value={index} key={index}>
          {index}
        </MenuItem>
      );
    }
    return mat;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: "20px",
      }}
    >
      <FormControl
        variant="filled"
        className={""}
        style={{ width: "100px", color: "white" }}
      >
        <InputLabel
          color="primary"
          id="demo-simple-select-filled-label"
          style={{ color: "#ccc" }}
        >
          N
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={N}
          // color="primary"
          style={{ color: "#ccc" }}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              const num =Number(e.target.value)
            setN(num);
            if(M>num/2){
                setM(Math.max(Math.floor(num/2),2))
            }

          }}
        >
          {options(20)}
        </Select>
      </FormControl>
      <FormControl variant="filled" className={""} style={{ width: "100px" }}>
        <InputLabel
          id="demo-simple-select-filled-label"
          style={{ color: "#ccc" }}
        >
          M
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={M}
          style={{ color: "#ccc" }}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setM(Number(e.target.value));
          }}
        >
          {options(N/2+1)}
        </Select>
      </FormControl>
    </div>
  );
}
