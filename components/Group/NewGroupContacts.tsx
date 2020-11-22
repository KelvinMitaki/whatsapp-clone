import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { connect, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { setNewGroup, SetNewGroup } from "../../redux/actions";
import styles from "../../styles/NewGroupContacts.module.css";

interface Props {
  setNewGroup: (set: boolean) => SetNewGroup;
}

const NewGroupContacts: React.FC<Props> = props => {
  const contacts = useSelector((state: Redux) => state.user.contacts);
  const newGroup = useSelector((state: Redux) => state.group.newGroup);
  return (
    <div className={newGroup ? styles.newGroup : ""}>
      <div className={styles.container}>
        <div className={styles.ctn_header}>
          <div onClick={() => props.setNewGroup(false)}>
            <AiOutlineArrowLeft size="20px" />
          </div>
          <p>Add Group Participants</p>
        </div>
        <div className={styles.input}>
          <input type="text" placeholder="Type contact name" />
          <span className={styles.input_border}>&nbsp;</span>
        </div>
        <div>
          {contacts &&
            contacts.length !== 0 &&
            (contacts as User[]).map(user => (
              <div className={styles.contacts}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div className={styles.user}>
                  <div className={styles.user_header}>
                    <h2>
                      {user.firstName} {user.lastName}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default connect<{}, Props>(null, { setNewGroup })(NewGroupContacts);
