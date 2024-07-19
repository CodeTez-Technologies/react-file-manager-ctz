import { ToggleButton, ToggleButtonGroup } from "@mui/material";

// Icons
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import { useState } from "react";
import { useFileActionTrigger } from "../../util/file-actions";

export default function BtnGroup() {
    const triggerListAction = useFileActionTrigger('enable_list_view');
    const triggerGridAction = useFileActionTrigger('enable_grid_view');

    const [value, setValue] = useState('list');

    const handleChange = (_e, value: string) => {
        setValue(value);
        value === 'list' ? triggerListAction() : triggerGridAction();
    };

    return (
        <ToggleButtonGroup exclusive={true} size="small" sx={{ mr: 2 }} onChange={handleChange} value={value}>
            <ToggleButton value="list" key="list">
                <MenuOutlinedIcon />
            </ToggleButton>,
            <ToggleButton value="grid" key="grid">
                <GridViewIcon />
            </ToggleButton>,
        </ToggleButtonGroup>
    );
}