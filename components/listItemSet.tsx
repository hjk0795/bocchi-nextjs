import { ReactElement } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { IconType } from "react-icons/lib";

type ListItemSetProps = {
    text: string;
    icon: ReactElement<any, IconType>;
    handleClick: () => void;
}

const ListItemSet: React.FC<ListItemSetProps> = ({ text, icon, handleClick }) => {
    return (
        <>
            <ListItem disablePadding data-cy="container">
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export default ListItemSet;