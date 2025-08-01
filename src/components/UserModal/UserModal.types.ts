export type UserModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  name: string | null;
  email: string | null;
  avatar: File | null;
  setAvatar: (avatar: File | null) => void;
  avatarURL: string | null;
  date: string | null;
};

export type UserModalValues = {
  name: string;
};
