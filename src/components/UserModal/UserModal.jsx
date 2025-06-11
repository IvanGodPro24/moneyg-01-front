import css from "./UserModal.module.css";
import * as Yup from "yup";
import { useId, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaUser } from "react-icons/fa6";
import { GrClearOption } from "react-icons/gr";
import icon from "../../img/icons.svg";
import CancelButton from "../Buttons/CancelButton";
import AddButton from "../Buttons/AddButton";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/auth/operations";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(30, "Name must be at most 12 characters")
    .required("Name is required"),
});

const UserModal = ({
  isOpen,
  onCancel,
  name,
  avatar,
  setAvatar,
  avatarURL,
}) => {
  const photoId = useId();
  const nameId = useId();

  const dispatch = useDispatch();

  const [shouldClearAvatar, setShouldClearAvatar] = useState(false);

  if (!isOpen) return null;

  const initialValues = {
    name: name || "",
  };

  const handleBackdropClick = () => {
    setShouldClearAvatar(false);
    onCancel();
  };

  const stopPropagation = (e) => e.stopPropagation();

  const handleClearAvatar = () => {
    setAvatar(null);
    setShouldClearAvatar(true);
  };

  const handleSubmit = (values) => {
    const isNameUnchanged = values.name.trim() === name.trim();
    const isAvatarUnchanged = avatar === null;

    if (isNameUnchanged && isAvatarUnchanged && !shouldClearAvatar) {
      setShouldClearAvatar(false);
      onCancel();
      return;
    }

    try {
      const updateData = {
        name: values.name,
        avatar: avatar,
        clearAvatar: shouldClearAvatar,
      };

      dispatch(updateUser(updateData));

      setShouldClearAvatar(false);
      onCancel();
    } catch (error) {
      console.error("Failed to update user", error.message);
    }
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
    setShouldClearAvatar(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className={css.container} onClick={handleBackdropClick}>
        <div className={css.modal} onClick={stopPropagation}>
          <button onClick={onCancel} className="closeButton">
            <svg className="closeSvg" width="16" height="16">
              <use href={`${icon}#icon-close`}></use>
            </svg>
          </button>

          <p className={css.title}>Edit Profile</p>

          <Form className={css.form}>
            <label className="relative" htmlFor={photoId}>
              <input
                type="file"
                id={photoId}
                name="photo"
                accept="image/*"
                className="visually-hidden"
                onChange={handleFileChange}
              />
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  className={clsx(
                    css.avatar,
                    css.img,
                    avatar || (avatarURL && "transparent")
                  )}
                  alt={name}
                />
              ) : avatarURL && !shouldClearAvatar ? (
                <img
                  src={avatarURL}
                  className={clsx(
                    css.avatar,
                    css.img,
                    avatar || (avatarURL && "transparent")
                  )}
                  alt={name}
                />
              ) : (
                <span className={clsx(css.avatar, "relative")} type="button">
                  {name[0]}
                </span>
              )}
              <span className={css.plus}>
                <svg className={css["plus-icon"]}>
                  <use href={`${icon}#icon-plus`}></use>
                </svg>
              </span>

              {(avatar || avatarURL) && (
                <button
                  type="button"
                  className={css.clearBtn}
                  onClick={handleClearAvatar}
                >
                  <GrClearOption />
                </button>
              )}
            </label>

            <label className={clsx(css.label, "label", "relative")}>
              <FaUser className={css.icon} />
              <Field
                type="text"
                id={nameId}
                name="name"
                placeholder="Name"
                className={css.input}
              />
              <ErrorMessage name="name" component="div" className="errorText" />
            </label>

            <div className={clsx("btn-container", "mt-0")}>
              <AddButton>save</AddButton>
              <CancelButton onClose={handleBackdropClick}>cancel</CancelButton>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default UserModal;
