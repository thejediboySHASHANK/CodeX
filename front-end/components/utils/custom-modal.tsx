import {FC} from "react";
import {Modal, Box} from "@mui/material";
import styles from "./customModal.module.css"

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (route: string) => void;
};
const CustomModal: FC<Props> = ({open, setOpen, setRoute, component: Component}) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className={styles.box}>
                <Component setOpen={setOpen} setRoute={setRoute}/>
            </Box>
        </Modal>
    );
};
export default CustomModal;
