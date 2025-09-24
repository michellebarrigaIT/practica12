import { motion } from "framer-motion";
import "./../styles/Modal.scss";

type ModalProps = {
    title: string;
    message: string;
    onClose: () => void;
};

export default function Modal({ title, message, onClose }: ModalProps) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <motion.div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
            >
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </motion.div>
        </div>
    );
}
