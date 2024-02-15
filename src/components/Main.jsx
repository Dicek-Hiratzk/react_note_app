import React from "react";
import "./Main.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Main = ({ activeNote, onUpdateNote }) => {
  
  // 編集内容更新ロジック
  const onEditNote = (key, value) => {
    onUpdateNote({
      // id: activeNote.id, // 片方の編集のみ表示なのでNG
      ...activeNote, // タイトルとコンテンツ各々表示編集するため
      [key]: value, // [key]は動的キー
      modDate: Date.now(),
    })
  };
  // key: title, constent: 第一引数
  // value: e.target.value: 第二引数

  // activeNoteが初期値がfalseのため表示されるよう設定
  if(!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input 
          id="title"
          type="text" 
          placeholder="タイトルを記入" 
          value={activeNote.title} 
          onChange={(e) => onEditNote("title", e.target.value)}
        />
        <textarea 
          id="content" 
          placeholder="本文を記入" 
          value={activeNote.content}
          onChange={(e) => onEditNote("content", e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <Markdown className="markdown-preview" remarkPlugins={remarkGfm}>
          {activeNote.content}
        </Markdown>
      </div>
    </div>
  );
};

export default Main;