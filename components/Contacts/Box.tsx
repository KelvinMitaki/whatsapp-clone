import styles from "../../styles/contacts.module.css";
import React from "react";
import { toggleProfile, ToggleProfile } from "../../redux/actions";
import { connect, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";

interface Props {
  menuRef: React.RefObject<HTMLDivElement>;
  hideMenu: boolean;
  toggleProfile: (toggle: boolean) => ToggleProfile;
}

const Box: React.FC<Props> = props => {
  const showProfile = useSelector<Redux>(
    state => state.user.showProfile
  ) as Redux["user"]["showProfile"];
  return (
    <div className={`${styles.profile} ${showProfile && styles.hideBoxMenu}`}>
      <div
        ref={props.menuRef}
        className={`${styles.box} ${props.hideMenu && styles.hideMenu}`}
      >
        <div>
          <p>New Group</p>
        </div>
        <div onClick={() => props.toggleProfile(true)}>
          <p>Profile</p>
        </div>
        <div>
          <p>box</p>
        </div>
        <div>
          <p>box</p>
        </div>
        <div>
          <p>box</p>
        </div>
        <div>
          <p>box</p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { toggleProfile })(Box);