import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Cell from "../components/Cell";
import "./Board.css";
import Modal from "react-modal";
import axios from "axios";

interface Props {
  M: number;
  N: number;
  setM: any;
  setN: any;
  addr: string;
}
export default function Board({ M, N, setM, setN, addr }: Props) {
  const [gameActive, setGameActive] = useState(false);
  const [turn, setTurn] = useState(0);
  const [boardState, setBoardState] = useState<string[]>([]);
  const [modalMsg, setModalMsg] = useState("");
  const [plays, setPlays] = useState<any[]>([]);
  const startGame = () => {
    const newBoardState = [];
    for (let index = 0; index < N; index++) {
      newBoardState.push("");
    }
    setBoardState(newBoardState);
    setGameActive(true);
    setPlays([]);
  };

  const checkWinner = () => {
    if (turn < M) {
      return;
    }
    let maxRepeat = 0;
    let letterMax = "";
    let letterCurrent = "";
    let currentMax = 0;

    if (boardState[0]) {
      currentMax = 1;
      letterCurrent = boardState[0];
    }
    for (let index = 1; index < boardState.length; index++) {
      const now = boardState[index];
      const prev = boardState[index - 1];

      if (prev && now && prev === now) {
        letterCurrent = now;
        currentMax++;
      } else if (now) {
        letterCurrent = now;
        currentMax = 1;
      } else {
        currentMax = 0;
      }

      if (currentMax > maxRepeat) {
        maxRepeat = currentMax;
        letterMax = letterCurrent;
      }
    }

    if (maxRepeat >= M) {
      setModalMsg(`${letterMax} Won`);
    } else if (turn === N) {
      setModalMsg("game over with draw");
    }
  };

  const onCellClickHandler = (index: number) => {
    const newBoard = boardState.slice();
    let sine = turn % 2 ? "O" : "X";
    newBoard[index] = sine;
    setTurn(turn + 1);
    setBoardState(newBoard);
    const p = {
      player: turn % 2 ? "Player2" : "Player1",
      sine,
      index,
      turn: turn + 1,
    };
    const newPlays = plays.slice();
    newPlays.push(p);
    setPlays(newPlays);
  };

  useEffect(() => {
      checkWinner();
      // eslint-disable-next-line
  }, [boardState]);

  useEffect(() => {
    setGameActive(false);
  }, [N, M]);

  const updatePostOnEndGame = async () => {
    if (!addr || addr.length < 1) {
      return;
    }

    try {
      const res = await axios.post(addr, plays);
      console.log("plays", plays);

      console.log(res);

      if (res.status === 200) {
        alert("Post sent");
      }
    } catch (e) {
      console.log(e);
      alert("Post failed");
    }
  };
  if (!gameActive) {
    return (
      <div>
        <Button color="primary" onClick={startGame}>
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="board">
      <h5>Turn: Player{turn % 2 ? "2" : "1"}</h5>
      <div className="row">
        {boardState.map((sine, index) => {
          return (
            <Cell
              key={index}
              click={() => onCellClickHandler(index)}
              sine={sine}
            />
          );
        })}
      </div>

      <Modal
        isOpen={modalMsg.length > 0}
        // onAfterOpen={}
        onRequestClose={() => {
          setModalMsg("");
          setGameActive(false);
          updatePostOnEndGame();
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modalMsg}
      </Modal>
    </div>
  );
}

const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    //   textAlign:'center',
    marginRight: "-50%",
    width: "20%",
    transform: "translate(-50%, -50%)",
  },
};
