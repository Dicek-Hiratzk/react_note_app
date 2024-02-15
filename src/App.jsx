import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    // ローカルストレージにデータがあれば返す
    // JSON形式からオブジェクトに戻す必要あり
    JSON.parse(localStorage.getItem("notes")) || []
    ); 
  const [activeNote, setActiveNote] = useState(false);

  // ローカルストレージ保存用
  useEffect(() => {
    // ローカルストレージにノートを保存する
    // JSON形式じゃないと入力した文字列で保存されない
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]); // 第一引数のnotesの中身が変わる度に第二引数のCB関数が発火する

  // リロード時一番上のノートを開いた状態にする
  // ifはノートがないときエラー吐かないようにするため
  useEffect(() => {
    if (notes.length !== 0) setActiveNote(notes[0].id);
  }, []);

  // ノート追加ロジック
  const onAddNote = () => {
    console.log("新しくノートが追加されました")
    const newNote = {
      id: uuid(), // ランダムなidを指定
      title: "",
      content: "",
      modDate: Date.now(), // いつ修正したのか
    };
    // ...notesは以前のノート(newNoteで新しいノートを追加するため)
    setNotes([...notes, newNote]); // 更新用
    console.log(notes);
  };

  // ノート削除ロジック
  const onDeleteNote = (id) => {
    // true(この場合該当idではない)を残すためfilter関数
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes); // 更新用
  };

  // プレビュー用のオブジェクトを取得するためのロジック
  const getActiveNote = () => {
    // find()でノートを見ていき返す
    return notes.find((note) => note.id === activeNote)
  };

  // ノートの更新
  const onUpdateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す
    const updatedNoteArray = notes.map((note) => {
      if(note.id === updatedNote.id) {
        return updatedNote; // 編集中のノート
      } else {
        return note; // 残りのノート
      }
    });
    setNotes(updatedNoteArray);
  };

  return (
    <div className="App">
      <Sidebar 
        onAddNote={onAddNote} 
        notes={notes} 
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main 
        activeNote={getActiveNote()} 
        onUpdateNote={onUpdateNote}
      />
    </div>
  );
};

export default App;
