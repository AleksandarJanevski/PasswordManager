import React from "react";

export const Add = () => {
  return (
    <div id="add">
      <h1>Add to Vault</h1>
      <span>
        <label htmlFor="">Title</label>
        <input type="text" name="title" />
      </span>
      <span>
        <label htmlFor="">Email</label>
        <input type="text" name="email" />
      </span>
      <span>
        <label htmlFor="">Password</label>
        <input type="password" name="password" />
      </span>
      <span>
        <label htmlFor="">Prompt Password Input?</label>
        <select name="strict" id="strict">
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </span>
    </div>
  );
};
