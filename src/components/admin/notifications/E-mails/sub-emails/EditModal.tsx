import { EmailNotificationInterface } from "@/types/interfaces";
import React from "react";

interface EditModalProps {
    emailNotification: EmailNotificationInterface | null;
    onClose: () => void;
}

function EditModal({ emailNotification, onClose }: EditModalProps) {
    return <div>EditModal</div>;
}

export default EditModal;
