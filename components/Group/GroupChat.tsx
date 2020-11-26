import React, { useState } from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import { axios } from "../../Axios";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/groupChat.module.css";
import GroupBox from "./GroupBox";

const GroupChat = () => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const currentUser = useSelector((state: Redux) => state.user.currentUser);
  const groupInfo = useSelector((state: Redux) => state.group.groupInfo);
  const groupChat = useSelector((state: Redux) => state.group.groupChat);
  const currentGroup = useSelector((state: Redux) => state.group.currentGroup);
  const groupMessages = useSelector(
    (state: Redux) => state.group.groupMessages
  );
  const groupMessageLoading = useSelector(
    (state: Redux) => state.group.groupMessageLoading
  );

  const sendGroupMessage = async (
    e: React.FormEvent<HTMLFormElement>,
    msg: string
  ): Promise<void> => {
    try {
      e.preventDefault();
      setInput("");
      await axios.post("/api/new/group/message", {
        message: msg,
        group: currentGroup?._id
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      className={`${groupInfo && groupChat ? styles.groupInfo : ""} ${
        !groupChat ? styles.hide__container : ""
      }`}
    >
      {groupMessageLoading && (
        <div className={styles.spinner}>
          <div className={`ui active centered inline loader`}></div>
          <p>fetching messages</p>
        </div>
      )}
      <div className={`${styles.container} ${showBox ? styles.showBox : ""}`}>
        <div className={styles.header}>
          <div className={styles.user_info}>
            <img src="portitem1.jpeg" alt="pfp" />
            <div>
              <h1>{currentGroup?.name}</h1>
              <div className={styles.participants}>
                {currentGroup?.participants.map(grp => (
                  <span key={grp._id}>
                    {grp.firstName} {grp.lastName}
                    {currentGroup.participants[
                      currentGroup.participants.length - 1
                    ]._id !== grp._id
                      ? ", "
                      : " "}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.header_icons}>
            <div>
              <AiOutlineSearch size="20px" />
            </div>
            <div
              onClick={() => setShowBox(show => !show)}
              className={styles.three_dots}
            >
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </div>
          </div>
        </div>
        <GroupBox setShowBox={setShowBox} />
        <div className={`${styles.body} ${checked ? styles.checked : ""}`}>
          {groupMessages &&
            groupMessages?.length !== 0 &&
            (groupMessages as GroupMsg[]).map(msg =>
              msg.from._id.toString() === currentUser?._id.toString() ? (
                <div className={styles.right_text}>
                  <div>
                    <div
                      className={styles.BiCheck}
                      onClick={() => setChecked(chkd => !chkd)}
                    >
                      <BiCheck
                        size="25px"
                        className={styles.check}
                        color="white"
                      />
                      <label
                        className={styles.check_label}
                        htmlFor="right_text"
                      >
                        &nbsp;
                      </label>
                    </div>
                    <input
                      type="checkbox"
                      id="right_text"
                      name="right_text"
                      checked={checked}
                      onChange={() => setChecked(ck => !ck)}
                    />
                  </div>
                  <p>{msg.message}</p>
                </div>
              ) : (
                <div className={styles.left_text}>
                  {" "}
                  <div>
                    {" "}
                    <div
                      className={styles.BiCheck}
                      onClick={() => setChecked(chkd => !chkd)}
                    >
                      <BiCheck
                        size="25px"
                        className={styles.check}
                        color="white"
                      />
                      <label className={styles.check_label} htmlFor="left_text">
                        &nbsp;
                      </label>
                    </div>
                    <input
                      type="checkbox"
                      id="left_text"
                      name="left_text"
                      checked={checked}
                      onChange={() => setChecked(ck => !ck)}
                    />
                  </div>
                  <p>{msg.message}</p>
                </div>
              )
            )}
        </div>
        <form
          onSubmit={e =>
            input.trim().length !== 0 && sendGroupMessage(e, input)
          }
        >
          <div className={styles.input}>
            <input
              type="text"
              onChange={e => setInput(e.target.value)}
              value={input}
            />
            <button type="submit" className={styles.MdSend}>
              <MdSend size="20px" color="white" />
            </button>
          </div>
        </form>
        <div className={styles.select_box}>
          <div className={styles.cancel}>
            <p>&nbsp;</p>
          </div>
          <div>
            <p>5 selected</p>
          </div>
          <div>
            <BsInfoCircleFill size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <AiFillStar size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <MdDelete size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <IoMdShareAlt size="25px" color="rgba(80,80,80,.5)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
